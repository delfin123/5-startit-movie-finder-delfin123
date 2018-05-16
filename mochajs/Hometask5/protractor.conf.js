require('ts-node').register();

let log4js = require('log4js')
log4js.configure({ 
    appenders: {
      default: { type: 'datefile', filename: 'logs/result', pattern: "-yyyy-MM-dd.log", alwaysIncludePattern: true, keepFileExt: true },
      out: { type: 'stdout' },
      app: { type: 'datefile', filename: 'logs/result', pattern: "-yyyy-MM-dd.log", alwaysIncludePattern: true, keepFileExt: true }
    },
    categories: {
      result: { appenders: ['app' ], level: 'debug' },
      default: { appenders: ['out',"default"], level: 'debug' }
    }
  })

const logger = log4js.getLogger('default')
const logger2 = log4js.getLogger('result')

    module.exports.config = {
      baseUrl: 'https://www.ssls.com/',
      SELENIUM_PROMISE_MANAGER: false,
      capabilities: { 
        browserName: 'chrome', 
        enableVNC: true,
        name: "Alexander Shtanko"
        },
        /*browserName: 'internet explorer', 
        'platform': 'ANY',
        'version': '11',*/
      specs: ['lesson5task.ts'],
      framework: 'mocha',
      mochaOpts:{
        reporter: 'mochawesome-screenshots',
        reporterOptions: {
            reportDir: 'customReportDir',
            reportName: 'customReportName',
            reportTitle: 'customReportTitle',
            reportPageTitle: 'customReportPageTitle',
            takePassedScreenshot: false,
            clearOldScreenshots: true,
            shortScrFileNames: false,
            jsonReport: false,
            multiReport: false
        },
        timeout:30000
    },
      onPrepare: async function() {
        (async function(){
          let oldLog = console.log;
          console.log = function (message) {
              logger2.info(message)
              oldLog.apply(console, arguments);
          };
      })();

        logger.info('On prepare started')
        await browser.manage().window().maximize();
        // Global implicit wait setup
        await browser.manage().timeouts().implicitlyWait(1000)
    },
   }