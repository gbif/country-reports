const _ = require('lodash');
const i18n = require('./i18n');

function header(doc, options) {
        doc.image(__dirname + '/assets/GBIF-2015-full.png', 40, 45 + options.Y_OFFSET, {width: 180});
        doc.image(__dirname + '/assets/green_bar.png', 30, 95 + options.Y_OFFSET, {height: 20, width: 540});


        doc.font('Helvetica').fontSize(26)
                .text(i18n.__('countryReport'), 320, 58 + options.Y_OFFSET);
        doc.image(__dirname + '/assets/flags/' + options.countryCode + '.png', 510, 55 + options.Y_OFFSET, {width: 30});
        // some vector graphics

        doc.fontSize(26)
                .text(options.countryName, 50, 145 + options.Y_OFFSET);
        doc.fontSize(9)
                .text(i18n.__('introduction'), 50, 175 + options.Y_OFFSET);

        doc.font('Helvetica-Oblique')
                .fontSize(9)
                .text(i18n.__('twelveMonthReport'), 400, 130 + options.Y_OFFSET, {width: 150, align: 'right'})
                .text(i18n.__('ending31december') + ' ' + options.year, {width: 150, align: 'right'});

        doc.moveTo(50, 240 + options.Y_OFFSET)
                .lineTo(550, 240 + options.Y_OFFSET)
                .lineWidth(2)
                .strokeColor('#509e2f').
                stroke();
}

function accessAndUsage(doc, options) {
        doc.font('Helvetica-Bold').fontSize(12)
                .text('> ' + i18n.__('accessAndUsage'), 50, 248 + options.Y_OFFSET);


        doc.image(options.globalPublicationsChart, 70, 260 + options.Y_OFFSET, {width: 220});
        doc.font('Helvetica-Oblique')
                .fontSize(8)
                .text(i18n.__('figure') + ' 1. ' + i18n.__('numPeerReviedPublicationsCitingGBIF'), 83, 410 + options.Y_OFFSET, {continued: true, width: 200, align: 'center'});

        doc.image(__dirname + '/assets/green_circle.png', 330, 250 + options.Y_OFFSET, {width: 180});

        doc.font('Helvetica').fontSize(10)
                .text(i18n.__('researchersFrom'), 260, 280 + options.Y_OFFSET, {width: 180, align: 'center'});
        doc.font('Helvetica-Bold').fontSize(15)
                .text(options.countryName, 330, 300 + options.Y_OFFSET, {width: 180, align: 'center'});
        doc.font('Helvetica').fontSize(8)
                .text(i18n.__('contributedTo'), 330, 320 + options.Y_OFFSET, {width: 180, align: 'center'});
        doc.font('Helvetica-Bold').fontSize(15).fillColor('white')
                .text(options.countryPublications.reportYear, 330, 337 + options.Y_OFFSET, {width: 180, align: 'center'});
        doc.font('Helvetica').fontSize(8).fillColor('black')
                .text(i18n.__('peerReviewedInReportingPeroid'), 340, 355 + options.Y_OFFSET, {width: 160, align: 'center'});
        doc.font('Helvetica-Bold').fontSize(15).fillColor('white')
                .text(options.countryPublications.allYears, 330, 385 + options.Y_OFFSET, {width: 180, align: 'center'});
        doc.font('Helvetica').fontSize(8).fillColor('black')
                .text(i18n.__('articlesSince'), 330, 405 + options.Y_OFFSET, {width: 180, align: 'center'});

        doc.moveTo(50, 440 + options.Y_OFFSET)
                .lineTo(550, 440 + options.Y_OFFSET)
                .lineWidth(2)
                .strokeColor('#509e2f').
                stroke();
}

