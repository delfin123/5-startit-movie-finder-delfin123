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

const logger = log4js.getLogger('result')
const logger2 = log4js.getLogger('result')

    module.exports.config = {
      baseUrl: 'https://movies-finder.firebaseapp.com/',
      SELENIUM_PROMISE_MANAGER: false,
      capabilities: { 
        browserName: 'chrome', 
        enableVNC: true,
        name: "Alexander Shtanko"
        },
      specs: ['search.ts','movieCard.ts','navigation.ts'],
      onPrepare: async function() {
        (async function(){
        let oldLog = console.log;
        console.log = function (message) {
            logger2.info(message)
            oldLog.apply(console, arguments);
        }
        })()

        logger.info('On prepare started')
        await browser.manage().window().maximize();
        // Global implicit wait setup
        await browser.manage().timeouts().implicitlyWait(1000)
    
        afterEach(async function () {
          await browser.manage().timeouts().implicitlyWait(1000)
        })

        let ConsoleReporter = require('jasmine2-reporter').Jasmine2Reporter
        let console_reporter_options = {
          startingSpec: true
        }
        jasmine.getEnv().addReporter(new ConsoleReporter(console_reporter_options))
      }
    }