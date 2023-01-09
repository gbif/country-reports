const reportRunner = require('./report');
const fs = require('fs');
let countries = require('./countries');

// let countries = ['KH', 'CN', 'TW', 'ID', 'IR', 'NP', 'PK', 'PH', 'KR', 'VN', 'DK', 'FR', 'US'];
// let countries = ['MX', 'CO', 'GB', 'US', 'FR', 'DE', 'CH'];
let locale = 'en';
// Year number should be the previous year; it is the report at the end of that year.
let year = new Date().getFullYear() - 1;
let running;
let reportsGeneratedWithSuccess = 0;
let failedReports = [];
function runNext() {
    if (countries.length > 0) {
        let countryCode = countries.pop();
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
                year: year,
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
