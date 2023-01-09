const _ = require('lodash');
const moment = require('moment');
const PNG = require('png-js');

function header(doc, options) {
        doc.image(__dirname + '/assets/GBIF-2015-full.png', 40, 45 + options.Y_OFFSET, {height: 38}); // → Width of about 183.5px
        doc.image(__dirname + '/assets/green_bar.png', 30, 95 + options.Y_OFFSET, {height: 20, width: 540});

        doc.font('Arial').fontSize(26).text(options.i18n.__('countryReport'), 320, 44 + options.Y_OFFSET);
        if (['FK'].indexOf(options.countryCode) === -1) {
                var flagPng = PNG.load(__dirname + '/assets/flags/' + options.countryCode.toLowerCase() + '.png');
                var flagHeight = (38.0/729*522); // Size to the height of the black bar in the logo
                var flagWidth = flagPng.width * (flagHeight / flagPng.height);

                doc.rect(570 - flagWidth - 0.25, 45 + options.Y_OFFSET + (38.0/729*58) - 0.25, flagWidth + 0.5, flagHeight + 0.5).lineWidth(1).strokeColor('#dddddd').stroke();

                doc.image(__dirname + '/assets/flags/' + options.countryCode.toLowerCase() + '.png', 570 - flagWidth,
                          45 + options.Y_OFFSET + (38.0/729*58), // Align with top of black bar in logo
                          {height: flagHeight});
        }

        doc.fontSize(26).text(options.countryName, 50, 145 + options.Y_OFFSET);
        doc.fontSize(9).text(options.i18n.__('introduction', options.countryName), 50, 175 + options.Y_OFFSET);

        moment.locale(options.locale);
        doc.font('Arial-Italic')
                .fontSize(9)
                .text(options.i18n.__('generated') + ' ' + moment().format('MMMM YYYY'), 400, 130 + options.Y_OFFSET, {width: 150, align: 'right'});

        doc.moveTo(50, 240 + options.Y_OFFSET)
                .lineTo(550, 240 + options.Y_OFFSET)
                .lineWidth(2)
                .strokeColor('#509e2f').
                stroke();
}

function accessAndUsage(doc, options) {
        doc.font('Arial-Bold').fontSize(12)
                .text('▶ ' + options.i18n.__('accessAndUsage'), 50, 248 + options.Y_OFFSET);

        // content width is 500, circle is 180, so offset by margin+160
        var xOffset = 50+160;

        doc.image(__dirname + '/assets/green_circle.png', xOffset, 250 + options.Y_OFFSET, {width: 180});

        doc.font('Arial').fontSize(10)
                .text(options.i18n.__('researchersFrom'), xOffset, 280 + options.Y_OFFSET, {width: 180, align: 'center'});
        let nameY = (options.countryName.length > 16) ? 290 : 300;
        doc.font('Arial-Bold').fontSize(15)
                .text(options.countryName, xOffset + 5, nameY + options.Y_OFFSET, {width: 170, align: 'center'});
        doc.font('Arial').fontSize(8)
                .text(options.i18n.__('contributedTo'), xOffset, 327 + options.Y_OFFSET, {width: 180, align: 'center'});
        doc.font('Arial-Bold').fontSize(15).fillColor('white')
                .text(options.countryPublications.reportYear, xOffset, 337 + options.Y_OFFSET, {width: 180, align: 'center'});
        doc.font('Arial').fontSize(8).fillColor('black')
                .text(options.i18n.__('peerReviewedInReportingPeroid', options.year), xOffset+10, 355 + options.Y_OFFSET, {width: 160, align: 'center'});
        doc.font('Arial-Bold').fontSize(15).fillColor('white')
                .text(options.countryPublications.allYears, xOffset, 380 + options.Y_OFFSET, {width: 180, align: 'center'});
        doc.font('Arial').fontSize(8).fillColor('black')
                .text(options.i18n.__('articlesSince'), xOffset, 405 + options.Y_OFFSET, {width: 180, align: 'center'});

        doc.moveTo(50, 440 + options.Y_OFFSET)
                .lineTo(550, 440 + options.Y_OFFSET)
                .lineWidth(2)
                .strokeColor('#509e2f').
                stroke();
}

