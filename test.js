const reportRunner = require('./report');
const fs = require('fs');
reportRunner.runReport({
    countryCode: 'TZ',
    locale: 'en',
    year: 2017,
    targetStream: fs.createWriteStream('/Users/thomas/countryreports/GBIF_CountryReport_' + 'TZ' + '.pdf')
});

reportRunner.runReport({
    countryCode: 'DK',
    locale: 'en',
    year: 2017,
    targetStream: fs.createWriteStream('/Users/thomas/countryreports/GBIF_CountryReport_' + 'DK' + '.pdf')
});
