import { expect } from "chai";
import { Browser, Builder, Key, logging, ThenableWebDriver } from "selenium-webdriver";
import { Executor } from "selenium-webdriver/http";

describe('Hello World Example UI Tests', () => {
    it('Command shows a notification with the correct text', async () => {
        const driver = await new Builder()
            .usingServer('http://localhost:9515')
            .withCapabilities({
                'goog:chromeOptions': {
                    binary: 'C:/Git/electron-tests/test-resources/VSCode-win32-x64-archive/Code.exe'
                }
            })
            .forBrowser('chrome')
            .build();

        await driver.sleep(10000);
        const handles = await driver.getAllWindowHandles();
        await driver.switchTo().window(handles[0]);
        await driver.sleep(1000);
        await driver.actions().keyDown(Key.CONTROL).keyDown('P').keyUp('P').keyUp(Key.CONTROL).perform();
        await driver.switchTo().window(handles[1]);
        await driver.sleep(1000);
        await driver.actions().keyDown(Key.CONTROL).keyDown('P').keyUp('P').keyUp(Key.CONTROL).perform();
        await driver.sleep(1000);
        await driver.actions().sendKeys('>').perform();
        await driver.sleep(1000);
        expect(handles.length).to.equal(3);
        console.log(handles);
    });
});