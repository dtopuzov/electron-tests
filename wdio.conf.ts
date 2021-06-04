/* eslint-disable object-curly-newline */
/* eslint-disable object-shorthand */
/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/no-unused-vars */

function getVSCodePath() {
  if (process.env.CODE_PATH) {
    return process.env.CODE_PATH;
  }

  switch (process.platform) {
    case 'win32':
      return `${process.env.LOCALAPPDATA}\\Programs\\Microsoft VS Code\\Code.exe`;
    case 'darwin':
      throw new Error('Not implemented!');
    default:
      throw new Error('Unknown operating system!');
  }
}

export const config = {
  // ============
  // Parallelism
  // ============
  maxInstances: 1,

  // ============
  // Capabilities
  // ============
  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': {
      binary: getVSCodePath(),
      args: ['--locale=en', process.cwd() + '\\temp',
      ],
    },
  }],

  // ============
  // WebdriverIO Capabilities
  // ============
  waitforTimeout: 30000, // Default timeout for all waitFor* commands.
  connectionRetryTimeout: 120000, // Default timeout for WebDriver request
  connectionRetryCount: 3, // Default request retries count
  coloredLogs: true,
  logLevel: 'error',
  deprecationWarnings: true,
  bail: 0,

  // ============
  // Framework
  // ============
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    compilers: [
      'tsconfig-paths/register'
    ],
    timeout: process.env.DEBUG ? 99999999 : 120000
  },

  // ============
  // Log Levels
  // ============
  logLevels: {
    webdriver: 'error',
    '@wdio/junit-reporter': 'info',
    '@wdio/allure-reporter': 'info'
  },

  // ============
  // Reporters
  // ============
  reporters: [
    'spec',
    ['junit', {
      outputDir: './junit-results',
      errorOptions: {
        error: 'message',
        failure: 'message',
        stacktrace: 'stack'
      },
      outputFileFormat: function (options) {
        return `results-${options.cid}.xml`;
      }
    }],
    ['allure', {
      outputDir: './allure-results',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: false,
      disableMochaHooks: false
    }]
  ],

  // ============
  // Screenshots
  // ============
  screenshotPath: './screenshots/',

  // ============
  // Hooks
  // ============

  /**
  * Gets executed before test execution begins. At this point you can access to all global
  * variables like `browser`. It is the perfect place to define custom commands.
  * @param {Array.<Object>} capabilities list of capabilities details
  * @param {Array.<String>} specs List of spec file paths that are to be run
  */
  before: function (capabilities, specs) {
  },

  /**
  * Function to be executed before a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
  * @param {Object} test test details
  */
  beforeTest: function () {
  },

  /**
   * Function to be executed after a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
   * @param {Object} test test details
   */
  afterTest: function (test, context, { error, result, duration, passed, retries }: any) {
    if (!passed) {
      const filename = encodeURIComponent(test.title.replace(/\s+/g, '-'));
      const filePath = `${this.screenshotPath + filename}.png`;
      browser.saveScreenshot(filePath);
    }
  },
};