function datAvailability(doc, options) {
        doc.font('Helvetica-Bold').fontSize(12)
                .text('> ' + i18n.__('dataAvailability') + ' ' + i18n.__('in') + ' ' + options.countryName, 50, 450 + options.Y_OFFSET);

        doc.image(__dirname + '/assets/kingdoms/animalia.png', 55, 470 + options.Y_OFFSET, {width: 50});
        doc.image(__dirname + '/assets/kingdoms/plantae.png', 180, 470 + options.Y_OFFSET, {width: 50});
        doc.image(__dirname + '/assets/kingdoms/fungi.png', 305, 470 + options.Y_OFFSET, {width: 50});
        doc.image(__dirname + '/assets/kingdoms/unknown.png', 430, 470 + options.Y_OFFSET, {width: 50});

        doc.image(__dirname + '/assets/kingdoms/protozoa.png', 50, 545 + options.Y_OFFSET, {width: 40});
        doc.image(__dirname + '/assets/kingdoms/bacteria.png', 150, 545 + options.Y_OFFSET, {width: 40});
        doc.image(__dirname + '/assets/kingdoms/virus.png', 250, 545 + options.Y_OFFSET, {width: 40});
        doc.image(__dirname + '/assets/kingdoms/chromista.png', 350, 545 + options.Y_OFFSET, {width: 40});
        doc.image(__dirname + '/assets/kingdoms/archaea.png', 450, 545 + options.Y_OFFSET, {width: 40});

        // First row of kingdoms
        doc.font('Helvetica-Oblique')
                .fontSize(10)
                .text('Animalia', 120, 485 + options.Y_OFFSET);
        doc.font('Helvetica-Bold')
                .fontSize(10)
                .text(options.countryOccurencesByKingdom.Animalia.toLocaleString(options.locale), 120, 500 + options.Y_OFFSET);
        doc.font('Helvetica')
                .fontSize(8)
                .text(i18n.__('occurrences'), 120, 513 + options.Y_OFFSET);
        doc.font('Helvetica-Oblique')
                .fontSize(10)
                .text('Plantae', 245, 485 + options.Y_OFFSET);
        doc.font('Helvetica-Bold')
                .fontSize(10)
                .text(options.countryOccurencesByKingdom.Plantae.toLocaleString(options.locale), 245, 500 + options.Y_OFFSET);
        doc.font('Helvetica')
                .fontSize(8)
                .text(i18n.__('occurrences'), 245, 513 + options.Y_OFFSET);
        doc.font('Helvetica-Oblique')
                .fontSize(10)
                .text('Fungi', 370, 485 + options.Y_OFFSET);
        doc.font('Helvetica-Bold')
                .fontSize(10)
                .text(options.countryOccurencesByKingdom.Fungi.toLocaleString(options.locale), 370, 500 + options.Y_OFFSET);
        doc.font('Helvetica')
                .fontSize(8)
                .text(i18n.__('occurrences'), 370, 513 + options.Y_OFFSET);
        doc.font('Helvetica-Oblique')
                .fontSize(10)
                .text('Unknown', 495, 485 + options.Y_OFFSET);
        doc.font('Helvetica-Bold')
                .fontSize(10)
                .text(options.countryOccurencesByKingdom.Unknown.toLocaleString(options.locale), 495, 500 + options.Y_OFFSET);
        doc.font('Helvetica')
                .fontSize(8)
                .text(i18n.__('occurrences'), 495, 513 + options.Y_OFFSET);
        // Second row of kingdoms

        doc.font('Helvetica-Oblique')
                .fontSize(8)
                .text('Protozoa', 100, 550 + options.Y_OFFSET);
        doc.font('Helvetica-Bold')
                .fontSize(10)
                .text(options.countryOccurencesByKingdom.Protozoa.toLocaleString(options.locale), 100, 563 + options.Y_OFFSET);
        doc.font('Helvetica')
                .fontSize(8)
                .text(i18n.__('occurrences'), 100, 576 + options.Y_OFFSET);
        doc.font('Helvetica-Oblique')
                .fontSize(8)
                .text('Bacteria', 200, 550 + options.Y_OFFSET);
        doc.font('Helvetica-Bold')
                .fontSize(10)
                .text(options.countryOccurencesByKingdom.Bacteria.toLocaleString(options.locale), 200, 563 + options.Y_OFFSET);
        doc.font('Helvetica')
                .fontSize(8)
                .text(i18n.__('occurrences'), 200, 576 + options.Y_OFFSET);
        doc.font('Helvetica-Oblique')
                .fontSize(8)
                .text('Virus', 300, 550 + options.Y_OFFSET);
        doc.font('Helvetica-Bold')
                .fontSize(10)
                .text(options.countryOccurencesByKingdom.Bacteria.toLocaleString(options.locale), 300, 563 + options.Y_OFFSET);
        doc.font('Helvetica')
                .fontSize(8)
                .text(i18n.__('occurrences'), 300, 576 + options.Y_OFFSET);
        doc.font('Helvetica-Oblique')
                .fontSize(8)
                .text('Chromista', 400, 550 + options.Y_OFFSET);
        doc.font('Helvetica-Bold')
                .fontSize(10)
                .text(options.countryOccurencesByKingdom.Chromista.toLocaleString(options.locale), 400, 563 + options.Y_OFFSET);
        doc.font('Helvetica')
                .fontSize(8)
                .text(i18n.__('occurrences'), 400, 576 + options.Y_OFFSET);
        doc.font('Helvetica-Oblique')
                .fontSize(8)
                .text('Archaea', 500, 550 + options.Y_OFFSET);
        doc.font('Helvetica-Bold')
                .fontSize(10)
                .text(options.countryOccurencesByKingdom.Archaea.toLocaleString(options.locale), 500, 563 + options.Y_OFFSET);
        doc.font('Helvetica')
                .fontSize(8)
                .text(i18n.__('occurrences'), 500, 576 + options.Y_OFFSET);

        doc.moveTo(50, 598 + options.Y_OFFSET)
                .lineTo(550, 598 + options.Y_OFFSET)
                .lineWidth(2)
                .strokeColor('#509e2f').
                stroke();
}