function datAvailability(doc, options) {
        doc.font('Arial-Bold').fontSize(12)
                .text('▶ ' + options.i18n.__('dataAvailability') + ' ' + options.i18n.__('in') + ' ' + options.countryName, 50, 450 + options.Y_OFFSET);

        doc.image(__dirname + '/assets/kingdoms/animalia.png', 55, 470 + options.Y_OFFSET, {width: 50});
        doc.image(__dirname + '/assets/kingdoms/plantae.png', 180, 470 + options.Y_OFFSET, {width: 50});
        doc.image(__dirname + '/assets/kingdoms/fungi.png', 305, 470 + options.Y_OFFSET, {width: 50});
        doc.image(__dirname + '/assets/kingdoms/unknown.png', 430, 470 + options.Y_OFFSET, {width: 50});

        doc.image(__dirname + '/assets/kingdoms/protozoa.png', 100, 545 + options.Y_OFFSET, {width: 40});
        doc.image(__dirname + '/assets/kingdoms/bacteria.png', 200, 545 + options.Y_OFFSET, {width: 40});
        //doc.image(__dirname + '/assets/kingdoms/virus.png', 250, 545 + options.Y_OFFSET, {width: 40});
        doc.image(__dirname + '/assets/kingdoms/chromista.png', 300, 545 + options.Y_OFFSET, {width: 40});
        doc.image(__dirname + '/assets/kingdoms/archaea.png', 400, 545 + options.Y_OFFSET, {width: 40});

        // First row of kingdoms
        doc.font('Arial-Italic')
                .fontSize(10)
                .text('Animalia', 120, 485 + options.Y_OFFSET);
        doc.font('Arial-Bold')
                .fontSize(10)
                .text(options.countryOccurencesByKingdom.Animalia.toLocaleString(options.locale), 120, 500 + options.Y_OFFSET);
        doc.font('Arial')
                .fontSize(8)
                .text(options.i18n.__('occurrences'), 120, 513 + options.Y_OFFSET);
        doc.font('Arial-Italic')
                .fontSize(10)
                .text('Plantae', 245, 485 + options.Y_OFFSET);
        doc.font('Arial-Bold')
                .fontSize(10)
                .text(options.countryOccurencesByKingdom.Plantae.toLocaleString(options.locale), 245, 500 + options.Y_OFFSET);
        doc.font('Arial')
                .fontSize(8)
                .text(options.i18n.__('occurrences'), 245, 513 + options.Y_OFFSET);
        doc.font('Arial-Italic')
                .fontSize(10)
                .text('Fungi', 370, 485 + options.Y_OFFSET);
        doc.font('Arial-Bold')
                .fontSize(10)
                .text(options.countryOccurencesByKingdom.Fungi.toLocaleString(options.locale), 370, 500 + options.Y_OFFSET);
        doc.font('Arial')
                .fontSize(8)
                .text(options.i18n.__('occurrences'), 370, 513 + options.Y_OFFSET);
        doc.font('Arial-Italic')
                .fontSize(10)
                .text('Unknown', 495, 485 + options.Y_OFFSET);
        doc.font('Arial-Bold')
                .fontSize(10)
                .text(options.countryOccurencesByKingdom.Unknown.toLocaleString(options.locale), 495, 500 + options.Y_OFFSET);
        doc.font('Arial')
                .fontSize(8)
                .text(options.i18n.__('occurrences'), 495, 513 + options.Y_OFFSET);
        // Second row of kingdoms

        let x = 50;
        doc.font('Arial-Italic')
                .fontSize(8)
                .text('Protozoa', x+100, 550 + options.Y_OFFSET);
        doc.font('Arial-Bold')
                .fontSize(10)
                .text(options.countryOccurencesByKingdom.Protozoa.toLocaleString(options.locale), x+100, 563 + options.Y_OFFSET);
        doc.font('Arial')
                .fontSize(8)
                .text(options.i18n.__('occurrences'), x+100, 576 + options.Y_OFFSET);
        doc.font('Arial-Italic')
                .fontSize(8)
                .text('Bacteria', x+200, 550 + options.Y_OFFSET);
        doc.font('Arial-Bold')
                .fontSize(10)
                .text(options.countryOccurencesByKingdom.Bacteria.toLocaleString(options.locale), x+200, 563 + options.Y_OFFSET);
        doc.font('Arial')
                .fontSize(8)
                .text(options.i18n.__('occurrences'), x+200, 576 + options.Y_OFFSET);
        //doc.font('Arial-Italic')
        //        .fontSize(8)
        //        .text('Virus', 300, 550 + options.Y_OFFSET);
        //doc.font('Arial-Bold')
        //        .fontSize(10)
        //        .text(options.countryOccurencesByKingdom.Virus.toLocaleString(options.locale), 300, 563 + options.Y_OFFSET);
        //doc.font('Arial')
        //        .fontSize(8)
        //        .text(options.i18n.__('occurrences'), 300, 576 + options.Y_OFFSET);
        doc.font('Arial-Italic')
                .fontSize(8)
                .text('Chromista', x+300, 550 + options.Y_OFFSET);
        doc.font('Arial-Bold')
                .fontSize(10)
                .text(options.countryOccurencesByKingdom.Chromista.toLocaleString(options.locale), x+300, 563 + options.Y_OFFSET);
        doc.font('Arial')
                .fontSize(8)
                .text(options.i18n.__('occurrences'), x+300, 576 + options.Y_OFFSET);
        doc.font('Arial-Italic')
                .fontSize(8)
                .text('Archaea', x+400, 550 + options.Y_OFFSET);
        doc.font('Arial-Bold')
                .fontSize(10)
                .text(options.countryOccurencesByKingdom.Archaea.toLocaleString(options.locale), x+400, 563 + options.Y_OFFSET);
        doc.font('Arial')
                .fontSize(8)
                .text(options.i18n.__('occurrences'), x+400, 576 + options.Y_OFFSET);

        doc.moveTo(50, 598 + options.Y_OFFSET)
                .lineTo(550, 598 + options.Y_OFFSET)
                .lineWidth(2)
                .strokeColor('#509e2f').
                stroke();
}

function dataMobilization(doc, options) {
        doc.font('Arial-Bold').fontSize(12)
                .text('▶ ' + options.i18n.__('dataMobilization'), 50, 607 + options.Y_OFFSET);

        doc.image(__dirname + '/assets/green_circle.png', 70, 625 + options.Y_OFFSET, {width: 180});
        doc.fillColor('black').font('Arial').fontSize(10)
                .text(options.i18n.__('institutionsFrom'), 70, 645 + options.Y_OFFSET, {width: 180, align: 'center'});
        let nameY = (options.countryName.length > 16) ? 656 : 665;
        doc.font('Arial-Bold').fontSize(15)
                .text(options.countryName, 75, nameY + options.Y_OFFSET, {width: 170, align: 'center'});
        doc.font('Arial').fontSize(8)
                .text(options.i18n.__('published'), 70, 692 + options.Y_OFFSET, {width: 180, align: 'center'});

        doc.font('Arial-Bold').fontSize(15).fillColor('white')
                .text(options.publishedOccRecords.countryOccRecords.toLocaleString(options.locale), 70, 702 + options.Y_OFFSET, {width: 180, align: 'center'});

        doc.font('Arial').fontSize(8).fillColor('black')
                .text(options.i18n.__('newOccRecordsTotalOf', options.year), 83, 725 + options.Y_OFFSET, {width: 150, align: 'center'});
        doc.font('Arial-Bold').fontSize(15).fillColor('white')
                .text(
                        options.publishedOccRecords.globalOccRecords.toLocaleString(options.locale),
                        70, 747 + options.Y_OFFSET, {width: 180, align: 'center'});
        doc.font('Arial').fontSize(8).fillColor('black')
                .text(options.i18n.__('addedGloballyToGBIF'), 100, 768 + options.Y_OFFSET, {width: 120, align: 'center'});

        doc.image(options.occByKingdomChartPublishedBy, 270, 625 + options.Y_OFFSET, {width: 260, height: 150});
        doc.font('Arial-Italic')
                .fontSize(8)
                .text(
                        options.i18n.__('numRecordsByInstitutionsInCountry') + ' ' + options.countryName + ', '
                        + options.i18n.__('categorizedByKingdom'), 310, 780 + options.Y_OFFSET, {width: '200', align: 'center'});
}

