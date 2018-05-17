const reportRunner = require('./report');
const dataProvider = require('./dataProvider');
const fs = require('fs');

reportRunner.runReport({
    countryCode: 'TZ',
    locale: 'en',
    targetStream: fs.createWriteStream('/Users/thomas/countryreports/GBIF_CountryReport_' + 'TZ' + '.pdf')
});

reportRunner.runReport({
    countryCode: 'DK',
    locale: 'da',
    year: 2017,
    targetStream: fs.createWriteStream('/Users/thomas/countryreports/GBIF_CountryReport_' + 'DK' + '.pdf')
});


