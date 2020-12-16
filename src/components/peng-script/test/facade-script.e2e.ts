import { newE2EPage } from '@stencil/core/testing';

describe('facade-script', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<facade-script></facade-script>');

    const element = await page.find('facade-script');
    expect(element).toHaveClass('hydrated');
  });
});