function dataMobilization(doc, options) {
        doc.font('Helvetica-Bold').fontSize(12)
                .text('> ' + i18n.__('dataMobilization'), 50, 607 + options.Y_OFFSET);

        doc.image(__dirname + '/assets/green_circle.png', 70, 620 + options.Y_OFFSET, {width: 180});
        doc.fillColor('black').font('Helvetica').fontSize(10)
                .text(i18n.__('institutionsFrom'), 70, 645 + options.Y_OFFSET, {width: 180, align: 'center'});

        doc.font('Helvetica-Bold').fontSize(15)
                .text(options.countryName, 70, 665 + options.Y_OFFSET, {width: 180, align: 'center'});
        doc.font('Helvetica').fontSize(8)
                .text(i18n.__('published'), 70, 685 + options.Y_OFFSET, {width: 180, align: 'center'});

        doc.font('Helvetica-Bold').fontSize(15).fillColor('white')
                .text(options.publishedOccRecords.countryOccRecords.toLocaleString(options.locale), 70, 702 + options.Y_OFFSET, {width: 180, align: 'center'});

        doc.font('Helvetica').fontSize(8).fillColor('black')
                .text(i18n.__('newOccRecordsTotalOf'), 83, 725 + options.Y_OFFSET, {width: 150, align: 'center'});
        doc.font('Helvetica-Bold').fontSize(15).fillColor('white')
                .text(
                        options.publishedOccRecords.globalOccRecords.toLocaleString(options.locale),
                        70, 750 + options.Y_OFFSET, {width: 180, align: 'center'});
        doc.font('Helvetica').fontSize(8).fillColor('black')
                .text(i18n.__('occurrenceRecords'), 100, 768 + options.Y_OFFSET, {width: 120, align: 'center'});

        doc.image(options.occByKingdomChartPublishedBy, 270, 625 + options.Y_OFFSET, {width: 260, height: 150});
        doc.font('Helvetica-Oblique')
                .fontSize(8)
                .text(
                        i18n.__('figure') + ' 2. ' + i18n.__('numRecordsByInstitutionsInCountry') + ' ' + options.countryName + ', '
                        + i18n.__('categorizedByKingdom'), 310, 780 + options.Y_OFFSET, {width: '200', align: 'center'});
}

function secondaryPageHeader(doc, options, pageNumber, totalPages) {
        doc.image(__dirname + '/assets/flags/' + options.countryCode + '.png', 50, 50 + options.Y_OFFSET, {width: 30});
        doc.image(__dirname + '/assets/green_bar.png', 110, 52 + options.Y_OFFSET, {height: 20, width: 440});
        doc.text(pageNumber + ' | ' + totalPages, 530, 82 + options.Y_OFFSET);
        doc.moveTo(50, 100 + options.Y_OFFSET)
                .lineTo(550, 100 + options.Y_OFFSET)
                .lineWidth(2)
                .strokeColor('#509e2f').
                stroke();
}

function dataDownloads(doc, options) {
        doc.font('Helvetica-Bold').fontSize(12)
                .text(i18n.__('accessAndUsage'), 50, 115 + options.Y_OFFSET)
                .fillColor('#509e2f').text(i18n.__('dataDownloadsFromUsersIn') + ' ' + options.countryName, 50, 135 + options.Y_OFFSET);

        doc.image(__dirname + '/assets/green_circle.png', 70, 170 + options.Y_OFFSET, {width: 180});
        doc.fillColor('black').font('Helvetica').fontSize(10)
                .text(i18n.__('usersFrom'), 70, 195 + options.Y_OFFSET, {width: 180, align: 'center'});

        doc.font('Helvetica-Bold').fontSize(15)
                .text(options.countryName, 70, 215 + options.Y_OFFSET, {width: 180, align: 'center'});
        doc.font('Helvetica').fontSize(8)
                .text(i18n.__('made'), 70, 235 + options.Y_OFFSET, {width: 180, align: 'center'});

        doc.font('Helvetica-Bold').fontSize(15).fillColor('white')
                .text(options.accessAndUsageData.countryDownloads, 70, 252 + options.Y_OFFSET, {width: 180, align: 'center'});

        doc.font('Helvetica').fontSize(8).fillColor('black')
                .text(i18n.__('dowloadRequestsRepresenting'), 70, 275 + options.Y_OFFSET, {width: 170, align: 'center'});
        doc.font('Helvetica-Bold').fontSize(15).fillColor('white')
                .text(
                        (options.accessAndUsageData.countryDownloads / options.accessAndUsageData.totalDownloads * 100).toFixed(1) + '%',
                        70, 290 + options.Y_OFFSET, {width: 180, align: 'center'});
        doc.font('Helvetica').fontSize(8).fillColor('black')
                .text(i18n.__('ofAllDownloads'), 100, 310 + options.Y_OFFSET, {width: 120, align: 'center'});

        doc.image(options.occDownloadsByMonthChart, 300, 190 + options.Y_OFFSET, {width: 250, height: 150});
        doc.font('Helvetica-Oblique')
                .fontSize(8)
                .text(i18n.__('figure') + ' 4. ' + i18n.__('numOccDownloadsByOrgsIn') + ' ' + options.countryName, 300, 340 + options.Y_OFFSET, {width: 250, align: 'center'});

        doc.moveTo(50, 390 + options.Y_OFFSET)
                .lineTo(550, 390 + options.Y_OFFSET)
                .lineWidth(2)
                .strokeColor('#509e2f').
                stroke();
}

