import { newSpecPage } from '@stencil/core/testing';
import { FacadeScript } from '../facade-script';

describe('facade-script for script added to <head>', () => {
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

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render script in <head> when global=true', async () => {
    const page = await newSpecPage({
      components: [FacadeScript],
      html: `<facade-script src="https://foo/bar.js" trigger="now" global></facade-script>`,
    });

    expect(page.root).toEqualHtml(`
      <facade-script src="https://foo/bar.js" trigger="now" global status="LOADING">
        <div class="facade-script-placeholder"></div>
      </facade-script>
    `);

    // Script should be in the <head> this time:
    const script = page.doc.head.querySelectorAll('script');
    expect(script).toHaveLength(1);
    expect(script[0]).toHaveProperty('src', 'https://foo/bar.js');
  });

  it('should render scripts in <head> when global=true, for each instance', async () => {
    const page = await newSpecPage({
      components: [FacadeScript],
      html: `
        <facade-script src="https://foo/bar.js" trigger="now" global></facade-script>
        <facade-script src="https://foo/BAR2.js" trigger="now" global></facade-script>`,
    });

    expect(page.body).toEqualHtml(`
      <facade-script src="https://foo/bar.js" trigger="now" global status="LOADING">
        <div class="facade-script-placeholder"></div>
      </facade-script>
      <facade-script src="https://foo/BAR2.js" trigger="now" global status="LOADING">
        <div class="facade-script-placeholder"></div>
      </facade-script>
    `);

    // Script should be in the <head> this time:
    const scripts = page.doc.head.querySelectorAll('script');
    expect(scripts).toHaveLength(2);
    expect(scripts[0]).toHaveProperty('src', 'https://foo/bar.js');
    expect(scripts[1]).toHaveProperty('src', 'https://foo/BAR2.js');
  });

  it('should render each unique script once in <head> when once=true & global=true', async () => {
    const page = await newSpecPage({
      components: [FacadeScript],
      // html: ''
    });

    // This will be populated by a status each time a script changes status:
    const eventStatuses = [];

    const eventSpy = jest.fn((e) => { eventStatuses.push(e.detail.status) });
    page.win.addEventListener('facadescript', eventSpy);

    await page.setContent(
      `<facade-script src="https://foo/bar.js" trigger="now" global once id="elem1"></facade-script>
       <facade-script src="https://foo/bar.js" trigger="now" global once id="elem2"></facade-script>`
    );


    expect(page.body).toEqualHtml(`
      <facade-script src="https://foo/bar.js" trigger="now" global once status="LOADING" id="elem1">
        <div class="facade-script-placeholder"></div>
      </facade-script>
      <facade-script src="https://foo/bar.js" trigger="now" global once status="LOADING" id="elem2">
        <div class="facade-script-placeholder"></div>
      </facade-script>
    `);

    // Emitted events
    expect(eventSpy).toHaveBeenCalledTimes(4);
    expect(eventStatuses).toEqual(['TRIGGERED', 'LOADING', 'TRIGGERED', 'LOADING']);
  });

  it('should not render script tag until wait="2000"', async () => {
    const page = await newSpecPage({
      components: [FacadeScript],
      html: `<facade-script src="https://foo/bar.js" trigger="now" wait="2000"></facade-script>`,
    });
    expect(page.body).toEqualHtml(`
      <facade-script src="https://foo/bar.js" trigger="now" wait="2000" status="WAITING">
        <div class="facade-script-placeholder"></div>
      </facade-script>
    `);
  });
});
