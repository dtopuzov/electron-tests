describe('smoke tests', () => {
  it('should start the app', async () => {
    await browser.pause(10000);
    const win = await browser.getWindowHandles();
    for (let i = 0; i < win.length; i++) {
      await browser.switchToWindow(win[i]);
      const source = await browser.getPageSource();
      if (source.includes('monaco-workbench')) {
        browser.keys(['Control', 'Shift', 'x'])
        await browser.pause(10000);
        const source = await browser.getPageSource();
        console.log(source);
        break;
      }
    }
  });
});
