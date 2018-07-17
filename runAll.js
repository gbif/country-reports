const reportRunner = require('./report');
// const dataProvider = require('./dataProvider');
const fs = require('fs');
let countries = require('./countries');


// let countries = ['KH', 'CN', 'TW', 'ID', 'IR', 'NP', 'PK', 'PH', 'KR', 'VN', 'DK', 'FR', 'US'];
let running;
let reportsGeneratedWithSuccess = 0;
let failedReports = [];
function runNext() {
    if (countries.length > 0) {
        let countryCode = countries.pop();
        console.log('Running ' + countryCode);
        running = fs.createWriteStream('./reports/GBIF_CountryReport_' + countryCode + '.pdf');
        running.on('finish', function() {
            setTimeout(runNext, 1000);
        });
        try {
            reportRunner.runReport({
                countryCode: countryCode,
                locale: 'en',
                year: 2017,
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
