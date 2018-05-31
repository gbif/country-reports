const reportRunner = require('./report');
// const dataProvider = require('./dataProvider');
const fs = require('fs');


let countries = ['US']; // ['KH', 'CN', 'TW', 'ID', 'IR', 'NP', 'PK', 'PH', 'KR', 'VN']; // 'DK', 'FR', 'US'
let running;
function runNext() {
    if (countries.length > 0) {
        let countryCode = countries.pop();
        console.log('Running ' + countryCode);
        running = fs.createWriteStream('/Users/thomas/countryreports/GBIF_CountryReport_' + countryCode + '.pdf');
        running.on('finish', runNext);
        try {
            reportRunner.runReport({
                countryCode: countryCode,
                locale: 'en',
                year: 2017,
                targetStream: running
            });
            } catch (err) {
                console.log(err);
            }
    }
}

runNext();


