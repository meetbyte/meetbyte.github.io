/** Validate preference precedence and the pre-paint script. @author meetbyte */
import test from "node:test";
import assert from "node:assert/strict";
import { runInNewContext } from "node:vm";
import { resolveSceneryMotion, createSceneryBootstrapScript } from "../src/lib/scenery-motion";

test("reduced motion overrides even an explicit saved play preference", () => {
  for (const saved of [null, "playing", "paused", "unknown"]) assert.equal(resolveSceneryMotion(saved, true), "paused");
  assert.equal(resolveSceneryMotion("paused", false), "paused");
  assert.equal(resolveSceneryMotion(null, false), "playing");
});

test("pre-paint motion selection survives blocked storage and honors saved pause", () => {
  for (const reduced of [false, true]) {
    for (const saved of [null, "playing", "paused", "unknown"]) {
      const dataset: Record<string, string> = {};
      runInNewContext(createSceneryBootstrapScript(), {localStorage:{getItem:()=>saved}, matchMedia:()=>({matches:reduced}), document:{documentElement:{dataset}}});
      assert.equal(dataset.sceneryMotion, resolveSceneryMotion(saved, reduced));
    }
    const dataset: Record<string, string> = {};
    runInNewContext(createSceneryBootstrapScript(), {localStorage:{getItem:()=>{throw new Error("Storage blocked");}}, matchMedia:()=>({matches:reduced}), document:{documentElement:{dataset}}});
    assert.equal(dataset.sceneryMotion, reduced ? "paused" : "playing");
  }
});
