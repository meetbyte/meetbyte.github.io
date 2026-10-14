/**
 * @file Targeted navigation/content/artwork regressions against the actual static export.
 * @author meetbyte
 */
import fs from "node:fs";
import assert from "node:assert/strict";
import { startStaticServer } from "./static-server.mjs";
const { chromium } = await import(
  process.env.PLAYWRIGHT_MODULE_PATH || "playwright"
);
const server = await startStaticServer();
let browser;
try {
  browser = await chromium.launch({
    executablePath: process.env.FOUNDATION_BROWSER_EXECUTABLE,
    args: ["--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
  });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    colorScheme: "light",
  });
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  await page.goto("http://127.0.0.1:4173/");
  await page.waitForFunction(
    () => !document.querySelector(".theme-toggle").disabled,
  );
  await page.evaluate(() => document.fonts.ready);
  const words = (await page.locator("main").innerText()).split(/\s+/).length;
  assert.ok(words < 35, `Home has ${words} words`);
  assert.ok(
    (
      await page
        .locator(".ink-layer")
        .evaluate((e) => getComputedStyle(e).backgroundImage)
    ).includes("home-light-"),
  );
  fs.mkdirSync("docs/qa/corrections-artwork", { recursive: true });
  await page.screenshot({
    path: "docs/qa/corrections-artwork/home-light-desktop.png",
    fullPage: true,
  });
  for (const name of ["About", "Experience", "Writing", "Contact"]) {
    await page.getByRole("link", { name, exact: true }).first().click();
    await page.waitForURL(new RegExp("/" + name.toLowerCase() + "/?$"));
    assert.equal(await page.locator(".connection-notice").count(), 0, name);
  }
  // Clicking the active route must not leave a trailing-slash mismatch waiting forever.
  await page
    .getByRole("link", { name: "Contact", exact: true })
    .first()
    .click();
  await page.waitForTimeout(5200);
  assert.equal(await page.locator(".connection-notice").count(), 0);
  for (const [kind, slugs] of [
    [
      "experience",
      [
        "apex-self-service",
        "mobilefirst-modernization",
        "engineering-tooling",
        "production-investigation",
      ],
    ],
    [
      "writing",
      [
        "beyond-screens",
        "modernizing-safely",
        "behind-the-requirement",
        "software-meets-reality",
        "ai-and-decisions",
        "thinking-slowly",
      ],
    ],
  ]) {
    for (const slug of slugs) {
      assert.equal(
        (await page.goto(`http://127.0.0.1:4173/${kind}/${slug}/`)).status(),
        200,
      );
      assert.equal(await page.getByText("Draft", { exact: true }).count(), 0);
      if (kind === "writing")
        assert.equal(await page.locator("blockquote").count(), 1);
    }
  }
  await page.goto("http://127.0.0.1:4173/experience/apex-self-service/");
  const text = await page.locator("main").innerText();
  for (const phrase of [
    "DBA",
    "LDAP",
    "PII",
    "User, Supervisor and Admin",
    "weekly or monthly",
    "server installation",
  ])
    assert.ok(text.includes(phrase), phrase);
  assert.ok(!text.includes("content brief"));
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto("http://127.0.0.1:4173/");
  await page.waitForFunction(
    () => !document.querySelector(".theme-toggle").disabled,
  );
  if ((await page.locator("html").getAttribute("data-theme")) !== "dark")
    await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await page.evaluate(() => document.fonts.ready);
  assert.ok(
    (
      await page
        .locator(".ink-layer")
        .evaluate((e) => getComputedStyle(e).backgroundImage)
    ).includes("home-dark-"),
  );
  assert.ok(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  );
  await page.screenshot({
    path: "docs/qa/corrections-artwork/home-dark-mobile.png",
    fullPage: true,
  });
  assert.deepEqual(errors, []);
  const result = {
    homeWords: words,
    editorialRoutes: 10,
    checks: [
      "normal and same-route navigation without busy notice",
      "static editorial URLs",
      "non-draft presentation",
      "source-backed APEX detail",
      "six attributed epigraphs",
      "manual-theme artwork",
      "mobile overflow",
      "no page errors",
    ],
  };
  fs.writeFileSync(
    "docs/qa/corrections-artwork/results.json",
    JSON.stringify(result, null, 2),
  );
  console.log(JSON.stringify(result));
} catch (error) {
  console.error(error);
  process.exitCode = 1;
} finally {
  if (browser) await browser.close();
  server.close();
}
