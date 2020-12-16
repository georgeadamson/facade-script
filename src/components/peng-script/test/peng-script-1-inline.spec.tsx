import { newSpecPage } from '@stencil/core/testing';
import { PengScript } from '../peng-script';

describe.skip('peng-script for script added inline', () => {
  beforeAll(() => {
    // Mock IntersectionObserver because it is not available in test environment
    const mockIntersectionObserver = jest.fn();

    mockIntersectionObserver.mockReturnValue({
      observe: () => jest.fn(),
      unobserve: () => jest.fn(),
      disconnect: () => jest.fn(),
    });

    global.IntersectionObserver = mockIntersectionObserver;
  });

  it('should not render script when no attributes specified', async () => {
    const page = await newSpecPage({
      components: [PengScript],
      html: `<peng-script></peng-script>`,
    });

    expect(page.root).toEqualHtml(`
      <peng-script status="idle">
        <div class="peng-placeholder-content" data-script-status="idle"></div>
        <div class="peng-scripted-content" data-script-status="idle" hidden></div>
      </peng-script>
    `);

    // And no script should have been added to the <head>
    expect(page.doc.head.querySelectorAll('script')).toHaveLength(0);
  });

  it('should not render script when not triggered', async () => {
    const page = await newSpecPage({
      components: [PengScript],
      html: `<peng-script src="https://foo/bar.js"></peng-script>`,
    });

    expect(page.root).toEqualHtml(`
      <peng-script src="https://foo/bar.js" status="idle">
        <div class="peng-placeholder-content" data-script-status="idle"></div>
        <div class="peng-scripted-content" data-script-status="idle" hidden></div>
      </peng-script>
    `);

    // And no script should have been added to the <head>
    expect(page.doc.head.querySelectorAll('script')).toHaveLength(0);
  });

  it('should render error attribute when triggered but src attribute is missing', async () => {
    const page = await newSpecPage({
      components: [PengScript],
      html: `<peng-script trigger="now"></peng-script>`,
    });

    expect(page.root).toEqualHtml(`
      <peng-script trigger="now" status="idle" error="Script triggered but missing src">
        <div class="peng-placeholder-content" data-script-status="idle"></div>
        <div class="peng-scripted-content" data-script-status="idle" hidden></div>
      </peng-script>
    `);
  });

  it('should render script tag when trigger="now"', async () => {
    const page = await newSpecPage({ components: [PengScript] });

    const eventSpy = jest.fn();
    page.win.addEventListener('pengscript', eventSpy);

    await page.setContent(
      `<peng-script src="https://foo/bar.js" trigger="now"></peng-script>`
    );

    expect(page.root).toEqualHtml(`
      <peng-script src="https://foo/bar.js" trigger="now" status="loading">
        <div class="peng-placeholder-content" data-script-status="loading"></div>
        <div class="peng-scripted-content" data-script-status="loading" hidden>
          <script src="https://foo/bar.js"></script>
        </div>
      </peng-script>
    `);

    // And no script should have been added to the <head>
    expect(page.doc.head.querySelectorAll('script')).toHaveLength(0);

    expect(eventSpy).toHaveBeenCalledTimes(2);
  });

  it('should hide placeholder when trigger="now" and show-when="triggered"', async () => {
    const page = await newSpecPage({
      components: [PengScript],
      html: `<peng-script src="https://foo/bar.js" trigger="now" show-when="triggered"></peng-script>`,
    });

    expect(page.root).toEqualHtml(`
      <peng-script src="https://foo/bar.js" trigger="now" show-when="triggered" status="loading">
        <div class="peng-placeholder-content" data-script-status="loading" hidden></div>
        <div class="peng-scripted-content" data-script-status="loading">
          <script src="https://foo/bar.js"></script>
        </div>
      </peng-script>
    `);

    // And no script should have been added to the <head>
    expect(page.doc.head.querySelectorAll('script')).toHaveLength(0);
  });

  it('should render script again for each instance of the component', async () => {
    const page = await newSpecPage({
      components: [PengScript],
      html: `
        <peng-script src="https://foo/bar.js" trigger="now"></peng-script>
        <peng-script src="https://foo/bar.js" trigger="now"></peng-script>
      `,
    });

    expect(page.body).toEqualHtml(`
      <peng-script src="https://foo/bar.js" trigger="now" status="loading">
        <div class="peng-placeholder-content" data-script-status="loading"></div>
        <div class="peng-scripted-content" data-script-status="loading" hidden>
          <script src="https://foo/bar.js"></script>
        </div>
      </peng-script>
      <peng-script src="https://foo/bar.js" trigger="now" status="loading">
        <div class="peng-placeholder-content" data-script-status="loading"></div>
        <div class="peng-scripted-content" data-script-status="loading" hidden>
          <script src="https://foo/bar.js"></script>
        </div>
      </peng-script>
    `);

    // And no script should have been added to the <head>
    expect(page.doc.querySelectorAll('script[src]').length).toEqual(2);
  });

  it('should render one script tag when once=true', async () => {
    const page = await newSpecPage({
      components: [PengScript],
      html: `
        <peng-script src="https://foo/bar.js" trigger="now" once></peng-script>
        <peng-script src="https://foo/bar.js" trigger="now" once></peng-script>
        <peng-script src="https://foo/bar.js" trigger="now" once></peng-script>
      `,
    });

    expect(page.body).toEqualHtml(`
      <peng-script src="https://foo/bar.js" trigger="now" once status="loading">
        <div class="peng-placeholder-content" data-script-status="loading"></div>
        <div class="peng-scripted-content" data-script-status="loading" hidden>
          <script src="https://foo/bar.js"></script>
        </div>
      </peng-script>
      <peng-script src="https://foo/bar.js" trigger="now" once status="loading">
        <div class="peng-placeholder-content" data-script-status="loading"></div>
        <div class="peng-scripted-content" data-script-status="loading" hidden>
        </div>
      </peng-script>
      <peng-script src="https://foo/bar.js" trigger="now" once status="loading">
        <div class="peng-placeholder-content" data-script-status="loading"></div>
        <div class="peng-scripted-content" data-script-status="loading" hidden>
        </div>
      </peng-script>
    `);

    // And no script should have been added to the <head>
    expect(page.doc.querySelectorAll('script[src]').length).toEqual(1);
  });

  it('should render each unique script once when once=true', async () => {
    const page = await newSpecPage({
      components: [PengScript],
      html: `
        <peng-script src="https://foo/bar.js" trigger="now" once></peng-script>
        <peng-script src="https://foo/BAZ.js" trigger="now" once></peng-script>
      `,
    });

    expect(page.body).toEqualHtml(`
      <peng-script src="https://foo/bar.js" trigger="now" once status="loading">
        <div class="peng-placeholder-content" data-script-status="loading"></div>
        <div class="peng-scripted-content" data-script-status="loading" hidden>
          <script src="https://foo/bar.js"></script>
        </div>
      </peng-script>
      </peng-script>
      <peng-script src="https://foo/BAZ.js" trigger="now" once status="loading">
        <div class="peng-placeholder-content" data-script-status="loading"></div>
        <div class="peng-scripted-content" data-script-status="loading" hidden>
        </div>
      </peng-script>
    `);

    // And no script should have been added to the <head>
    expect(page.doc.querySelectorAll('script[src]').length).toEqual(1);
  });
});
