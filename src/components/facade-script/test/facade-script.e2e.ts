import { newE2EPage } from '@stencil/core/testing';

describe('facade-script', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<facade-script src="/sample-script.js" trigger="now"></facade-script>'
    );

    const element = await page.find('facade-script');
    expect(element).toHaveClass('hydrated');

    await page.waitForChanges();

    expect(element).toHaveAttribute('status');
    expect(element.getAttribute('status')).toBe('LOADED');
  });
});