function secondaryPageHeader(doc, options, pageNumber, totalPages) {
        if (['FK'].indexOf(options.countryCode) === -1) {
                var flagPng = PNG.load(__dirname + '/assets/flags/' + options.countryCode.toLowerCase() + '.png');
                var flagHeight = 20.0;
                var flagWidth = flagPng.width * (flagHeight / flagPng.height);

                doc.rect(50 - 0.25, 52 + options.Y_OFFSET - 0.25, flagWidth + 0.5, flagHeight + 0.5).lineWidth(1).strokeColor('#dddddd').stroke();

                doc.image(__dirname + '/assets/flags/' + options.countryCode.toLowerCase() + '.png', 50, 52 + options.Y_OFFSET, {height: 20});
        }
        doc.image(__dirname + '/assets/green_bar.png', 110, 52 + options.Y_OFFSET, {height: 20, width: 440});
        doc.fillColor('black').font('Arial').fontSize(9).text(pageNumber + ' | ' + totalPages, 530, 82 + options.Y_OFFSET);
        doc.moveTo(50, 100 + options.Y_OFFSET)
                .lineTo(550, 100 + options.Y_OFFSET)
                .lineWidth(2)
                .strokeColor('#509e2f').
                stroke();
}

function dataDownloads(doc, options) {
        doc.font('Arial-Bold').fontSize(12)
                .text(options.i18n.__('accessAndUsage'), 50, 115 + options.Y_OFFSET)
                .fillColor('#509e2f').text(options.i18n.__('dataDownloadsFromUsersIn') + ' ' + options.countryName, 50, 135 + options.Y_OFFSET);

        doc.image(__dirname + '/assets/green_circle.png', 70, 170 + options.Y_OFFSET, {width: 180});
        doc.fillColor('black').font('Arial').fontSize(10)
                .text(options.i18n.__('usersFrom'), 70, 195 + options.Y_OFFSET, {width: 180, align: 'center'});
        let nameY = (options.countryName.length > 16) ? 207 : 215;
        doc.font('Arial-Bold').fontSize(15)
                .text(options.countryName, 75, nameY + options.Y_OFFSET, {width: 170, align: 'center'});
        doc.font('Arial').fontSize(8)
                .text(options.i18n.__('made'), 70, 243 + options.Y_OFFSET, {width: 180, align: 'center'});

        doc.font('Arial-Bold').fontSize(15).fillColor('white')
                .text(options.accessAndUsageData.countryDownloads.toLocaleString(options.locale), 70, 252 + options.Y_OFFSET, {width: 180, align: 'center'});

        doc.font('Arial').fontSize(8).fillColor('black')
                .text(options.i18n.__('dowloadRequestsRepresenting'), 70, 275 + options.Y_OFFSET, {width: 170, align: 'center'});
        doc.font('Arial-Bold').fontSize(15).fillColor('white')
                .text(
                        (options.accessAndUsageData.countryDownloads / options.accessAndUsageData.totalDownloads * 100).toFixed(1) + '%',
                        70, 290 + options.Y_OFFSET, {width: 180, align: 'center'});
        doc.font('Arial').fontSize(8).fillColor('black')
                .text(options.i18n.__('ofAllDownloads', options.year), 100, 310 + options.Y_OFFSET, {width: 120, align: 'center'});

        doc.image(options.downloadsByMonthChart, 300, 190 + options.Y_OFFSET, {width: 250, height: 150});
        doc.font('Arial-Italic')
                .fontSize(8)
                .text(options.i18n.__('monthlyDownloadsByUsersInCountry') + ' ' + options.countryName, 300, 340 + options.Y_OFFSET, {width: 250, align: 'center'});

        doc.moveTo(50, 390 + options.Y_OFFSET)
                .lineTo(550, 390 + options.Y_OFFSET)
                .lineWidth(2)
                .strokeColor('#509e2f').
                stroke();
}

function recentPeerReviewed(doc, options) {
        if (options.countryPublications.latest.length > 0) {
                doc.font('Arial-Bold').fillColor('#509e2f').fontSize(12);
                doc.text(options.i18n.__('recentPeerReviewedArticles') + ' ' + options.countryName, 50, 400, {continued: false, width: 500, align: 'left'});

                doc.rect(50, 435, 500, 73)
                        .fill('#D3D3D3');
                doc.fillColor('black').font('Arial').fontSize(8).text(
                        options.i18n.__('theGBIFSecretariatMaintansAndReports', options.countryName),
                        60, 440, {width: 490});
                doc.moveDown();
                doc.text(options.i18n.__('thoseInterestedInAssisting') + ' ', {width: 490, continued: true}).fillColor('blue').text('comms@gbif.org.');

                doc.font('Arial').fontSize(10);
                let publications = options.countryPublications.latest.map(function(p) {
                        let authors = (p.authors.length > 3) ?
                                p.authors.slice(0, 3).map(function(a) {
                                        return a.lastName;
                                }).join(', ') + ' et al.' :
                                p.authors.map(function(a) {
                                        return a.lastName;
                                }).join(', ') + '.';
                        let result = {
                                txt: authors + ' (' + p.year + ') ' + p.title + '. ',
                                source: (typeof p.source !== 'undefined') ? p.source + '. ' : ' '
                        };
                        if (p.identifiers && p.identifiers.doi) {
                                result.doi = 'https://doi.org/' + p.identifiers.doi;
                        }
                        return result;
                });

                doc.moveDown();
                doc.x = 55;

                let textBoxY = doc.y;
                for (let i = 0; i < publications.length; i++) {
                        let w = (i < publications.length - 1) ? 450 : 325;
                        if (i === publications.length - 1) {
                                textBoxY = doc.y;
                        }

                        if (publications[i].txt.indexOf("et al.") > 0) {
                                var etal = publications[i].txt.indexOf("et al.");
                                doc.fillColor('black').text(publications[i].txt.slice(0, etal), {indent: -5, width: w, continued: true});
                                doc.font('Arial-Italic').text("et al.", {continued: true});
                                doc.font('Arial').text(publications[i].txt.slice(etal+6), {continued: true});
                                doc.font('Arial-Italic').text(publications[i].source).font('Arial');
                        } else {
                                doc.fillColor('black').text(publications[i].txt, {indent: -5, width: w, continued: true});
                                doc.font('Arial-Italic').text(publications[i].source).font('Arial');
                        }

                        if (publications[i].doi) {
                                doc.fillColor('blue').text(publications[i].doi);
                                doc.link(doc.x, doc.y-doc.currentLineHeight(), doc.widthOfString(publications[i].doi), doc.currentLineHeight(), publications[i].doi);
                        }
                        if (i < publications.length - 1) {
                                doc.moveDown();
                        }
                }
                doc.rect(385, textBoxY, 165, 32).fill('#F0FFFF');
                doc.rect(385, textBoxY, 165, 32).stroke();

                doc.fillColor('black').font('Arial-Italic')
                        .fontSize(8).text(options.i18n.__('seeAllResearchFromThisCountry'), 385, textBoxY + 5, {align: 'right', width: 160})
                        .fillColor('blue').text('gbif.org/country/' + options.countryCode + '/publications', {align: 'right', width: 160});

                doc.link(385, textBoxY, 165, 32, 'https://www.gbif.org/country/' + options.countryCode + '/publications');
        }
}

