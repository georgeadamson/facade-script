import { newSpecPage } from '@stencil/core/testing';
import { FacadeScript } from '../facade-script';

describe('facade-script for script added inline', () => {
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
        <div class="facade-script-placeholder"></div>
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
        <div class="facade-script-placeholder"></div>
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
        <div class="facade-script-placeholder"></div>
      </facade-script>
    `);
  });

  it('should render script tag when trigger="now"', async () => {
    const page = await newSpecPage({ components: [FacadeScript] });

    const eventSpy = jest.fn();
    page.win.addEventListener('facadescript', eventSpy);

    await page.setContent(
      `<facade-script src="https://foo/bar.js" trigger="now"></facade-script>`
    );

    expect(page.root).toEqualHtml(`
      <facade-script src="https://foo/bar.js" trigger="now" status="LOADING">
        <div class="facade-script-placeholder"></div>
        <script src="https://foo/bar.js" data-facadescriptid="3" hidden></script>
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
      <facade-script src="https://foo/bar.js" trigger="now" show-when="triggered" status="LOADING">
        <div class="facade-script-placeholder" hidden></div>
        <script src="https://foo/bar.js" data-facadescriptid="4"></script>
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
      <facade-script src="https://foo/bar.js" trigger="now" status="LOADING">
        <div class="facade-script-placeholder"></div>
        <script src="https://foo/bar.js" data-facadescriptid="5" hidden></script>
      </facade-script>
      <facade-script src="https://foo/bar.js" trigger="now" status="LOADING">
        <div class="facade-script-placeholder"></div>
        <script src="https://foo/bar.js" data-facadescriptid="6" hidden></script>
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
      <facade-script src="https://foo/bar.js" trigger="now" once status="LOADING">
        <div class="facade-script-placeholder"></div>
        <script src="https://foo/bar.js" data-facadescriptid="7" hidden></script>
      </facade-script>
      <facade-script src="https://foo/bar.js" trigger="now" once status="LOADING">
        <div class="facade-script-placeholder"></div>
      </facade-script>
      <facade-script src="https://foo/bar.js" trigger="now" once status="LOADING">
        <div class="facade-script-placeholder"></div>
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
        <facade-script src="https://foo/BAZ.js" trigger="now" once></facade-script>
      `,
    });

    expect(page.body).toEqualHtml(`
      <facade-script src="https://foo/bar.js" trigger="now" once status="LOADING">
        <div class="facade-script-placeholder"></div>
        <script src="https://foo/bar.js" data-facadescriptid="10" hidden></script>
      </facade-script>
      <facade-script src="https://foo/BAZ.js" trigger="now" once status="LOADING">
        <div class="facade-script-placeholder"></div>
        <script src="https://foo/BAZ.js" data-facadescriptid="11" hidden></script>
      </facade-script>
      <facade-script src="https://foo/BAZ.js" trigger="now" once status="LOADING">
        <div class="facade-script-placeholder"></div>
      </facade-script>
    `);

    // And no other scripts should have been added:
    expect(page.doc.querySelectorAll('script[src]').length).toEqual(2);
  });


  it('should set props on the script element', async () => {
    const page = await newSpecPage({
      components: [FacadeScript],
      html: `
        <facade-script src="/sample-script.js" trigger="now" props='{"title":"test"}'></facade-script>
      `,
    });

    expect(page.body).toEqualHtml(`
      <facade-script src="/sample-script.js" trigger="now" props='{"title":"test"}' status="LOADING">
        <div class="facade-script-placeholder"></div>
        <script src="/sample-script.js" data-facadescriptid="13" hidden title="test"></script>
      </facade-script>
    `);

    // And no other scripts should have been added:
    // expect(page.doc.querySelectorAll('script[src]').length).toEqual(2);
  });
});
