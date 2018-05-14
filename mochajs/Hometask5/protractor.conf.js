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
      baseUrl: 'https://movies-finder.firebaseapp.com/',
      SELENIUM_PROMISE_MANAGER: false,
      capabilities: { 
        browserName: 'chrome', 
        enableVNC: true,
        name: "Alexander Shtanko"
        },
      specs: ['lesson5task.ts'],
<<<<<<< HEAD:Hometask5/protractor.conf.js
      framework:'mocha',
      mochaOpts: {
        timeout: 30000,
        reporter: 'mocha-allure-reporter'
=======
      framework: 'mocha',
    mochaOpts: {
        timeout: 30000,
        reporter: 'nyan'
>>>>>>> 4fb4f6a7b5d5dd088bc664b5c019edfd9bd24580:mochajs/Hometask5/protractor.conf.js
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
<<<<<<< HEAD:Hometask5/protractor.conf.js
        }
=======
    
      }
>>>>>>> 4fb4f6a7b5d5dd088bc664b5c019edfd9bd24580:mochajs/Hometask5/protractor.conf.js
    }