const { test, expect, devices } = require('@playwright/test');
const path = require('node:path');
const fs = require('node:fs');

const baseUrl = 'http://127.0.0.1:4322';
const screenshotDir = path.resolve(__dirname, '../qa-artifacts');

fs.mkdirSync(screenshotDir, { recursive: true });

for (const width of [375, 768, 1024]) {
  test(`fullscreen gallery initializes at ${width}px`, async ({ page, browserName }) => {
    await page.setViewportSize({ width, height: width === 375 ? 812 : 900 });
    await page.goto(baseUrl, { waitUntil: 'networkidle' });

    const metrics = await page.evaluate(() => {
      const html = document.documentElement;
      const body = document.body;
      const slides = Array.from(document.querySelectorAll('.slide'));
      const activeSlide = document.querySelector('.slide[data-active="true"]');
      const counter = document.getElementById('slide-counter');
      const wordmark = document.querySelector('.gallery-nav__wordmark');

      return {
        innerWidth: window.innerWidth,
        scrollWidth: html.scrollWidth,
        bodyScrollWidth: body.scrollWidth,
        slideKinds: slides.map((slide) => slide.getAttribute('data-slide-kind')),
        activeKind: activeSlide?.getAttribute('data-slide-kind') ?? null,
        hasCounter: Boolean(counter),
        wordmarkText: wordmark?.textContent?.trim() ?? null,
      };
    });

    expect(metrics.slideKinds).toEqual([
      'intro',
      'project',
      'project',
      'project',
      'project',
      'project',
      'project',
      'studio',
    ]);
    expect(metrics.activeKind).toBe('intro');
    expect(metrics.hasCounter).toBe(false);
    expect(metrics.wordmarkText).toBe('MAISON NORD');
    expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.innerWidth + 1);
    expect(metrics.bodyScrollWidth).toBeLessThanOrEqual(metrics.innerWidth + 1);

    await page.screenshot({
      path: path.join(screenshotDir, `fullscreen-init-${browserName}-${width}.png`),
      fullPage: true,
    });
  });
}