function recentPeerReviewed(doc, options) {
        if (options.countryPublications.latest.length > 0) {
                doc.font('Helvetica-Bold').fillColor('#509e2f').fontSize(12);
                doc.text(i18n.__('recentPeerReviewedArticles') + ' ' + options.countryName, 50, 400, {continued: false, width: 400, align: 'left'});


                doc.rect(50, 435, 500, 70)
                        .fill('#D3D3D3');
                doc.fillColor('black').font('Helvetica').fontSize(8).text(
                        i18n.__('theGBIFSecretariatMaintansAndReports'),
                        60, 445, {width: 490});
                doc.moveDown();
                doc.text(i18n.__('thoseInterestedInAssisting') + ' ', {width: 490, continued: true}).fillColor('blue').text('comms@gbif.org.');

                doc.font('Helvetica').fontSize(10);
                let publications = options.countryPublications.latest.map(function(p) {
                        let authors = (p.authors.length > 3) ?
                                p.authors.slice(0, 3).map(function(a) {
return a.lastName;
}).join(', ') + ' et al.' :
                                p.authors.map(function(a) {
a.lastName;
}).join(', ') + '.';
                        let result = {txt: authors + ' [' + p.year + '] ' + p.title + '.'};
                        if (p.identifiers && p.identifiers.doi) {
                                result.doi = 'http://dx.doi.org/' + p.identifiers.doi;
                        }
                        return result;
                });
                doc.fillColor('black').text(publications[0].txt, 55, 520, {indent: -5, width: 450}).fillColor('blue').text(publications[0].doi).moveDown();
                let textBoxY;
                for (let i = 1; i < publications.length; i++) {
                        let w = (i < publications.length - 1) ? 450 : 330;
                        if (i === publications.length - 1) {
                                textBoxY = doc.y;
                        }
                        doc.fillColor('black').text(publications[i].txt, {indent: -5, width: w}).fillColor('blue').text(publications[i].doi);
                        if (i < publications.length - 1) {
                                doc.moveDown();
                        }
                }
                doc.rect(390, textBoxY, 160, 40).fill('#F0FFFF');
                doc.rect(390, textBoxY, 160, 40).stroke();

                doc.fillColor('black').font('Helvetica-Oblique')
                        .fontSize(8).text(
                                i18n.__('seeAllResearchFromThisCountry'), 360, textBoxY + 5, {align: 'right', width: 185})
                                .fillColor('blue').text('http://www.gbif.org/country/' + options.countryCode + '/publications', {align: 'right', width: 185});
        }
}

