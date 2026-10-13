/** Verify the privileged CI signal with mocked GitHub APIs and no external writes. @author meetbyte */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const source = readFileSync(new URL('../.github/workflows/ai-review-ready.yml', import.meta.url), 'utf8');
const script = source.split('          script: |\n')[1].split('\n').map(line => line.slice(12)).join('\n');
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
const execute = new AsyncFunction('github', 'context', 'core', script);
const sha = 'a'.repeat(40);
const repositoryId = 1387111031;

function fixture() {
  const state = {
    run: { id: 12, workflow_id: 34, path: '.github/workflows/ci.yml', name: 'PR Quality',
      event: 'workflow_dispatch', status: 'completed', conclusion: 'success', run_attempt: 1,
      head_repository: { id: repositoryId }, repository: { id: repositoryId }, head_sha: sha,
      head_branch: 'agent/MEE-23-test' },
    pr: { number: 8, node_id: 'PR_test', draft: true, head: { repo: { id: repositoryId }, ref: 'agent/MEE-23-test', sha },
      base: { ref: 'main' }, state: 'open', merged_at: null, user: { id: 41898282 } },
    jobs: [{ name: 'quality', head_sha: sha, status: 'completed', conclusion: 'success',
      steps: ['Install dependencies', 'Generate Next.js route types', 'Check types', 'Lint',
        'Run tests', 'Build static export'].map(name => ({ name, status: 'completed', conclusion: 'success' })) }],
    comments: [], writes: [], ready: [], logs: [], eventAttempt: 1, current: null, extraPr: null
  };
  const api = {
    actions: { getWorkflowRun: async () => ({ data: state.run }), getWorkflow: async () => ({ data: { id: 34 } }),
      listJobsForWorkflowRun: async () => state.jobs },
    pulls: { list: async () => [state.pr, ...(state.extraPr ? [state.extraPr] : [])],
      get: async () => ({ data: state.current || state.pr }) },
    issues: { listComments: async () => state.comments, createComment: async comment => {
      state.writes.push(comment); state.comments.push({ body: comment.body, user: { id: 41898282 } });
    } }
  };
  state.invoke = () => execute({ rest: api, paginate: async (method, args) => method(args),
    graphql: async (...args) => { state.ready.push(args[1].id); state.pr.draft = false; } },
    { repo: { owner: 'meetbyte', repo: 'meetbyte.github.io' }, payload: {
      repository: { id: repositoryId }, workflow_run: { id: 12, run_attempt: state.eventAttempt }
    } }, { info: message => state.logs.push(message) });
  return state;
}

test('current successful dispatched quality run emits one SHA-anchored signal; repeats emit none', async () => {
  const state = fixture(); await state.invoke(); await state.invoke();
  assert.equal(state.writes.length, 1);
  assert.deepEqual(state.ready, ['PR_test']);
  assert.ok(state.writes[0].body.includes(`<!-- meetbyte:ci-ready:v1:8:${sha} -->`));
  assert.ok(state.writes[0].body.includes('issue: MEE-23'));
});

for (const [name, mutate] of [
  ['failed CI', s => { s.run.conclusion = 'failure'; }],
  ['unfinished CI', s => { s.run.status = 'in_progress'; }],
  ['different workflow', s => { s.run.workflow_id = 99; }],
  ['wrong workflow path', s => { s.run.path = '.github/workflows/other.yml'; }],
  ['pull request merge revision run', s => { s.run.event = 'pull_request'; }],
  ['superseded run attempt', s => { s.run.run_attempt = 2; }],
  ['fork run', s => { s.run.head_repository.id = 999; }],
  ['invalid SHA', s => { s.run.head_sha = 'not-a-sha'; }],
  ['ineligible branch', s => { s.run.head_branch = 'main'; }],
  ['stale PR', s => { s.pr.head.sha = 'b'.repeat(40); }],
  ['closed PR', s => { s.pr.state = 'closed'; }],
  ['non-owner repository PR', s => { s.pr.head.repo.id = 999; }],
  ['non-bot PR', s => { s.pr.user.id = 49148794; }],
  ['wrong PR base', s => { s.pr.base.ref = 'release'; }],
  ['already ready PR', s => { s.pr.draft = false; }],
  ['ambiguous PR', s => { s.extraPr = structuredClone(s.pr); s.extraPr.number = 9; }],
  ['missing quality job', s => { s.jobs = []; }],
  ['failed quality job', s => { s.jobs[0].conclusion = 'failure'; }],
  ['skipped build', s => { s.jobs[0].steps.at(-1).conclusion = 'skipped'; }],
  ['missing test step', s => { s.jobs[0].steps.splice(4, 1); }],
  ['push during checks', s => { s.current = structuredClone(s.pr); s.current.head.sha = 'b'.repeat(40); }],
  ['close during checks', s => { s.current = structuredClone(s.pr); s.current.state = 'closed'; }]
]) test(`does not signal ${name}`, async () => {
  const state = fixture(); mutate(state); await state.invoke(); assert.equal(state.writes.length, 0);
  assert.equal(state.ready.length, 0);
});

test('existing audit marker after a failed readiness transition does not strand a draft', async () => {
  const state = fixture();
  state.comments.push({ user: { id: 41898282 }, body: `<!-- meetbyte:ci-ready:v1:8:${sha} -->` });
  await state.invoke(); assert.equal(state.writes.length, 0); assert.deepEqual(state.ready, ['PR_test']);
});

test('a forged marker from another identity cannot suppress the real signal', async () => {
  const state = fixture();
  state.comments.push({ user: { id: 123 }, body: `<!-- meetbyte:ci-ready:v1:8:${sha} -->` });
  await state.invoke(); assert.equal(state.writes.length, 1);
});

test('API failure fails closed with no comment', async () => {
  const state = fixture(); state.invoke = () => execute({ rest: { actions: {
    getWorkflowRun: async () => { throw new Error('permission denied'); }
  } } }, { repo: { owner: 'meetbyte', repo: 'meetbyte.github.io' }, payload: {
    repository: { id: repositoryId }, workflow_run: { id: 12 }
  } }, { info() {} });
  await assert.rejects(state.invoke, /permission denied/); assert.equal(state.writes.length, 0);
});

test('privileged workflow never checks out code, downloads artifacts, or invokes an AI service', () => {
  assert.ok(!/actions\/checkout|download-artifact|OPENAI_API_KEY|contents: write|actions: write/.test(source));
  assert.ok(!/\$\{\{/.test(script));
});