test('project captions keep a stable panel footprint across project slides', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(baseUrl, { waitUntil: 'networkidle' });

  const samples = [];

  for (let step = 0; step < 6; step += 1) {
    await page.keyboard.press('ArrowDown');

    const activeProject = page.locator('[data-slide-kind="project"][data-active="true"]');
    const caption = activeProject.locator('[data-project-caption]');
    const title = activeProject.locator('.project-caption-title');
    const copy = activeProject.locator('.project-caption-copy');

    await expect(caption).toBeVisible();
    await expect(title).toBeVisible();
    await expect(copy).toBeVisible();

    const metrics = await page.evaluate(() => {
      const activeProject = document.querySelector('[data-slide-kind="project"][data-active="true"]');
      const layout = activeProject?.querySelector('[data-project-caption-layout]');
      const title = activeProject?.querySelector('.project-caption-title');
      const copy = activeProject?.querySelector('.project-caption-copy');

      if (!layout || !title || !copy) {
        return null;
      }

      const layoutStyle = window.getComputedStyle(layout);
      const caption = activeProject.querySelector('[data-project-caption]');
      const captionBox = caption?.getBoundingClientRect();
      const titleBox = title.getBoundingClientRect();
      const copyBox = copy.getBoundingClientRect();
      const captionStyle = caption ? window.getComputedStyle(caption) : null;
      const cardCenterY = captionBox ? captionBox.top + captionBox.height / 2 : 0;
      const titleCenterY = titleBox.top + titleBox.height / 2;
      const copyCenterY = copyBox.top + copyBox.height / 2;

      return {
        borderTopWidth: layoutStyle.borderTopWidth,
        display: layoutStyle.display,
        columnGap: Number.parseFloat(layoutStyle.columnGap || '0'),
        cardWidth: captionBox?.width ?? 0,
        cardHeight: captionBox?.height ?? 0,
        paddingLeft: Number.parseFloat(captionStyle?.paddingLeft || '0'),
        paddingRight: Number.parseFloat(captionStyle?.paddingRight || '0'),
        cardCenterY,
        titleX: titleBox.x,
        copyX: copyBox.x,
        titleCenterOffset: Math.abs(titleCenterY - cardCenterY),
        copyCenterOffset: Math.abs(copyCenterY - cardCenterY),
      };
    });

    expect(metrics).not.toBeNull();
    expect(metrics.borderTopWidth).toBe('0px');
    expect(metrics.display).toBe('grid');
    expect(metrics.columnGap).toBeGreaterThan(0);
    expect(metrics.titleX).toBeLessThan(metrics.copyX);
    expect(Math.abs(metrics.paddingLeft - metrics.paddingRight)).toBeLessThan(1);
    expect(metrics.paddingLeft / metrics.cardWidth).toBeGreaterThan(0.04);
    expect(metrics.paddingLeft / metrics.cardWidth).toBeLessThan(0.06);
    expect(metrics.titleCenterOffset).toBeLessThan(28);
    expect(metrics.copyCenterOffset).toBeLessThan(28);

    samples.push(metrics);
  }

  await expect(page.locator('#slide-counter')).toHaveCount(0);
  await expect(page.locator('.gallery-nav__wordmark')).toBeVisible();
  await expect(page.locator('[data-project-caption]').first()).toContainText('Villa Blanc');
  await expect(page.locator('[data-project-caption]').first()).toContainText('Oslo, Norway');
  await expect(page.locator('[data-project-caption]').first()).not.toContainText('/ 06');

  const cardWidths = samples.map((sample) => sample.cardWidth);
  const cardHeights = samples.map((sample) => sample.cardHeight);
  const titlePositions = samples.map((sample) => sample.titleX);
  const copyPositions = samples.map((sample) => sample.copyX);
  const leftPaddings = samples.map((sample) => sample.paddingLeft);

  expect(Math.max(...cardWidths) - Math.min(...cardWidths)).toBeLessThan(4);
  expect(Math.max(...cardHeights) - Math.min(...cardHeights)).toBeLessThan(12);
  expect(Math.max(...titlePositions) - Math.min(...titlePositions)).toBeLessThan(4);
  expect(Math.max(...copyPositions) - Math.min(...copyPositions)).toBeLessThan(4);
  expect(Math.max(...leftPaddings) - Math.min(...leftPaddings)).toBeLessThan(2);
});

