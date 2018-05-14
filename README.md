# GBIF Country reports
> Nodejs country report runner

### Requirements

* Node version v8.9.4 installed.

### Install

In the the home directory of your nodejs project (where your package.json is located) run:

```npm install gbif/country-reports --save ```


### Usage

Write a report to your file system

```
const reportRunner = require('gbif-country-reports');
const fs = require('fs');

reportRunner.runReport({
    countryCode: 'GB',
    locale: 'en',
    year: 2017,
    targetStream: fs.createWriteStream('/Users/you/countryreports/GBIF_CountryReport_' + 'GB' + '.pdf')
});
```

Or use it in your express application

```
const express = require('express'),
    router = express.Router(),
    reportRunner = require('gbif-country-reports');

module.exports = (app) => {
    app.use('/', router);
};

router.get('/country/report/:iso2?', (req, res, next) => {
    let iso2;
    if (req.params.hasOwnProperty('iso2') && req.params.iso2 !== undefined) {
        iso2 = req.params.iso2.toUpperCase();
    }
    let locale = (req.query.locale) ? req.query.locale : 'en';
    
    try {
        res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename=GBIF_CountryReport_' + iso2 + '.pdf'
        });
        
        reportRunner.runReport({
          countryCode: iso2,
          locale: locale,
          year: req.query.year,
          targetStream: res
         });
         
    } catch (err) {
        // Do something with err
        res.sendStatus(422);
    }
});
```

### Developers

[PDFkit documentation](http://pdfkit.org/)

[Highcharts documentation](https://www.highcharts.com/demo)
