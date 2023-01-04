const reportRunner = require('./report');
const fs = require('fs');
let countries = require('./countries');

// let countries = ['KH', 'CN', 'TW', 'ID', 'IR', 'NP', 'PK', 'PH', 'KR', 'VN', 'DK', 'FR', 'US'];
// let countries = ['MX', 'CO', 'GB', 'US', 'FR', 'DE', 'CH'];
let locale = 'en';
let running;
let reportsGeneratedWithSuccess = 0;
let failedReports = [];
function runNext() {
    if (countries.length > 0) {
        let countryCode = countries.pop();
        console.log('Running', countryCode, locale);
        fs.mkdirSync('./reports/' + countryCode, { recursive: true });
        let localeSuffix = locale == 'en' ? '' : '.' + locale;
        running = fs.createWriteStream('./reports/' + countryCode + '/GBIF_CountryReport_' + countryCode + localeSuffix + '.pdf');
        running.on('finish', function() {
            setTimeout(runNext, 1000);
        });
        try {
            reportRunner.runReport({
                countryCode: countryCode,
                locale: locale,
                targetStream: running
            });
            reportsGeneratedWithSuccess ++;
            console.log('Reports generated: ' + reportsGeneratedWithSuccess);
        } catch (err) {
            failedReports.push(countryCode);
            console.log(err);
            console.log('******** FAILED REPORTS: ********');
            console.log(failedReports.toString());
        }
    }
}

runNext();