for (const viewport of [
  { width: 375, height: 812 },
  { width: 768, height: 900 },
  { width: 1440, height: 1000 },
]) {
  test(`project caption content reflows safely at ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto(baseUrl, { waitUntil: 'networkidle' });
    await page.keyboard.press('ArrowDown');

    const metrics = await page.evaluate(() => {
      const activeProject = document.querySelector('[data-slide-kind="project"][data-active="true"]');
      const caption = activeProject?.querySelector('[data-project-caption]');
      const title = activeProject?.querySelector('.project-caption-title');
      const copy = activeProject?.querySelector('.project-caption-copy');
      const layout = activeProject?.querySelector('[data-project-caption-layout]');

      if (!caption || !title || !copy || !layout) {
        return null;
      }

      const captionBox = caption.getBoundingClientRect();
      const titleBox = title.getBoundingClientRect();
      const copyBox = copy.getBoundingClientRect();
      const layoutStyle = window.getComputedStyle(layout);
      const captionStyle = window.getComputedStyle(caption);
      const cardCenterY = captionBox.top + captionBox.height / 2;
      const titleCenterY = titleBox.top + titleBox.height / 2;
      const copyCenterY = copyBox.top + copyBox.height / 2;

      return {
        captionWidth: captionBox.width,
        captionHeight: captionBox.height,
        scrollHeight: caption.scrollHeight,
        clientHeight: caption.clientHeight,
        titleLeft: titleBox.left,
        titleRight: titleBox.right,
        titleTop: titleBox.top,
        copyLeft: copyBox.left,
        copyRight: copyBox.right,
        copyBottom: copyBox.bottom,
        captionLeft: captionBox.left,
        captionRight: captionBox.right,
        captionTop: captionBox.top,
        captionBottom: captionBox.bottom,
        paddingLeft: Number.parseFloat(captionStyle.paddingLeft || '0'),
        paddingRight: Number.parseFloat(captionStyle.paddingRight || '0'),
        titleCenterOffset: Math.abs(titleCenterY - cardCenterY),
        copyCenterOffset: Math.abs(copyCenterY - cardCenterY),
        gridTemplateColumns: layoutStyle.gridTemplateColumns,
      };
    });

    expect(metrics).not.toBeNull();
    expect(metrics.captionWidth).toBeGreaterThan(0);
    expect(metrics.captionHeight).toBeGreaterThan(0);
    expect(metrics.scrollHeight).toBeLessThanOrEqual(metrics.clientHeight + 1);
    expect(metrics.titleLeft).toBeGreaterThanOrEqual(metrics.captionLeft - 1);
    expect(metrics.titleRight).toBeLessThanOrEqual(metrics.captionRight + 1);
    expect(metrics.titleTop).toBeGreaterThanOrEqual(metrics.captionTop - 1);
    expect(metrics.copyLeft).toBeGreaterThanOrEqual(metrics.captionLeft - 1);
    expect(metrics.copyRight).toBeLessThanOrEqual(metrics.captionRight + 1);
    expect(metrics.copyBottom).toBeLessThanOrEqual(metrics.captionBottom + 1);
    expect(Math.abs(metrics.paddingLeft - metrics.paddingRight)).toBeLessThan(1);
    expect(metrics.paddingLeft / metrics.captionWidth).toBeGreaterThan(0.04);
    expect(metrics.paddingLeft / metrics.captionWidth).toBeLessThan(0.07);
    expect(metrics.gridTemplateColumns).not.toBe('none');

    if (viewport.width >= 1024) {
      expect(metrics.titleCenterOffset).toBeLessThan(28);
      expect(metrics.copyCenterOffset).toBeLessThan(28);
    }
  });
}

test('mobile controls can reach the Studio slide and hide the wordmark', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(baseUrl, { waitUntil: 'networkidle' });

  for (let step = 0; step < 7; step += 1) {
    await page.locator('#nav-next').click();
  }

  await expect(page.locator('#slide-counter')).toHaveCount(0);
  await expect(page.locator('[data-slide-kind="studio"][data-active="true"]')).toBeVisible();
  await expect(page.locator('.gallery-nav__wordmark')).toHaveCSS('opacity', '0');
  await page.locator('#cf-submit').scrollIntoViewIfNeeded();
  await expect(page.locator('#cf-submit')).toBeVisible();
});

test('studio slide uses a bounded content zone on desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(baseUrl, { waitUntil: 'networkidle' });

  for (let step = 0; step < 7; step += 1) {
    await page.keyboard.press('ArrowDown');
  }

  await expect(page.locator('[data-slide-kind="studio"][data-active="true"]')).toBeVisible();
  await expect(page.locator('[data-studio-stage]')).toBeVisible();

  const metrics = await page.evaluate(() => {
    const shell = document.querySelector('[data-studio-stage-shell]');
    const stage = document.querySelector('[data-studio-stage]');
    const header = document.querySelector('[data-studio-stage-header]');
    const grid = document.querySelector('[data-studio-stage-grid]');

    if (!shell || !stage || !header || !grid) {
      return null;
    }

    const shellBox = shell.getBoundingClientRect();
    const stageBox = stage.getBoundingClientRect();
    const headerBox = header.getBoundingClientRect();
    const gridBox = grid.getBoundingClientRect();

    return {
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      stageWidth: stageBox.width,
      stageHeight: stageBox.height,
      leftGap: stageBox.left - shellBox.left,
      rightGap: shellBox.right - stageBox.right,
      topGap: stageBox.top - shellBox.top,
      bottomGap: shellBox.bottom - stageBox.bottom,
      headerTop: headerBox.top,
      gridBottom: gridBox.bottom,
      stageTop: stageBox.top,
      stageBottom: stageBox.bottom,
    };
  });

  expect(metrics).not.toBeNull();
  expect(metrics.stageWidth / metrics.viewportWidth).toBeGreaterThan(0.55);
  expect(metrics.stageWidth / metrics.viewportWidth).toBeLessThan(0.88);
  expect(metrics.stageHeight / metrics.viewportHeight).toBeGreaterThan(0.45);
  expect(metrics.stageHeight / metrics.viewportHeight).toBeLessThan(0.88);
  expect(Math.abs(metrics.leftGap - metrics.rightGap)).toBeLessThan(24);
  expect(Math.abs(metrics.topGap - metrics.bottomGap)).toBeLessThan(120);
  expect(metrics.headerTop).toBeGreaterThanOrEqual(metrics.stageTop);
  expect(metrics.gridBottom).toBeLessThanOrEqual(metrics.stageBottom);
});

for (const viewport of [
  { width: 375, height: 812 },
  { width: 768, height: 900 },
]) {
  test(`studio content zone remains reachable at ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto(baseUrl, { waitUntil: 'networkidle' });

    for (let step = 0; step < 7; step += 1) {
      await page.keyboard.press('ArrowDown');
    }

    await expect(page.locator('[data-studio-stage]')).toBeVisible();
    await page.locator('#cf-submit').scrollIntoViewIfNeeded();
    await expect(page.locator('#cf-submit')).toBeVisible();

    const metrics = await page.evaluate(() => {
      const shell = document.querySelector('[data-studio-stage-shell]');
      const stage = document.querySelector('[data-studio-stage]');

      if (!shell || !stage) {
        return null;
      }

      const shellBox = shell.getBoundingClientRect();
      const stageBox = stage.getBoundingClientRect();

      return {
        viewportWidth: window.innerWidth,
        stageWidth: stageBox.width,
        stageLeft: stageBox.left,
        stageRight: stageBox.right,
        shellLeft: shellBox.left,
        shellRight: shellBox.right,
      };
    });

    expect(metrics).not.toBeNull();
    expect(metrics.stageWidth).toBeGreaterThan(0);
    expect(metrics.stageLeft).toBeGreaterThanOrEqual(metrics.shellLeft - 1);
    expect(metrics.stageRight).toBeLessThanOrEqual(metrics.shellRight + 1);
    expect(metrics.stageWidth).toBeLessThanOrEqual(metrics.viewportWidth + 1);
  });
}

test('custom cursor accent is synchronized on desktop and disabled on coarse pointers', async ({ browser, page, browserName }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(baseUrl, { waitUntil: 'networkidle' });

  await expect(page.locator('#cursor')).toBeVisible();
  await page.locator('[data-cursor="accent"]').first().hover();
  await expect(page.locator('#cursor-inner')).toHaveCSS('width', '54px');
  await expect(page.locator('#cursor-inner')).toHaveCSS('height', '54px');

  test.skip(browserName !== 'chromium', 'Mobile coarse-pointer emulation is only exercised in Chromium.');

  const context = await browser.newContext({
    ...devices['iPhone 12'],
  });
  const mobilePage = await context.newPage();
  await mobilePage.goto(baseUrl, { waitUntil: 'networkidle' });

  const state = await mobilePage.evaluate(() => ({
    bodyClass: document.body.className,
    cursorDisplay: window.getComputedStyle(document.getElementById('cursor')).display,
  }));

  expect(state.bodyClass.includes('cursor-active')).toBe(false);
  expect(state.cursorDisplay).toBe('none');

  await context.close();
});
