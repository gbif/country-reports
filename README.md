# GBIF Activity Reports

Produces the activity reports shown on the GBIF country/area pages, for example [Andorra](https://www.gbif.org/sites/default/files/gbif_analytics/country/AD/GBIF_CountryReport_AD.pdf).

## Requirements

* Node version v8 installed (for development)
* [Docker installed](https://docs.docker.com/engine/installation/)

## Docker Build

1. Build the Docker image (see the [Dockerfile](./Dockerfile)):
   ```
   docker build --pull --tag gbif/country-reports .
   ```

2. Run the image
   ```
   docker run --env OWNER=$(id -u):$(id -g) --volume $PWD/reports/:/usr/src/app/reports --rm --name country-reports --interactive --tty gbif/country-reports
   ```

   Those arguments:

   * `--env` sets an environment variable, so ownership of the files can be controlled
   * `--volume $PWD/reports/:/usr/src/app/reports mounts the host directory `./reports` to `/usr/src/app/reports` within the container
   * `--rm` deletes the container when it exits
   * `--name` assigns a name to it
   * `--interactive` and `--tty` are so it receives input, so `^C` works to exit.

3. Run the reports
   ```
   $ highcharts-export-server --enableServer 1 --allowCodeExecution 1 & sleep 1 && node runAll.js; chown -R $OWNER reports
   ```

4. Stop the container
   Just exit. Type `^D` or `exit` from within, or `docker stop country-reports` from without.

5. Optionally (and assuming it works), publish it to our repository:
   ```
   docker tag gbif/country-reports docker.gbif.org/country-reports:2022-01
   docker push docker.gbif.org/country-reports:2022-01
   ```

## Docker usage (for annual reports)

The usual process when producing annual analytics reports is

1. Update URLs in `config.js`, for example to use UAT analytics results if these are not yet in production.
2. Run the reports using the published Docker image, they should be output to the `reports/` directory.
   ```
   docker run --env OWNER=$(id -u):$(id -g) --volume $PWD/reports/:/usr/src/app/reports --rm --name country-reports --interactive --tty docker.gbif.org/country-reports:latest
   highcharts-export-server --enableServer 1 --allowCodeExecution 1 & sleep 1 && node runAll.js; chown -R $OWNER reports
   ```
3. Rsync to the analytics server.

## Development

In the the home directory of your nodejs project (where your package.json is located) run:
```
npm install gbif/country-reports --save
```

### Run all reports in a batch

Make sure you have a local [highcharts export server](https://www.highcharts.com/docs/export-module/setting-up-the-server) installed:

```
npm install highcharts-export-server -g
```

Start the export server:

```
highcharts-export-server --enableServer 1
```

Install the dependencies of this project, by moving into the project directory (where package.json is) and do:

```
npm install
```

Run the reports:

```
node runAll.js
```

## Usage

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

### Highcharts generation
The default configuration for batch report running requires [a local instance of the export server](https://www.highcharts.com/docs/export-module/setting-up-the-server) running, as explained above.

However, if used as a module for on-the-fly generation in the portal, charts can be generated by the service run by Highcharts here:http://export.highcharts.com

This service is rate limited to 10 requests pr minute ([terms](https://www.highcharts.com/docs/export-module/terms)), and will be sufficient for on-the-fly generation from the portal.


### Developers

[PDFkit documentation](http://pdfkit.org/)

[Highcharts documentation](https://www.highcharts.com/demo)
