// @ts-check

const { SpecReporter, StacktraceOption } = require('jasmine-spec-reporter');
process.env.CHROMIUM_BIN = require('puppeteer').executablePath();

/**
 * @type { import("protractor").Config }
 */
exports.config = {
  allScriptsTimeout: 11000,
  baseUrl: 'http://localhost:4200/',
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: ['--disable-gpu', '--headless'],
      binary: process.env.CHROMIUM_BIN,
    },
  },
  directConnect: true,
  framework: 'jasmine',
  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000,
    showColors: true,
    print() {},
  },
  specs: ['./src/**/*.e2e-spec.ts'],
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.json'),
    });
    jasmine.getEnv().addReporter(
      new SpecReporter({
        spec: {
          displayStacktrace: StacktraceOption.PRETTY,
        },
      })
    );
  },
};
