import { newSpecPage } from '@stencil/core/testing';
import { PengScript } from '../peng-script';

describe('peng-script for script added to <head>', () => {
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

  it('should render script in <head> when head=true', async () => {
    const page = await newSpecPage({
      components: [PengScript],
      html: `<peng-script src="https://foo/bar.js" trigger="now" head></peng-script>`,
    });

    expect(page.root).toEqualHtml(`
      <peng-script src="https://foo/bar.js" trigger="now" head status="loading">
        <div class="peng-placeholder-content" data-script-status="loading"></div>
        <div class="peng-scripted-content" data-script-status="loading" hidden></div>
      </peng-script>
    `);

    // Script should be in the <head> this time:
    const script = page.doc.head.querySelectorAll('script');
    expect(script).toHaveLength(1);
    expect(script[0]).toHaveProperty('src', 'https://foo/bar.js');
  });

  it.only('should render scripts in <head> when head=true, for each instance', async () => {
    const page = await newSpecPage({
      components: [PengScript],
      html: `
        <peng-script src="https://foo/bar.js" trigger="now" head></peng-script>
        <peng-script src="https://foo/BAR2.js" trigger="now" head></peng-script>`,
    });

    expect(page.body).toEqualHtml(`
      <peng-script src="https://foo/bar.js" trigger="now" head status="loading">
        <div class="peng-placeholder-content" data-script-status="loading"></div>
        <div class="peng-scripted-content" data-script-status="loading" hidden></div>
      </peng-script>
      <peng-script src="https://foo/BAR2.js" trigger="now" head status="loading">
        <div class="peng-placeholder-content" data-script-status="loading"></div>
        <div class="peng-scripted-content" data-script-status="loading" hidden></div>
      </peng-script>
    `);

    // Script should be in the <head> this time:
    const scripts = page.doc.head.querySelectorAll('script');
    expect(scripts).toHaveLength(2);
    expect(scripts[0]).toHaveProperty('src', 'https://foo/bar.js');
    expect(scripts[1]).toHaveProperty('src', 'https://foo/BAR2.js');
  });

  it.only('should render each unique script once in <head> when once=true & head=true', async () => {
    const page = await newSpecPage({ 
      components: [PengScript],
      // html: ''
    });

    // This will be populated by a status each time a script changes status:
    const eventStatuses = [];

    const eventSpy = jest.fn((e) => { eventStatuses.push(e.detail.status) });
    page.win.addEventListener('pengscript', eventSpy);

    await page.setContent(
      `<peng-script src="https://foo/bar.js" trigger="now" head once id="elem1"></peng-script>
      <peng-script src="https://foo/bar.js" trigger="now" head once id="elem2"></peng-script>`
    );


    expect(page.body).toEqualHtml(`
      <peng-script src="https://foo/bar.js" trigger="now" head once status="loading" id="elem1">
        <div class="peng-placeholder-content" data-script-status="loading"></div>
        <div class="peng-scripted-content" data-script-status="loading" hidden></div>
      </peng-script>
      <peng-script src="https://foo/bar.js" trigger="now" head once status="loading" id="elem2">
        <div class="peng-placeholder-content" data-script-status="loading"></div>
        <div class="peng-scripted-content" data-script-status="loading" hidden></div>
      </peng-script>
    `);

    // Emitted events
    expect(eventSpy).toHaveBeenCalledTimes(4);
    expect(eventStatuses).toEqual(['TRIGGERED', 'LOADING', 'TRIGGERED', 'LOADING']);

    await page.waitForChanges();
    // await new Promise((r) => setTimeout(r, 2000));

    // Script should be in the <head> this time:
    const script = page.doc.head.querySelectorAll('script');
    expect(script.length).toBe(1);
    expect(script[0]).toHaveProperty('src', 'https://foo/bar.js');
  });

  // it('should not render script tag until wait="2000"', async () => {
  //   const page = await newSpecPage({
  //     components: [PengScript],
  //     html: `<peng-script src="https://foo/bar.js" trigger="now"></peng-script>`,
  //   });
  //   expect(page.root).toEqualHtml(`
  //     <peng-script src="https://foo/bar.js" trigger="now" status="loading">
  //       <div class="peng-placeholder-content" data-script-status="loading"></div>
  //       <div class="peng-scripted-content" data-script-status="loading" hidden>
  //       </div>
  //     </peng-script>
  //   `);
  // });
});