function selectedTaxonomicGroups(doc, options) {
        doc.font('Arial-Bold').fontSize(12)
                .text(options.i18n.__('dataAvailability'), 50, 115 + options.Y_OFFSET)
                .fillColor('#509e2f').text(options.i18n.__('totalDataAvailableSelectedGroups') + ' ' + options.countryName, 50, 135 + options.Y_OFFSET);

        // First row of images
        doc.image(__dirname + '/assets/selectedGroups/mammals.png', 55, 170 + options.Y_OFFSET, {width: 50});
        doc.image(__dirname + '/assets/selectedGroups/birds.png', 180, 170 + options.Y_OFFSET, {width: 50});
        doc.image(__dirname + '/assets/selectedGroups/bonyFish.png', 305, 170 + options.Y_OFFSET, {width: 50});
        doc.image(__dirname + '/assets/selectedGroups/amphibians.png', 430, 170 + options.Y_OFFSET, {width: 50});

        // first row of text
        doc.fillColor('black').font('Arial-Italic')
                .fontSize(10)
                .text(options.i18n.__('mammals'), 115, 180 + options.Y_OFFSET, {width: 60});
        doc.font('Arial-Bold')
                .fontSize(10)
                .text(options.countsForSelectedtaxonomicGroups.mammals.toLocaleString(options.locale));
        doc.font('Arial')
                .fontSize(8)
                .text(options.i18n.__(options.i18n.__('occurrences')));

        doc.fillColor('black').font('Arial-Italic')
                .fontSize(10)
                .text(options.i18n.__('birds'), 240, 180 + options.Y_OFFSET, {width: 60});
        doc.font('Arial-Bold')
                .fontSize(10)
                .text(options.countsForSelectedtaxonomicGroups.birds.toLocaleString(options.locale));
        doc.font('Arial')
                .fontSize(8)
                .text(options.i18n.__(options.i18n.__('occurrences')));

        doc.fillColor('black').font('Arial-Italic')
                .fontSize(10)
                .text(options.i18n.__('bonyFish'), 365, 180 + options.Y_OFFSET, {width: 60});
        doc.font('Arial-Bold')
                .fontSize(10)
                .text(options.countsForSelectedtaxonomicGroups.bonyfish.toLocaleString(options.locale));
        doc.font('Arial')
                .fontSize(8)
                .text(options.i18n.__(options.i18n.__('occurrences')));

        doc.fillColor('black').font('Arial-Italic')
                .fontSize(10)
                .text(options.i18n.__('amphibians'), 490, 180 + options.Y_OFFSET, {width: 60});
        doc.font('Arial-Bold')
                .fontSize(10)
                .text(options.countsForSelectedtaxonomicGroups.amphibians.toLocaleString(options.locale));
        doc.font('Arial')
                .fontSize(8)
                .text(options.i18n.__(options.i18n.__('occurrences')));

        // second row of images
        doc.image(__dirname + '/assets/selectedGroups/insects.png', 117, 245 + options.Y_OFFSET, {width: 50});
        doc.image(__dirname + '/assets/selectedGroups/reptiles.png', 245, 245 + options.Y_OFFSET, {width: 50});
        doc.image(__dirname + '/assets/selectedGroups/molluscs.png', 365, 245 + options.Y_OFFSET, {width: 50});

        // second row of texts
        doc.fillColor('black').font('Arial-Italic')
                .fontSize(10)
                .text(options.i18n.__('insects'), 177, 255 + options.Y_OFFSET, {width: 60});
        doc.font('Arial-Bold')
                .fontSize(10)
                .text(options.countsForSelectedtaxonomicGroups.insects.toLocaleString(options.locale));
        doc.font('Arial')
                .fontSize(8)
                .text(options.i18n.__(options.i18n.__('occurrences')));
        doc.fillColor('black').font('Arial-Italic')
                .fontSize(10)
                .text(options.i18n.__('reptiles'), 302, 255 + options.Y_OFFSET, {width: 60});
        doc.font('Arial-Bold')
                .fontSize(10)
                .text(options.countsForSelectedtaxonomicGroups.reptiles.toLocaleString(options.locale));
        doc.font('Arial')
                .fontSize(8)
                .text(options.i18n.__(options.i18n.__('occurrences')));
        doc.fillColor('black').font('Arial-Italic')
                .fontSize(10)
                .text(options.i18n.__('molluscs'), 427, 255 + options.Y_OFFSET, {width: 80});
        doc.font('Arial-Bold')
                .fontSize(10)
                .text(options.countsForSelectedtaxonomicGroups.molluscs.toLocaleString(options.locale));
        doc.font('Arial')
                .fontSize(8)
                .text(options.i18n.__(options.i18n.__('occurrences')));

        // third row of images
        doc.image(__dirname + '/assets/selectedGroups/arachnids.png', 55, 320 + options.Y_OFFSET, {width: 50});
        doc.image(__dirname + '/assets/selectedGroups/floweringPlants.png', 180, 320 + options.Y_OFFSET, {width: 50});
        doc.image(__dirname + '/assets/selectedGroups/ferns.png', 305, 320 + options.Y_OFFSET, {width: 50});
        doc.image(__dirname + '/assets/selectedGroups/gymnosperms.png', 430, 320 + options.Y_OFFSET, {width: 50});
        // third roww of texts
        doc.fillColor('black').font('Arial-Italic')
                .fontSize(10)
                .text(options.i18n.__('arachnids'), 115, 330 + options.Y_OFFSET, {width: 60});
        doc.font('Arial-Bold')
                .fontSize(10)
                .text(options.countsForSelectedtaxonomicGroups.arachnids.toLocaleString(options.locale));
        doc.font('Arial')
                .fontSize(8)
                .text(options.i18n.__(options.i18n.__('occurrences')));

        doc.fillColor('black').font('Arial-Italic')
                .fontSize(10)
                .text(options.i18n.__('floweringPlants'), 240, 330 + options.Y_OFFSET, {width: 60});
        doc.font('Arial-Bold')
                .fontSize(10)
                .text(options.countsForSelectedtaxonomicGroups.floweringplants.toLocaleString(options.locale));
        doc.font('Arial')
                .fontSize(8)
                .text(options.i18n.__(options.i18n.__('occurrences')));

        doc.fillColor('black').font('Arial-Italic')
                .fontSize(10)
                .text(options.i18n.__('ferns'), 365, 330 + options.Y_OFFSET, {width: 60});
        doc.font('Arial-Bold')
                .fontSize(10)
                .text(options.countsForSelectedtaxonomicGroups.ferns.toLocaleString(options.locale));
        doc.font('Arial')
                .fontSize(8)
                .text(options.i18n.__(options.i18n.__('occurrences')));

        doc.fillColor('black').font('Arial-Italic')
                .fontSize(10)
                .text(options.i18n.__('gymnosperms'), 490, 330 + options.Y_OFFSET, {width: 70});
        doc.font('Arial-Bold')
                .fontSize(10)
                .text(options.countsForSelectedtaxonomicGroups.gymnosperms.toLocaleString(options.locale));
        doc.font('Arial')
                .fontSize(8)
                .text(options.i18n.__(options.i18n.__('occurrences')));

        // fourth row of images
        doc.image(__dirname + '/assets/selectedGroups/mosses.png', 117, 395 + options.Y_OFFSET, {width: 50});
        doc.image(__dirname + '/assets/selectedGroups/sacFungi.png', 245, 395 + options.Y_OFFSET, {width: 50});
        doc.image(__dirname + '/assets/selectedGroups/basidiomycota.png', 365, 395 + options.Y_OFFSET, {width: 50});
        // fourth row of texts
        doc.fillColor('black').font('Arial-Italic')
                .fontSize(10)
                .text(options.i18n.__('mosses'), 177, 405 + options.Y_OFFSET, {width: 60});
        doc.font('Arial-Bold')
                .fontSize(10)
                .text(options.countsForSelectedtaxonomicGroups.mosses.toLocaleString(options.locale));
        doc.font('Arial')
                .fontSize(8)
                .text(options.i18n.__(options.i18n.__('occurrences')));
        doc.fillColor('black').font('Arial-Italic')
                .fontSize(10)
                .text(options.i18n.__('sacFungi'), 302, 405 + options.Y_OFFSET, {width: 60});
        doc.font('Arial-Bold')
                .fontSize(10)
                .text(options.countsForSelectedtaxonomicGroups.sacfungi.toLocaleString(options.locale));
        doc.font('Arial')
                .fontSize(8)
                .text(options.i18n.__(options.i18n.__('occurrences')));
        doc.fillColor('black').font('Arial-Italic')
                .fontSize(10)
                .text(options.i18n.__('basidiomycota'), 427, 405 + options.Y_OFFSET, {width: 80});
        doc.font('Arial-Bold')
                .fontSize(10)
                .text(options.countsForSelectedtaxonomicGroups.basidiomycota.toLocaleString(options.locale));
        doc.font('Arial')
                .fontSize(8)
                .text(options.i18n.__(options.i18n.__('occurrences')));

        // Explanation of what each group is (grey box)
        doc.rect(50, 460 + options.Y_OFFSET, 500, 65)
                .fill('#D3D3D3');

        doc.fillColor('black')
                .fontSize(8);

        doc.font('Arial').text(options.i18n.__('mammals') + ' = ' + options.i18n.__('taxonRank.class'), 55, 465 + options.Y_OFFSET, {width: 120, continued: true}).font('Arial-Italic').text(' Mammalia');
        doc.font('Arial').text(options.i18n.__('birds') + ' = ' + options.i18n.__('taxonRank.class'), {width: 120, continued: true}).font('Arial-Italic').text(' Aves');
        doc.font('Arial').text(options.i18n.__('bonyFish') + ' = ' + options.i18n.__('taxonRank.superclass'), {width: 120, continued: true}).font('Arial-Italic').text(' Osteichthyes', {continued: true}).font('Arial').text(' p.p.');
        doc.font('Arial').text(options.i18n.__('amphibians') + ' = ' + options.i18n.__('taxonRank.class'), {width: 120, continued: true}).font('Arial-Italic').text(' Amphibia');

        doc.font('Arial').text(options.i18n.__('insects') + ' = ' + options.i18n.__('taxonRank.class'), 175, 465 + options.Y_OFFSET, {width: 120, continued: true}).font('Arial-Italic').text(' Insecta');
        doc.font('Arial').text(options.i18n.__('reptiles') + ' = ' + options.i18n.__('taxonRank.class'), {width: 120, continued: true}).font('Arial-Italic').text(' Testudines, Sphenodontia, Squamata & Crocodylia');
        doc.font('Arial').text(options.i18n.__('molluscs') + ' = ' + options.i18n.__('taxonRank.phylum'), {width: 120, continued: true}).font('Arial-Italic').text(' Mollusca');

        doc.font('Arial').text(options.i18n.__('arachnids') + ' = ' + options.i18n.__('taxonRank.class'), 300, 465 + options.Y_OFFSET, {width: 120, continued: true}).font('Arial-Italic').text(' Arachnida');
        doc.font('Arial').text(options.i18n.__('floweringPlants') + ' = ' + options.i18n.__('taxonRank.phylum'), {width: 120, continued: true}).font('Arial-Italic').text(' Magnoliophyta');
        doc.font('Arial').text(options.i18n.__('gymnosperms') + ' = ' + options.i18n.__('taxonRank.superclass'), {width: 120, continued: true}).font('Arial-Italic').text(' Gymnospermae');

        doc.font('Arial').text(options.i18n.__('ferns') + ' = ' + options.i18n.__('taxonRank.phylum'), 425, 465 + options.Y_OFFSET, {width: 120, continued: true}).font('Arial-Italic').text(' Pteridophyta');
        doc.font('Arial').text(options.i18n.__('mosses') + ' = ' + options.i18n.__('taxonRank.phylum'), {width: 120, continued: true}).font('Arial-Italic').text(' Bryophyta');
        doc.font('Arial').text(options.i18n.__('sacFungi') + ' = ' + options.i18n.__('taxonRank.phylum'), {width: 120, continued: true}).font('Arial-Italic').text(' Ascomycota');
        doc.font('Arial').text(options.i18n.__('basidiomycota') + ' = ' + options.i18n.__('taxonRank.phylum'), {width: 120, continued: true}).font('Arial-Italic').text(' Basidiomycota');

        doc.moveTo(50, 540 + options.Y_OFFSET)
                .lineTo(550, 540 + options.Y_OFFSET)
                .lineWidth(2)
                .strokeColor('#509e2f').
                stroke();
}

