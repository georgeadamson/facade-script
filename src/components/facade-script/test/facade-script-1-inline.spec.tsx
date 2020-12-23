import { newSpecPage } from '@stencil/core/testing';
import { FacadeScript } from '../facade-script';

describe.skip('facade-script for script added inline', () => {
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
      components: [FacadeScript],
      html: `<facade-script></facade-script>`,
    });

    expect(page.root).toEqualHtml(`
      <facade-script status="IDLE">
        <div class="facade-placeholder-content" data-script-status="IDLE"></div>
        <div class="facade-scripted-content" data-script-status="IDLE" hidden></div>
      </facade-script>
    `);

    // And no script should have been added to the <head>
    expect(page.doc.head.querySelectorAll('script')).toHaveLength(0);
  });

  it('should not render script when not triggered', async () => {
    const page = await newSpecPage({
      components: [FacadeScript],
      html: `<facade-script src="https://foo/bar.js"></facade-script>`,
    });

    expect(page.root).toEqualHtml(`
      <facade-script src="https://foo/bar.js" status="IDLE">
        <div class="facade-placeholder-content" data-script-status="IDLE"></div>
        <div class="facade-scripted-content" data-script-status="IDLE" hidden></div>
      </facade-script>
    `);

    // And no script should have been added to the <head>
    expect(page.doc.head.querySelectorAll('script')).toHaveLength(0);
  });

  it('should render error attribute when triggered but src attribute is missing', async () => {
    const page = await newSpecPage({
      components: [FacadeScript],
      html: `<facade-script trigger="now"></facade-script>`,
    });

    expect(page.root).toEqualHtml(`
      <facade-script trigger="now" status="IDLE" error="Script triggered but missing src">
        <div class="facade-placeholder-content" data-script-status="IDLE"></div>
        <div class="facade-scripted-content" data-script-status="IDLE" hidden></div>
      </facade-script>
    `);
  });

  it('should render script tag when trigger="now"', async () => {
    const page = await newSpecPage({ components: [FacadeScript] });

    const eventSpy = jest.fn();
    page.win.addEventListener('pengscript', eventSpy);

    await page.setContent(
      `<facade-script src="https://foo/bar.js" trigger="now"></facade-script>`
    );

    expect(page.root).toEqualHtml(`
      <facade-script src="https://foo/bar.js" trigger="now" status="loading">
        <div class="facade-placeholder-content" data-script-status="loading"></div>
        <div class="facade-scripted-content" data-script-status="loading" hidden>
          <script src="https://foo/bar.js"></script>
        </div>
      </facade-script>
    `);

    // And no script should have been added to the <head>
    expect(page.doc.head.querySelectorAll('script')).toHaveLength(0);

    expect(eventSpy).toHaveBeenCalledTimes(2);
  });

  it('should hide placeholder when trigger="now" and show-when="triggered"', async () => {
    const page = await newSpecPage({
      components: [FacadeScript],
      html: `<facade-script src="https://foo/bar.js" trigger="now" show-when="triggered"></facade-script>`,
    });

    expect(page.root).toEqualHtml(`
      <facade-script src="https://foo/bar.js" trigger="now" show-when="triggered" status="loading">
        <div class="facade-placeholder-content" data-script-status="loading" hidden></div>
        <div class="facade-scripted-content" data-script-status="loading">
          <script src="https://foo/bar.js"></script>
        </div>
      </facade-script>
    `);

    // And no script should have been added to the <head>
    expect(page.doc.head.querySelectorAll('script')).toHaveLength(0);
  });

  it('should render script again for each instance of the component', async () => {
    const page = await newSpecPage({
      components: [FacadeScript],
      html: `
        <facade-script src="https://foo/bar.js" trigger="now"></facade-script>
        <facade-script src="https://foo/bar.js" trigger="now"></facade-script>
      `,
    });

    expect(page.body).toEqualHtml(`
      <facade-script src="https://foo/bar.js" trigger="now" status="loading">
        <div class="facade-placeholder-content" data-script-status="loading"></div>
        <div class="facade-scripted-content" data-script-status="loading" hidden>
          <script src="https://foo/bar.js"></script>
        </div>
      </facade-script>
      <facade-script src="https://foo/bar.js" trigger="now" status="loading">
        <div class="facade-placeholder-content" data-script-status="loading"></div>
        <div class="facade-scripted-content" data-script-status="loading" hidden>
          <script src="https://foo/bar.js"></script>
        </div>
      </facade-script>
    `);

    // And no script should have been added to the <head>
    expect(page.doc.querySelectorAll('script[src]').length).toEqual(2);
  });

  it('should render one script tag when once=true', async () => {
    const page = await newSpecPage({
      components: [FacadeScript],
      html: `
        <facade-script src="https://foo/bar.js" trigger="now" once></facade-script>
        <facade-script src="https://foo/bar.js" trigger="now" once></facade-script>
        <facade-script src="https://foo/bar.js" trigger="now" once></facade-script>
      `,
    });

    expect(page.body).toEqualHtml(`
      <facade-script src="https://foo/bar.js" trigger="now" once status="loading">
        <div class="facade-placeholder-content" data-script-status="loading"></div>
        <div class="facade-scripted-content" data-script-status="loading" hidden>
          <script src="https://foo/bar.js"></script>
        </div>
      </facade-script>
      <facade-script src="https://foo/bar.js" trigger="now" once status="loading">
        <div class="facade-placeholder-content" data-script-status="loading"></div>
        <div class="facade-scripted-content" data-script-status="loading" hidden>
        </div>
      </facade-script>
      <facade-script src="https://foo/bar.js" trigger="now" once status="loading">
        <div class="facade-placeholder-content" data-script-status="loading"></div>
        <div class="facade-scripted-content" data-script-status="loading" hidden>
        </div>
      </facade-script>
    `);

    // And no script should have been added to the <head>
    expect(page.doc.querySelectorAll('script[src]').length).toEqual(1);
  });

  it('should render each unique script once when once=true', async () => {
    const page = await newSpecPage({
      components: [FacadeScript],
      html: `
        <facade-script src="https://foo/bar.js" trigger="now" once></facade-script>
        <facade-script src="https://foo/BAZ.js" trigger="now" once></facade-script>
      `,
    });

    expect(page.body).toEqualHtml(`
      <facade-script src="https://foo/bar.js" trigger="now" once status="loading">
        <div class="facade-placeholder-content" data-script-status="loading"></div>
        <div class="facade-scripted-content" data-script-status="loading" hidden>
          <script src="https://foo/bar.js"></script>
        </div>
      </facade-script>
      </facade-script>
      <facade-script src="https://foo/BAZ.js" trigger="now" once status="loading">
        <div class="facade-placeholder-content" data-script-status="loading"></div>
        <div class="facade-scripted-content" data-script-status="loading" hidden>
        </div>
      </facade-script>
    `);

    // And no script should have been added to the <head>
    expect(page.doc.querySelectorAll('script[src]').length).toEqual(1);
  });
});
