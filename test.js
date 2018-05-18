const reportRunner = require('./report');
const dataProvider = require('./dataProvider');
const fs = require('fs');

//dataProvider.getAccessAndUsageData(2017, 'DK')
/*
reportRunner.runReport({
    countryCode: 'TZ',
    locale: 'en',
    targetStream: fs.createWriteStream('/Users/thomas/countryreports/GBIF_CountryReport_' + 'TZ' + '.pdf')
}); */

reportRunner.runReport({
    countryCode: 'BE',
    locale: 'en',
    year: 2017,
    targetStream: fs.createWriteStream('/Users/thomas/countryreports/GBIF_CountryReport_' + 'BE' + '.pdf')
});