function getChangeOverTime(doc, options) {
        doc.font('Arial-Bold').fontSize(12)
                .fillColor('#509e2f').text(options.i18n.__('changeOverTimeInRecords') + ' ' + options.countryName, 50, 555 + options.Y_OFFSET);

        doc.image(options.occByKingdomChartAbout, 50, 575, {width: 250, height: 130});
        doc.fillColor('black').font('Arial-Italic')
                .fontSize(8)
                .text(options.i18n.__('occRecordsAvailableFigText') + ' ' + options.countryName, 83, 713 + options.Y_OFFSET, {width: 200, align: 'center'});

        doc.image(options.speciesByKingdomChartAbout, 300, 575, {width: 250, height: 130});

        doc.fillColor('black').font('Arial-Italic')
                .fontSize(8)
                .text(options.i18n.__('speciesAvailableOccRecords') + ' ' + options.countryName, 333, 713 + options.Y_OFFSET, {width: 200, align: 'center'});


        doc.rect(50, 740 + options.Y_OFFSET, 250, 65)
                .fill('#D3D3D3');
        doc.font('Arial-Bold')
                .fillColor('black')
                .fontSize(9)
                .text(options.i18n.__('whyDecrease'), 55, 745 + options.Y_OFFSET, {width: 245, align: 'left'});
        doc.font('Arial').fontSize(8).text(options.i18n.__('whyDecreaseAnswer'), {width: 245});

        doc.rect(310, 740 + options.Y_OFFSET, 250, 65)
                .fill('#D3D3D3');
        doc.font('Arial-Bold')
                .fillColor('black')
                .fontSize(9)
                .text(options.i18n.__('speciesCounts'), 315, 745 + options.Y_OFFSET, {width: 245, continued: true})
                .font('Arial').fontSize(8).text(' ' + options.i18n.__('speciesCountInfo') + ' Catalogue of Life', {width: 245});
}

