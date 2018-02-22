require('ts-node').register();

    module.exports.config = {
      baseUrl: 'https://movies-finder.firebaseapp.com/',
      SELENIUM_PROMISE_MANAGER: false,
      capabilities: { 
        browserName: 'chrome', 
        enableVNC: true,
        name: "Alexander Shtank0"
        },
      specs: ['lesson5task.ts'],
      onPrepare: async function() {
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