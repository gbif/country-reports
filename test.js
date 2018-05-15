const reportRunner = require('./report');
const fs = require('fs');
reportRunner.runReport({
    countryCode: 'SE',
    locale: 'en',
    year: 2017,
    targetStream: fs.createWriteStream('/Users/thomas/countryreports/GBIF_CountryReport_' + 'SE' + '.pdf')
});