function recentDatasets(doc, options) {
        if (options.mostRecentDatasets.length > 0) {
                doc.font('Arial-Bold').fillColor('#509e2f').fontSize(12);
                doc.text(options.i18n.__('mostRecentDatsetsFrom') + ' ' + options.countryName, 50, 115, {continued: false, width: 400, align: 'left'});

                doc.font('Arial').fontSize(10);
                let datasets = options.mostRecentDatasets.map(function(p) {
                        return {
                                txt: p.title + '. ',
                                published: options.i18n.__('publishedBy') + ' ' + p._organisationTitle,
                                doi: 'https://doi.org/' + p.doi
                        };
                });

                doc.moveDown();
                doc.x = 55;

                for (let i = 0; i < datasets.length && doc.y < 425; i++) {
                        doc.fillColor('black').text(datasets[i].txt, {indent: -5, width: 450, continued: true});
                        doc.font('Arial-Italic').text(datasets[i].published);
                        doc.fillColor('blue').font('Arial').text(datasets[i].doi);
                        doc.link(doc.x, doc.y-doc.currentLineHeight(), doc.widthOfString(datasets[i].doi), doc.currentLineHeight(), datasets[i].doi);
                        if (i < datasets.length - 1) {
                                doc.moveDown();
                        }
                }

                let textBoxY = doc.y + 5;
                doc.rect(50, textBoxY, 500, 20).fill('#F0FFFF');
                doc.rect(50, textBoxY, 500, 20).strokeColor('#509e2f').stroke();

                doc.fillColor('black').font('Arial-Italic')
                        .fontSize(8).text(options.i18n.__('seeAllDatsetsFromThisCountry') + ': ', 55, textBoxY + 5, {align: 'left', width: 495, continued: true})
                        .fillColor('blue').text('gbif.org/dataset/search?publishing_country=' + options.countryCode);

                doc.link(50, textBoxY, 500, 20, 'https://www.gbif.org/dataset/search?publishing_country=' + options.countryCode);

                let y = doc.y + 20;
                doc.moveTo(50, y)
                        .lineTo(550, y)
                        .lineWidth(2)
                        .strokeColor('#509e2f').
                        stroke();
        }
}

