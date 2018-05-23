const PDFDocument = require('./pdfkitwithtables');
const rp = require('request-promise');
const documentGenerator = require('./documentGenerator');
const dataProvider = require('./dataProvider');
const ANALYTICS_COUNTRY_BASEURL = require('./config').ANALYTICS_COUNTRY_BASEURL;
const Y_OFFSET = -5; // used for adjusting entire page Y

function compileReport(countryCode, options, targetStream) {
    let doc = new PDFDocument({
        size: 'A4',
        layout: 'portrait', // can be 'landscape',
        margin: 25,
        info: {
            Title: 'GBIF Country Report ' + countryCode,
            Author: 'The GBIF secretariat', // the name of the author
            Subject: '', // the subject of the document
            Keywords: 'Annual report;GBIF;' + countryCode, // keywords associated with the document
            CreationDate: 'DD/MM/YYYY', // the date the document was created (added automatically by PDFKit)
            ModDate: 'DD/MM/YYYY' // the date the document was last modified
        }
    });
    doc.registerFont('Arial', __dirname + '/fonts/Arial-Unicode.ttf');
    doc.registerFont('Arial-Bold', __dirname + '/fonts/Arial-Unicode-Bold.ttf');
    doc.registerFont('Arial-Italic', __dirname + '/fonts/Arial-Unicode-Italic.ttf');

    let isInvolvedInprojects = options.projectsWithCountryAsPartner.length > 0;
    let totalNumpages = (isInvolvedInprojects) ? 6 : 5;
    doc.pipe(targetStream);

    documentGenerator.header(doc, options);
    documentGenerator.accessAndUsage(doc, options);
    documentGenerator.datAvailability(doc, options);
    documentGenerator.dataMobilization(doc, options);
    doc.addPage();
    documentGenerator.secondaryPageHeader(doc, options, 2, totalNumpages);
    documentGenerator.dataDownloads(doc, options);
    documentGenerator.recentPeerReviewed(doc, options);
    doc.addPage();
    documentGenerator.secondaryPageHeader(doc, options, 3, totalNumpages);
    documentGenerator.selectedTaxonomicGroups(doc, options);
    documentGenerator.getChangeOverTime(doc, options);
    doc.addPage();
    documentGenerator.secondaryPageHeader(doc, options, 4, totalNumpages);
    documentGenerator.recentDatasets(doc, options);
    documentGenerator.recentPublishers(doc, options);
    doc.addPage();
    documentGenerator.secondaryPageHeader(doc, options, 5, totalNumpages);
    documentGenerator.dataSharingWithCountryOfOrigin(doc, options);
    documentGenerator.topDataContributors(doc, options);
   if (isInvolvedInprojects) {
    doc.addPage();
    documentGenerator.secondaryPageHeader(doc, options, 6, totalNumpages);
    documentGenerator.projectParticipation(doc, options);
   }
    doc.end();
}

function runReport(options) {
    let countryCode = options.countryCode;
    let locale = options.locale;
    let year = options.year || (new Date().getFullYear() - 1);
    let targetStream = options.targetStream;

    let promises = [
        dataProvider.getPublicationsGlobal(8, year),
        dataProvider.getSelectedCountryPublications(countryCode, year),
        dataProvider.getCountryOccurencesByKingdom(countryCode, year),
        rp({method: 'GET', uri: ANALYTICS_COUNTRY_BASEURL + countryCode + '/about/figure/occ_kingdom.png', encoding: null}),
        rp({method: 'GET', uri: ANALYTICS_COUNTRY_BASEURL + countryCode + '/publishedBy/figure/occ_kingdom.png', encoding: null}),
        dataProvider.getDownloadsByMonth(countryCode, year),
        dataProvider.getCountsForSelectedtaxonomicGroups(countryCode.toUpperCase()),
        rp({method: 'GET', uri: ANALYTICS_COUNTRY_BASEURL + countryCode + '/about/figure/spe_kingdom.png', encoding: null}),
        dataProvider.getMostRecentDatasets(countryCode),
        dataProvider.getMostRecentPublishers(countryCode),
        dataProvider.getTopDataContributors(countryCode),
        dataProvider.getTopDatasets(countryCode),
        dataProvider.getOccurrenceFacetsForCountry(countryCode),
        rp({method: 'GET', uri: ANALYTICS_COUNTRY_BASEURL + countryCode + '/publishedBy/figure/occ_repatriation.png', encoding: null}),
        dataProvider.getProjectsWithCountryAsPartner(countryCode),
        dataProvider.getPublishedOccRecords(year, countryCode),
        dataProvider.getAccessAndUsageData(year, countryCode),
        dataProvider.getRecordsPublishedByCountryDownloadedByMonth(countryCode, year)
    ];

    Promise.all(promises).then(function(res) {
        let i18n = require('./i18n')();
        i18n.setLocale(locale);
        let reportOptions = {year: year,
            globalPublicationsChart: new Buffer(res[0], 'base64'),
            countryPublications: res[1],
            countryOccurencesByKingdom: res[2],
            occByKingdomChartAbout: new Buffer(res[3], 'base64'),
            speciesByKingdomChartAbout: new Buffer(res[7], 'base64'),
            occByKingdomChartPublishedBy: new Buffer(res[4], 'base64'),
            downloadsByMonthChart: new Buffer(res[5], 'base64'),
            occRepatriation: new Buffer(res[13], 'base64'),
            accessAndUsageData: res[16],
            countryName: i18n.__('country.' + countryCode.toUpperCase()),
            publishedOccRecords: res[15],
            countsForSelectedtaxonomicGroups: res[6],
            mostRecentDatasets: res[8],
            mostRecentPublishers: res[9],
            topDataContributors: res[10],
            topDatasets: res[11],
            occurrenceFacets: res[12],
            projectsWithCountryAsPartner: res[14],
            recordsPublishedByCountryDownloadedByMonth: new Buffer(res[17], 'base64'),
            countryCode: countryCode,
            locale: locale,
            i18n: i18n,
            Y_OFFSET: Y_OFFSET
        };
            compileReport(countryCode, reportOptions, targetStream);
    }).catch(function(err) {
        console.log(err);
        throw err;
    });
}

/*
function getLocales() {
    return Object.keys(i18n.locales);
} */

module.exports = {
    runReport: runReport
};


