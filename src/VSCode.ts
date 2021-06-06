import path = require("path");
import { Builder, WebDriver } from "selenium-webdriver";
import { ServiceBuilder } from "selenium-webdriver/chrome";

export default class VSCode {
    public driver: WebDriver;

    public async start(): Promise<void> {
        this.driver = this.getDriver();
    }

    public async stop(): Promise<void> {
        await this.driver.quit();
    }

    private getDriver(): WebDriver {
        const driverPath = path.join(process.cwd(), 'temp', 'code', 'chromedriver.exe');
        const serviceBuilder = new ServiceBuilder(driverPath);
        const capabilities = {
            'browserName': 'chrome',
            'goog:chromeOptions': {
                binary: this.getCodePath(),
                args: []
            }
        };

        return new Builder()
            .setChromeService(serviceBuilder)
            .withCapabilities(capabilities)
            .build();
    }

    private getCodePath(): string {
        return path.join(process.cwd(), 'temp', 'code', `VSCode-${this.getPlatform()}`, 'Code.exe');
    }

    private getPlatform(): string {
        let platform: string = process.platform;
        const arch = process.arch;

        if (platform === 'linux') {
            platform += arch === 'x64' ? `-${arch}` : `-ia32`;
        } else if (platform === 'win32') {
            platform += arch === 'x64' ? `-${arch}` : '';
            platform += '-archive';
        }

        return platform;
    }
}