function recentPublishers(doc, options) {
        let headlineY = doc.y + 40;
        doc.font('Arial-Bold').fillColor('#509e2f').fontSize(12);
        doc.text(options.i18n.__('mostRecentPublishersFrom') + ' ' + options.countryName, 50, doc.y + 40, {continued: false, width: 245, align: 'left'});

        let bodyY = doc.y + 5;
        doc.font('Arial').fontSize(10);
        let publishers = options.mostRecentPublishers.map(function(p) {
                return {txt: p.title};
        });
        if (publishers.length > 0) {
                doc.fillColor('black').text(publishers[0].txt, 55, bodyY + 20, {indent: -5, width: 245}).moveDown();
                for (let i = 1; i < publishers.length; i++) {
                        doc.fillColor('black').text(publishers[i].txt, {indent: -5, width: 245});
                        if (i !== publishers.length - 1) {
                                doc.moveDown();
                        }
                }
        } else {
                doc.fillColor('black').text(options.i18n.__('noDataAvailable'), 55, bodyY + 20, {indent: -5, width: 245}).moveDown();
        }
        let column1bottomY = doc.y;

        doc.font('Arial-Bold').fillColor('#509e2f').fontSize(12);
        doc.text(options.i18n.__('occDowloadedFromGBIFpublishedByInstitutionsInCountry') + ' ' + options.countryName, 300, headlineY, {continued: false, width: 250, align: 'left'});
        bodyY = Math.max(bodyY, (doc.y + 5));
        doc.image(options.recordsPublishedByCountryDownloadedByMonth, 300, bodyY, {width: 250, height: 170});
        let column2bottomY = bodyY + 180;

        let textBoxY = Math.max(column1bottomY, column2bottomY);
        doc.rect(50, textBoxY, 220, 32).fill('#F0FFFF');
        doc.rect(50, textBoxY, 220, 32).strokeColor('#509e2f').stroke();

        doc.fillColor('black').font('Arial-Italic')
                .fontSize(8).text(
                        options.i18n.__('seeAllPublishersFromThisCountry'), 50, textBoxY + 5, {align: 'right', width: 210})
                .fillColor('blue').text('gbif.org/publisher/search?country=' + options.countryCode, {align: 'right', width: 210});

        doc.link(50, textBoxY, 220, 32, 'https://www.gbif.org/publisher/search?country=' + options.countryCode);

        doc.font('Arial-Italic')
                .fontSize(8)
                .fillColor('black')
                .text(options.i18n.__('numOccDownloadsByOrgsIn') + ' ' + options.countryName, 325, textBoxY, {width: 200, align: 'center'});
}

function dataSharingWithCountryOfOrigin(doc, options) {
        doc.font('Arial-Bold').fillColor('black').fontSize(12).text(options.i18n.__('dataMobilization'), 50, 115);
        doc.font('Arial-Bold').fillColor('#509e2f').fontSize(12);
        doc.text(options.i18n.__('dataSharingWithCountryOfOrigin') + ' ' + options.countryName, {continued: false, width: 500, align: 'left'});
        let circleY = doc.y + 10;
        doc.image(__dirname + '/assets/green_circle.png', 330, circleY + options.Y_OFFSET, {width: 180});
        let nameY = (options.countryName.length > 16) ? (circleY + 25) : (circleY + 30);
        doc.font('Arial-Bold').fontSize(15).fillColor('black')
                .text(options.countryName, 335, nameY, {width: 170, align: 'center'});
        doc.font('Arial').fontSize(8)
                .text(options.i18n.__('publishesDataFrom'), 330, circleY + 62, {width: 180, align: 'center'});
        doc.font('Arial-Bold').fontSize(15).fillColor('white')
                .text(options.occurrenceFacets.COUNTRY.toLocaleString(options.locale), 330, circleY + 70, {width: 180, align: 'center'});
        doc.font('Arial').fontSize(8).fillColor('black')
                .text(options.i18n.__('countriesTerritoriesAndislands'), 340, circleY + 85, {width: 160, align: 'center'});
        doc.font('Arial').fontSize(8).fillColor('black')
                .text(options.i18n.__('including'), {width: 160, align: 'center'});
        doc.font('Arial-Bold').fontSize(15).fillColor('white')
                .text(options.occurrenceFacets.count.toLocaleString(options.locale), 330, circleY + 105, {width: 180, align: 'center'});
        doc.font('Arial').fontSize(8).fillColor('black')
                .text(options.i18n.__('occurrences') + ' ' + options.i18n.__('in'), 330, circleY + 125, {width: 180, align: 'center'});
        doc.font('Arial-Bold').fontSize(15).fillColor('white')
                .text(options.occurrenceFacets.DATASET_KEY.toLocaleString(options.locale), 330, circleY + 132, {width: 180, align: 'center'});
        doc.font('Arial').fontSize(8).fillColor('black')
                .text(options.i18n.__('occurrenceDatasets'), 330, circleY + 147, {width: 180, align: 'center'});

        doc.image(options.occRepatriation, 50, circleY, {width: 270, height: 140});
        doc.font('Arial-Italic')
                .fontSize(8)
                .text(options.i18n.__('dataSharingWithCountryOfOriginFigureText'), 85, doc.y + 5, {width: '200', align: 'center'});

        doc.rect(50, 348, 500, 32)
                .fill('#D3D3D3');
        doc.fillColor('black').font('Arial').fontSize(8).text(
                options.i18n.__('numRecordsSharedOverTime', options.countryName),
                60, 353, {width: 490});

        let y = doc.y + 30;
        doc.moveTo(50, y)
                .lineTo(550, y)
                .lineWidth(2)
                .strokeColor('#509e2f').
                stroke();
}

