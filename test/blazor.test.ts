import { By } from "selenium-webdriver";
import VSCode from "../src/VSCode";

let code: VSCode;

describe('Blazor Extension Tests', () => {
    beforeAll(async () => {
        code = new VSCode();
        await code.start();
    });

    afterAll(async () => {
        await code.stop();
    });

    it('should have telerik extension', async () => {
        await code.driver.sleep(5000);
        const minimize = await code.driver.findElement(By.css('.window-minimize'));
        await minimize.click();
        await code.driver.sleep(1000);
    });
});
