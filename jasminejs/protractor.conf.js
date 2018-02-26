require('ts-node').register();

let log4js = require('log4js')
log4js.configure({ 
  /*appenders: {
    out: { type: 'console' }, 
    task: { type: 'dateFile', filename: 'logs/task',"pattern":"-dd.log", alwaysIncludePattern:true }, 
    result: { type: 'dateFile', filename: 'logs/result',"pattern":"-dd.log", alwaysIncludePattern:true}, 
    error: { type: 'dateFile', filename: 'logs/error', "pattern":"-dd.log",alwaysIncludePattern:true}, 
    default: { type: 'dateFile', filename: 'logs/default', "pattern":"-dd.log",alwaysIncludePattern:true}, 
    rate: { type: 'dateFile', filename: 'logs/rate', "pattern":"-dd.log",alwaysIncludePattern:true} 
  },
  categories: {
    default: { appenders: ['out','default'], level: 'info' },
    task: { appenders: ['task'], level: 'info'},
    result: { appenders: ['result'], level: 'info' },
    error: { appenders: ['error'], level: 'error' },
    rate: { appenders: ['rate'], level: 'info' }
  }
})*/
"appenders": {
  "out": { "type": "stdout" },
  "debug": { "type": "dateFile", "filename": "logs/debug", "pattern": "-yyyy-MM-dd.log", "alwaysIncludePattern": true, "keepFileExt": true },
  "debug-filter": { "type": "logLevelFilter", "appender": "debug", "level": "debug", "maxLevel": "debug" },
  "result": { "type": "dateFile", "filename": "logs/result", "pattern": "-yyyy-MM-dd.log", "alwaysIncludePattern": true, "keepFileExt": true },
  "result-filter": { "type": "logLevelFilter", "appender": "result", "level": "info", "maxLevel": "info" },
  "error": { "type": "dateFile", "filename": "logs/error", "pattern": "-yyyy-MM-dd.log", "alwaysIncludePattern": true, "keepFileExt": true },
  "error-filter": { "type": "logLevelFilter", "appender": "error", "level": "error", "maxLevel": "error" },
  "default": { "type": "dateFile", "filename": "logs/default", "pattern": "-yyyy-MM-dd.log", "alwaysIncludePattern": true, "keepFileExt": true },
  "warn": { "type": "dateFile", "filename": "logs/warn", "pattern": "-yyyy-MM-dd.log", "alwaysIncludePattern": true, "keepFileExt": true },
  "warn-filter": { "type": "logLevelFilter", "appender": "warn", "level": "warn", "maxLevel": "warn" }
  },
  "categories": {
  "default": { "appenders": ["out", "default"], "level": "info" },
  "debug": { "appenders": ["debug", "debug-filter"], "level": "debug" },
  "result": { "appenders": ["result-filter", "debug-filter", "error-filter", "warn-filter"], "level": "debug" },
  "error": { "appenders": ["error", "error-filter"], "level": "error" },
  "warn": { "appenders": ["warn", "warn-filter"], "level": "warn" }
  }
  })

const logger = log4js.getLogger('result')

    module.exports.config = {
      baseUrl: 'https://movies-finder.firebaseapp.com/',
      SELENIUM_PROMISE_MANAGER: false,
      capabilities: { 
        browserName: 'chrome', 
        enableVNC: true,
        name: "Alexander Shtank0"
        },
      specs: ['logger.ts'],
      onPrepare: async function() {
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