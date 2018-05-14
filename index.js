var reporter = require('cucumber-html-reporter');
 
( () => {
    let foundationOptions = {
        theme: 'bootstrap',
        jsonDir: 'reports/json/',
        ignoreBadJsonFile: true,
        output: './reports/report.html',
        reportSuiteAsScenarios: true,
        launchReport: false,
        metadata: {
            "App Version":"0.3.2",
            "Test Environment": "STAGING",
            "Browser": "Chrome  66.0.3359.117",
            "Platform": "Windows 10",
            "Parallel": "Scenarios",
            "Executed": "Remote"
        },
    };
    reporter.generate(foundationOptions);
})();