function selectedTaxonomicGroups(doc, options) {
        doc.font('Helvetica-Bold').fontSize(12)
                .text(i18n.__('dataAvailability'), 50, 115 + options.Y_OFFSET)
                .fillColor('#509e2f').text(i18n.__('totalDataAvailableSelectedGroups') + ' ' + options.countryName, 50, 135 + options.Y_OFFSET);

        // First row of images
        doc.image(__dirname + '/assets/selectedGroups/mammals.png', 55, 170 + options.Y_OFFSET, {width: 50});
        doc.image(__dirname + '/assets/selectedGroups/birds.png', 180, 170 + options.Y_OFFSET, {width: 50});
        doc.image(__dirname + '/assets/selectedGroups/bonyFish.png', 305, 170 + options.Y_OFFSET, {width: 50});
        doc.image(__dirname + '/assets/selectedGroups/amphibians.png', 430, 170 + options.Y_OFFSET, {width: 50});

        // first row of text
        doc.fillColor('black').font('Helvetica-Oblique')
                .fontSize(10)
                .text(i18n.__('mammals'), 115, 180 + options.Y_OFFSET, {width: 60});
        doc.font('Helvetica-Bold')
                .fontSize(10)
                .text(options.countsForSelectedtaxonomicGroups.mammals.toLocaleString(options.locale));
        doc.font('Helvetica')
                .fontSize(8)
                .text(i18n.__(i18n.__('occurrences')));

        doc.fillColor('black').font('Helvetica-Oblique')
                .fontSize(10)
                .text(i18n.__('birds'), 240, 180 + options.Y_OFFSET, {width: 60});
        doc.font('Helvetica-Bold')
                .fontSize(10)
                .text(options.countsForSelectedtaxonomicGroups.birds.toLocaleString(options.locale));
        doc.font('Helvetica')
                .fontSize(8)
                .text(i18n.__(i18n.__('occurrences')));

        doc.fillColor('black').font('Helvetica-Oblique')
                .fontSize(10)
                .text(i18n.__('bonyFish'), 365, 180 + options.Y_OFFSET, {width: 60});
        doc.font('Helvetica-Bold')
                .fontSize(10)
                .text(options.countsForSelectedtaxonomicGroups.bonyfish.toLocaleString(options.locale));
        doc.font('Helvetica')
                .fontSize(8)
                .text(i18n.__(i18n.__('occurrences')));

        doc.fillColor('black').font('Helvetica-Oblique')
                .fontSize(10)
                .text(i18n.__('amphibians'), 490, 180 + options.Y_OFFSET, {width: 60});
        doc.font('Helvetica-Bold')
                .fontSize(10)
                .text(options.countsForSelectedtaxonomicGroups.amphibians.toLocaleString(options.locale));
        doc.font('Helvetica')
                .fontSize(8)
                .text(i18n.__(i18n.__('occurrences')));

        // second row of images
        doc.image(__dirname + '/assets/selectedGroups/insects.png', 117, 245 + options.Y_OFFSET, {width: 50});
        doc.image(__dirname + '/assets/selectedGroups/reptiles.png', 245, 245 + options.Y_OFFSET, {width: 50});
        doc.image(__dirname + '/assets/selectedGroups/molluscs.png', 365, 245 + options.Y_OFFSET, {width: 50});

        // second row of texts
        doc.fillColor('black').font('Helvetica-Oblique')
                .fontSize(10)
                .text(i18n.__('insects'), 177, 255 + options.Y_OFFSET, {width: 60});
        doc.font('Helvetica-Bold')
                .fontSize(10)
                .text(options.countsForSelectedtaxonomicGroups.insects.toLocaleString(options.locale));
        doc.font('Helvetica')
                .fontSize(8)
                .text(i18n.__(i18n.__('occurrences')));
        doc.fillColor('black').font('Helvetica-Oblique')
                .fontSize(10)
                .text(i18n.__('reptiles'), 302, 255 + options.Y_OFFSET, {width: 60});
        doc.font('Helvetica-Bold')
                .fontSize(10)
                .text(options.countsForSelectedtaxonomicGroups.reptiles.toLocaleString(options.locale));
        doc.font('Helvetica')
                .fontSize(8)
                .text(i18n.__(i18n.__('occurrences')));
        doc.fillColor('black').font('Helvetica-Oblique')
                .fontSize(10)
                .text(i18n.__('molluscs'), 427, 255 + options.Y_OFFSET, {width: 80});
        doc.font('Helvetica-Bold')
                .fontSize(10)
                .text(options.countsForSelectedtaxonomicGroups.molluscs.toLocaleString(options.locale));
        doc.font('Helvetica')
                .fontSize(8)
                .text(i18n.__(i18n.__('occurrences')));

        // third row of images
        doc.image(__dirname + '/assets/selectedGroups/arachnids.png', 55, 320 + options.Y_OFFSET, {width: 50});
        doc.image(__dirname + '/assets/selectedGroups/floweringPlants.png', 180, 320 + options.Y_OFFSET, {width: 50});
        doc.image(__dirname + '/assets/selectedGroups/gymnosperms.png', 305, 320 + options.Y_OFFSET, {width: 50});
        doc.image(__dirname + '/assets/selectedGroups/ferns.png', 430, 320 + options.Y_OFFSET, {width: 50});
        // third roww of texts
        doc.fillColor('black').font('Helvetica-Oblique')
                .fontSize(10)
                .text(i18n.__('arachnids'), 115, 330 + options.Y_OFFSET, {width: 60});
        doc.font('Helvetica-Bold')
                .fontSize(10)
                .text(options.countsForSelectedtaxonomicGroups.arachnids.toLocaleString(options.locale));
        doc.font('Helvetica')
                .fontSize(8)
                .text(i18n.__(i18n.__('occurrences')));

        doc.fillColor('black').font('Helvetica-Oblique')
                .fontSize(10)
                .text(i18n.__('floweringPlants'), 240, 330 + options.Y_OFFSET, {width: 60});
        doc.font('Helvetica-Bold')
                .fontSize(10)
                .text(options.countsForSelectedtaxonomicGroups.floweringplants.toLocaleString(options.locale));
        doc.font('Helvetica')
                .fontSize(8)
                .text(i18n.__(i18n.__('occurrences')));

        doc.fillColor('black').font('Helvetica-Oblique')
                .fontSize(10)
                .text(i18n.__('gymnosperms'), 365, 330 + options.Y_OFFSET, {width: 60});
        doc.font('Helvetica-Bold')
                .fontSize(10)
                .text(options.countsForSelectedtaxonomicGroups.gymnosperms.toLocaleString(options.locale));
        doc.font('Helvetica')
                .fontSize(8)
                .text(i18n.__(i18n.__('occurrences')));

        doc.fillColor('black').font('Helvetica-Oblique')
                .fontSize(10)
                .text(i18n.__('ferns'), 490, 330 + options.Y_OFFSET, {width: 60});
        doc.font('Helvetica-Bold')
                .fontSize(10)
                .text(options.countsForSelectedtaxonomicGroups.ferns.toLocaleString(options.locale));
        doc.font('Helvetica')
                .fontSize(8)
                .text(i18n.__(i18n.__('occurrences')));

        // fourth row of images
        doc.image(__dirname + '/assets/selectedGroups/mosses.png', 117, 395 + options.Y_OFFSET, {width: 50});
        doc.image(__dirname + '/assets/selectedGroups/sacFungi.png', 245, 395 + options.Y_OFFSET, {width: 50});
        doc.image(__dirname + '/assets/selectedGroups/basidiomycota.png', 365, 395 + options.Y_OFFSET, {width: 50});
        // fourth row of texts
        doc.fillColor('black').font('Helvetica-Oblique')
                .fontSize(10)
                .text(i18n.__('mosses'), 177, 405 + options.Y_OFFSET, {width: 60});
        doc.font('Helvetica-Bold')
                .fontSize(10)
                .text(options.countsForSelectedtaxonomicGroups.mosses.toLocaleString(options.locale));
        doc.font('Helvetica')
                .fontSize(8)
                .text(i18n.__(i18n.__('occurrences')));
        doc.fillColor('black').font('Helvetica-Oblique')
                .fontSize(10)
                .text(i18n.__('sacFungi'), 302, 405 + options.Y_OFFSET, {width: 60});
        doc.font('Helvetica-Bold')
                .fontSize(10)
                .text(options.countsForSelectedtaxonomicGroups.sacfungi.toLocaleString(options.locale));
        doc.font('Helvetica')
                .fontSize(8)
                .text(i18n.__(i18n.__('occurrences')));
        doc.fillColor('black').font('Helvetica-Oblique')
                .fontSize(10)
                .text(i18n.__('basidiomycota'), 427, 405 + options.Y_OFFSET, {width: 80});
        doc.font('Helvetica-Bold')
                .fontSize(10)
                .text(options.countsForSelectedtaxonomicGroups.basidiomycota.toLocaleString(options.locale));
        doc.font('Helvetica')
                .fontSize(8)
                .text(i18n.__(i18n.__('occurrences')));

        doc.rect(50, 460 + options.Y_OFFSET, 500, 65)
                .fill('#D3D3D3');

        doc.font('Helvetica')
                .fillColor('black')
                .fontSize(8)
                .text(i18n.__('mammals') + ' = ' + i18n.__('taxonRank.class') + ' Animalia', 55, 465 + options.Y_OFFSET, {width: 120});
        doc.text(i18n.__('birds') + ' = ' + i18n.__('taxonRank.class') + ' Aves', {width: 120});
        doc.text(i18n.__('bonyFish') + ' = ' + i18n.__('taxonRank.superclass') + ' Osteichthyes', {width: 120});
        doc.text(i18n.__('amphibians') + ' = ' + i18n.__('taxonRank.class') + ' Amphibia', {width: 120});

        doc.font('Helvetica')
                .fillColor('black')
                .fontSize(8)
                .text(i18n.__('insects') + ' = ' + i18n.__('taxonRank.class') + ' Insecta', 175, 465 + options.Y_OFFSET, {width: 120});
        doc.text(i18n.__('reptiles') + ' = ' + i18n.__('taxonRank.class') + ' Reptilia', {width: 120});
        doc.text(i18n.__('molluscs') + ' = ' + i18n.__('taxonRank.phylum') + ' Mollusca', {width: 120});
        doc.text(i18n.__('arachnids') + ' = ' + i18n.__('taxonRank.class') + ' Arachnida', {width: 120});

        doc.font('Helvetica')
                .fillColor('black')
                .fontSize(8)
                .text(i18n.__('floweringPlants') + ' = ' + i18n.__('taxonRank.phylum') + ' Magnoliophyta', 300, 465 + options.Y_OFFSET, {width: 120});
        doc.text(i18n.__('gymnosperms') + ' = ' + i18n.__('taxonRank.superclass') + ' Gymnospermae', {width: 120});

        doc.font('Helvetica')
                .fillColor('black')
                .fontSize(8)
                .text(i18n.__('ferns') + ' = ' + i18n.__('taxonRank.phylum') + ' Pteridophyta', 425, 465 + options.Y_OFFSET, {width: 120});
        doc.text(i18n.__('mosses') + ' = ' + i18n.__('taxonRank.phylum') + ' Bryophyta', {width: 120});
        doc.text(i18n.__('sacFungi') + ' = ' + i18n.__('taxonRank.phylum') + ' Ascomycota', {width: 120});
        doc.text(i18n.__('basidiomycota') + ' = ' + i18n.__('taxonRank.phylum') + ' Basidiomycota', {width: 120});

        doc.moveTo(50, 540 + options.Y_OFFSET)
                .lineTo(550, 540 + options.Y_OFFSET)
                .lineWidth(2)
                .strokeColor('#509e2f').
                stroke();
}

