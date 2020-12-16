import { newE2EPage } from '@stencil/core/testing';

describe('peng-script', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<peng-script></peng-script>');

    const element = await page.find('peng-script');
    expect(element).toHaveClass('hydrated');
  });
});
