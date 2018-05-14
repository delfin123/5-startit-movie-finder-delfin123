require('ts-node').register();

module.exports.config = {
    specs: ['features/*.feature'],
    directConnect: true,
    baseUrl: 'https://movies-finder.firebaseapp.com/',
    SELENIUM_PROMISE_MANAGER: false,
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),

    cucumberOpts: {
        format: ['json:reports/json/cucumber.json',
        'node_modules/cucumber-pretty',],
        require: ['step_definitions/*.ts'],
    },
    onPrepare: async function() {
        await browser.manage().window().maximize();
        await browser.manage().timeouts().implicitlyWait(1000)
    
        }
}