function getChangeOverTime(doc, options) {
        doc.font('Helvetica-Bold').fontSize(12)
                .fillColor('#509e2f').text(i18n.__('changeOverTimeInRecords') + ' ' + options.countryName, 50, 555 + options.Y_OFFSET);

        doc.image(options.occByKingdomChartAbout, 50, 575, {width: 250, height: 130});
        doc.fillColor('black').font('Helvetica-Oblique')
                .fontSize(8)
                .text(i18n.__('figure') + ' 5. ' + i18n.__('occRecordsAvailableFigText') + ' ' + options.countryName, 83, 713 + options.Y_OFFSET, {width: 200, align: 'center'});

        doc.image(options.speciesByKingdomChartAbout, 300, 575, {width: 250, height: 130});

        doc.fillColor('black').font('Helvetica-Oblique')
                .fontSize(8)
                .text(i18n.__('figure') + ' 6. ' + i18n.__('speciesAvailableOccRecords') + ' ' + options.countryName, 333, 713 + options.Y_OFFSET, {width: 200, align: 'center'});


        doc.rect(50, 740 + options.Y_OFFSET, 250, 65)
                .fill('#D3D3D3');
        doc.font('Helvetica-Bold')
                .fillColor('black')
                .fontSize(9)
                .text(i18n.__('whyDecrease'), 55, 745 + options.Y_OFFSET, {width: 245, align: 'left'});
        doc.font('Helvetica').fontSize(8).text(i18n.__('whyDecreaseAnswer'), {width: 245});

        doc.rect(310, 740 + options.Y_OFFSET, 250, 65)
                .fill('#D3D3D3');
        doc.font('Helvetica-Bold')
                .fillColor('black')
                .fontSize(9)
                .text(i18n.__('speciesCounts'), 315, 745 + options.Y_OFFSET, {width: 245, continued: true})
                .font('Helvetica').fontSize(8).text(' ' + i18n.__('speciesCountInfo') + ' Catalogue of Life', {width: 245});
}