function topDataContributors(doc, options) {
        let headlineY = doc.y + 45;
        doc.font('Arial-Bold').fillColor('#509e2f').fontSize(12);
        doc.text(options.i18n.__('topDataContributorsAbout') + ' ' + options.countryName, 50, headlineY, {width: 245});

        doc.fontSize(9).fillColor('black').lineWidth(1)
                .font('Arial')
                .strokeColor('black');
        let table1 = {
                headers: [options.i18n.__('rank'), options.i18n.__('country_'), options.i18n.__('noOccs')],
                rows: _.map(options.topDataContributors, function(c) {
                        return [options.topDataContributors.indexOf(c) + 1, options.i18n.__('country.' + c.name), c.count.toLocaleString(options.locale)];
                })
        };
        let bodyY = doc.y + 5;
        doc.moveDown().table(table1, 50, bodyY, {width: 245});
        // rankingOfCountriesContributing

        doc.font('Arial-Italic')
                .fontSize(8)
                .text(options.i18n.__('table') + ' 1. ' + options.i18n.__('rankingOfCountriesContributing') + ' ' + options.countryName, 75, doc.y + 5, {width: '200', align: 'center'});
        let column1bottomY = doc.y;
        // Second column
        doc.font('Arial-Bold').fillColor('#509e2f').fontSize(12);
        doc.text(options.i18n.__('topDataetsContributing') + ' ' + options.countryName, 305, headlineY, {width: 250});
        moment.locale(options.locale);
        let datasets = options.topDatasets.map(function(p) {
                return {
                        txt: p.title + '. ',
                        count: p._count.toLocaleString(options.locale) + ' ' + options.i18n.__('occurrences') + ' ' + options.i18n.__('in') + ' ' + options.countryName + '. ',
                        updated: '(' + options.i18n.__('lastUpdated') + ' ' + moment(p.modified).format('D MMM YYYY') + ') ',
                        doi: 'https://doi.org/' + p.doi
                };
        });

        doc.font('Arial').fontSize(10);
        doc.moveDown();
        doc.x = 310;

        for (let i = 0; i < datasets.length; i++) {
                doc.fillColor('black').text(datasets[i].txt, {indent: -5, width: 250, continued: true});
                doc.font('Arial-Italic').text(datasets[i].count, {continued: true});
                doc.font('Arial').text(datasets[i].updated);
                if (i < datasets.length - 1) {
                        doc.moveDown();
                }
        }
        let column2bottomY = doc.y;
        let textBoxY = Math.max(column1bottomY, column2bottomY) + 5;

        doc.rect(50, textBoxY, 500, 20).fill('#F0FFFF');
        doc.rect(50, textBoxY, 500, 20).lineWidth(2).strokeColor('#509e2f').stroke();

        doc.fillColor('black').font('Arial-Italic')
                .fontSize(8).text(options.i18n.__('seeAllContributing') + ': ', 55, textBoxY + 5, {align: 'left', width: 495, continued: true})
                .fillColor('blue').text('gbif.org/country/' + options.countryCode + '/about');

        doc.link(50, textBoxY, 500, 20, 'https://www.gbif.org/country/' + options.countryCode + '/about');
}

function projectParticipation(doc, options) {
        if (options.projectsWithCountryAsPartner && options.projectsWithCountryAsPartner.length > 0) {
                doc.font('Arial-Bold').fillColor('#509e2f').fontSize(12);
                doc.text(options.countryName + ' ' + options.i18n.__('participatesInTheseProjects'), 50, doc.y + 40, {continued: false, width: 500, align: 'left'});


                doc.font('Arial').fontSize(10);
                let projects = options.projectsWithCountryAsPartner;

                doc.fillColor('black').text(projects[0].title, 55, doc.y + 20, {indent: -5, width: 450});
                doc.fontSize(8).font('Arial-Italic').text(projects[0].programme + ', ' + projects[0].start.substr(0,4) + '–' + projects[0].end.substr(0,4), {width: 450});
                doc.font('Arial').text(projects[0].summary, {width: 450});

                let link = 'https://www.gbif.org/project/' + projects[0]._id;
                doc.fillColor('blue').text(link, {width: 450});
                doc.link(doc.x, doc.y-doc.currentLineHeight(), doc.widthOfString(link), doc.currentLineHeight(), link);
                doc.moveDown();
                let textBoxY = doc.y;
                for (let i = 1; i < projects.length; i++) {
                        let w = (i < projects.length - 1) ? 450 : 310;
                        if (i === projects.length - 1) {
                                textBoxY = doc.y;
                        }
                        doc.fontSize(10).fillColor('black').text(projects[i].title, {indent: -5, width: w});
                        doc.fontSize(8).font('Arial-Italic').text(projects[i].programme + ', ' + projects[i].start.substr(0,4) + '–' + projects[i].end.substr(0,4), {width: w});
                        doc.font('Arial').text(projects[i].summary, {width: w});

                        link = 'https://www.gbif.org/project/' + projects[i]._id;
                        doc.fillColor('blue').text(link, {width: w});
                        doc.link(doc.x, doc.y-doc.currentLineHeight(), doc.widthOfString(link), doc.currentLineHeight(), link);
                        if (i < projects.length - 1) {
                                doc.moveDown();
                        }
                }
                doc.rect(365, textBoxY, 185, 32).fill('#F0FFFF');
                doc.rect(365, textBoxY, 185, 32).stroke();

                doc.fillColor('black').font('Arial-Italic')
                        .fontSize(8).text(options.i18n.__('seeAllGbifProjects'), 365, textBoxY + 5, {align: 'right', width: 180})
                        .fillColor('blue').text('gbif.org/resource/search?contentType=project', {align: 'right', width: 180});

                doc.link(365, textBoxY, 185, 32, 'https://www.gbif.org/resource/search?contentType=project');
        }
}

module.exports = {
        header: header,
        secondaryPageHeader: secondaryPageHeader,
        accessAndUsage: accessAndUsage,
        datAvailability: datAvailability,
        dataMobilization: dataMobilization,
        dataDownloads: dataDownloads,
        recentPeerReviewed: recentPeerReviewed,
        selectedTaxonomicGroups: selectedTaxonomicGroups,
        getChangeOverTime: getChangeOverTime,
        recentDatasets: recentDatasets,
        recentPublishers: recentPublishers,
        dataSharingWithCountryOfOrigin: dataSharingWithCountryOfOrigin,
        topDataContributors: topDataContributors,
        projectParticipation: projectParticipation
};