function recentDatasets(doc, options) {
        if (options.mostRecentDatasets.length > 0) {
                doc.font('Helvetica-Bold').fillColor('#509e2f').fontSize(12);
                doc.text(i18n.__('mostRecentDatsetsFrom') + ' ' + options.countryName, 50, 115, {continued: false, width: 400, align: 'left'});


                doc.font('Helvetica').fontSize(10);
                let datasets = options.mostRecentDatasets.map(function(p) {
                        return {txt: p.title + '. ' + i18n.__('publishedBy') + ' ' + p._organisationTitle, doi: 'http://dx.doi.org/' + p.doi};
                });
                doc.fillColor('black').text(datasets[0].txt, 55, 135, {indent: -5, width: 450}).fillColor('blue').text(datasets[0].doi).moveDown();
                let textBoxY;
                for (let i = 1; i < datasets.length; i++) {
                        let w = (i < datasets.length - 1) ? 450 : 330;
                        if (i === datasets.length - 1) {
                                textBoxY = doc.y;
                        }
                        doc.fillColor('black').text(datasets[i].txt, {indent: -5, width: w}).fillColor('blue').text(datasets[i].doi);
                        if (i < datasets.length - 1) {
                                doc.moveDown();
                        }
                }
                doc.rect(390, textBoxY, 160, 40).fill('#F0FFFF');
                doc.rect(390, textBoxY, 160, 40).stroke();

                doc.fillColor('black').font('Helvetica-Oblique')
                        .fontSize(8).text(
                                i18n.__('seeAllDatsetsFromThisCountry'), 360, textBoxY + 5, {align: 'right', width: 185})
                                .fillColor('blue').text('http://www.gbif.org/dataset/search?publishingCountry=' + options.countryCode + '/publications', {align: 'right', width: 185});

                let y = doc.y + 20;
                doc.moveTo(50, y)
                        .lineTo(550, y)
                        .lineWidth(2)
                        .strokeColor('#509e2f').
                        stroke();
        }
}

function recentPublishers(doc, options) {
        if (options.mostRecentPublishers.length > 0) {
                doc.font('Helvetica-Bold').fillColor('#509e2f').fontSize(12);
                doc.text(i18n.__('mostRecentPublishersFrom') + ' ' + options.countryName, 50, doc.y + 40, {continued: false, width: 400, align: 'left'});


                doc.font('Helvetica').fontSize(10);
                let publishers = options.mostRecentPublishers.map(function(p) {
                        return {txt: p.title};
                });
                doc.fillColor('black').text(publishers[0].txt, 55, doc.y + 20, {indent: -5, width: 450}).moveDown();
                let textBoxY;
                for (let i = 1; i < publishers.length; i++) {
                        let w = (i < publishers.length - 1) ? 450 : 330;
                        if (i === publishers.length - 1) {
                                textBoxY = doc.y;
                        }
                        doc.fillColor('black').text(publishers[i].txt, {indent: -5, width: w});
                        if (i < publishers.length - 1) {
                                doc.moveDown();
                        }
                }
                doc.rect(390, textBoxY, 160, 40).fill('#F0FFFF');
                doc.rect(390, textBoxY, 160, 40).stroke();

                doc.fillColor('black').font('Helvetica-Oblique')
                        .fontSize(8).text(
                                i18n.__('seeAllPublishersFromThisCountry'), 360, textBoxY + 5, {align: 'right', width: 185})
                                .fillColor('blue').text('http://www.gbif.org/country/' + options.countryCode + '/publishers', {align: 'right', width: 185});
        }
}

function dataSharingWithCountryOfOrigin(doc, options) {
        doc.font('Helvetica-Bold').fillColor('black').fontSize(12).text(i18n.__('dataMobilization'), 50, 115);
        doc.font('Helvetica-Bold').fillColor('#509e2f').fontSize(12);
        doc.text(i18n.__('dataSharingWithCountryOfOrigin') + ' ' + options.countryName, {continued: false, width: 400, align: 'left'});
       let circleY = doc.y + 10;
        doc.image(__dirname + '/assets/green_circle.png', 330, circleY + options.Y_OFFSET, {width: 180});

doc.font('Helvetica-Bold').fontSize(15).fillColor('black')
        .text(options.countryName, 330, circleY + 30, {width: 180, align: 'center'});
doc.font('Helvetica').fontSize(8)
        .text(i18n.__('publishesDataFrom'), 330, circleY + 55, {width: 180, align: 'center'});
doc.font('Helvetica-Bold').fontSize(15).fillColor('white')
        .text(options.occurrenceFacets.COUNTRY.toLocaleString(options.locale), 330, circleY + 65, {width: 180, align: 'center'});
doc.font('Helvetica').fontSize(8).fillColor('black')
        .text(i18n.__('countriesTerritoriesAndislands'), 340, circleY + 80, {width: 160, align: 'center'});
doc.font('Helvetica').fontSize(8).fillColor('black')
        .text(i18n.__('including'), {width: 160, align: 'center'});
doc.font('Helvetica-Bold').fontSize(15).fillColor('white')
        .text(options.occurrenceFacets.count.toLocaleString(options.locale), 330, circleY + 100, {width: 180, align: 'center'});
doc.font('Helvetica').fontSize(8).fillColor('black')
        .text(i18n.__('occurrences') + ' ' + i18n.__('in'), 330, circleY + 115, {width: 180, align: 'center'});
doc.font('Helvetica-Bold').fontSize(15).fillColor('white')
        .text(options.occurrenceFacets.DATASET_KEY.toLocaleString(options.locale), 330, circleY + 130, {width: 180, align: 'center'});
 doc.font('Helvetica').fontSize(8).fillColor('black')
        .text(i18n.__('occurrenceDatasets'), 330, circleY + 145, {width: 180, align: 'center'});

doc.image(options.occRepatriation, 50, circleY, {width: 270, height: 140});
doc.font('Helvetica-Oblique')
.fontSize(8)
.text(i18n.__('figure') + ' 6. ' + i18n.__('dataSharingWithCountryOfOriginFigureText'), 85, doc.y + 5, {width: '200', align: 'center'});


        doc.rect(50, 340, 500, 40)
                .fill('#D3D3D3');
        doc.fillColor('black').font('Helvetica').fontSize(8).text(
                i18n.__('numRecordsSharedOverTime'),
                60, 350, {width: 490});

        let y = doc.y + 30;
        doc.moveTo(50, y)
                .lineTo(550, y)
                .lineWidth(2)
                .strokeColor('#509e2f').
                stroke();
}

function topDataContributors(doc, options) {
        let headlineY = doc.y + 45;
        doc.font('Helvetica-Bold').fillColor('#509e2f').fontSize(12);
        doc.text(i18n.__('topDataContributorsAbout') + ' ' + options.countryName, 50, headlineY, {width: 245});

        doc.fontSize(9).fillColor('black').lineWidth(1)
                .font('Helvetica')
                .strokeColor('black');
        let table1 = {
                headers: [i18n.__('rank'), i18n.__('country_'), i18n.__('noOccs')],
                rows: _.map(options.topDataContributors, function(c) {
                        return [options.topDataContributors.indexOf(c) + 1, i18n.__('country.' + c.name), c.count.toLocaleString(options.locale)];
                })
        };
        let bodyY = doc.y + 5;
        doc.moveDown().table(table1, 50, bodyY, {width: 245});
// rankingOfCountriesContributing

doc.font('Helvetica-Oblique')
.fontSize(8)
.text(i18n.__('table') + ' 1. ' + i18n.__('rankingOfCountriesContributing') + ' ' + options.countryName, 75, doc.y + 5, {width: '200', align: 'center'});
        let column1bottomY = doc.y;
        // Second column
        doc.font('Helvetica-Bold').fillColor('#509e2f').fontSize(12);
        doc.text(i18n.__('topDataetsContributing') + ' ' + options.countryName, 305, headlineY, {width: 250});

        let datasets = options.topDatasets.map(function(p) {
                return {
                        txt: p.title + '. ' + p._count.toLocaleString(options.locale) + ' ' + i18n.__('occurrences') + ' '
                             + i18n.__('in') + ' ' + options.countryName + '. (' + i18n.__('lastUpdated') + ' ' + p.machineTags[0].created.split('T')[0] + ') ',
                        doi: 'http://dx.doi.org/' + p.doi
                };
        });
        doc.font('Helvetica').fontSize(10);
        doc.font('Helvetica').fontSize(10).fillColor('black').text(datasets[0].txt, 310, bodyY + 20, {indent: -5, width: 250}).moveDown();
        for (let i = 1; i < datasets.length; i++) {
                doc.fillColor('black').text(datasets[i].txt, {indent: -5, width: 250});
                if (i < datasets.length - 1) {
                        doc.moveDown();
                }
        }
        let column2bottomY = doc.y;
        let textBoxY = Math.max(column1bottomY, column2bottomY) + 5;


        doc.rect(50, textBoxY, 245, 40).fill('#F0FFFF');
        doc.rect(50, textBoxY, 245, 40).strokeColor('#509e2f').stroke();

        doc.fillColor('black').font('Helvetica-Oblique')
                .fontSize(8).text(
                        i18n.__('seeAllContributingCountries'), 50, textBoxY + 5, {align: 'right', width: 240})
                        .fillColor('blue').text('http://www.gbif.org/country/' + options.countryCode + '/about/countries', {align: 'right', width: 240});

        doc.rect(305, textBoxY, 245, 40).fill('#F0FFFF');
        doc.rect(305, textBoxY, 245, 40).strokeColor('#509e2f').stroke();

        doc.fillColor('black').font('Helvetica-Oblique')
                .fontSize(8).text(
                        i18n.__('seeAllContributingDatasets'), 305, textBoxY + 5, {align: 'right', width: 240})
                        .fillColor('blue').text('http://www.gbif.org/country/' + options.countryCode + '/about/datasets', {align: 'right', width: 240});
}

module.exports = {
        header: header,
        secondaryPageHeader: secondaryPageHeader,
        accessAndUsage, accessAndUsage,
        datAvailability: datAvailability,
        dataMobilization: dataMobilization,
        dataDownloads: dataDownloads,
        recentPeerReviewed: recentPeerReviewed,
        selectedTaxonomicGroups: selectedTaxonomicGroups,
        getChangeOverTime: getChangeOverTime,
        recentDatasets: recentDatasets,
        recentPublishers: recentPublishers,
        dataSharingWithCountryOfOrigin: dataSharingWithCountryOfOrigin,
        topDataContributors: topDataContributors

};
