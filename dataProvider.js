const HIGHCHARTS_SERVER_URL = require('./config').HIGHCHARTS_SERVER_URL;
const _ = require('lodash');
const rp = require('request-promise');
const csv = require('fast-csv');
const eventToPromise = require('event-to-promise');
const elasticQueryTemplates = require('./elasticQueryTemplates');
const moment = require('moment');
const KINGDOMS = require('./enums').KINGDOMS;
const SELECTED_TAXONOMIC_GROUPS = require('./enums').SELECTED_TAXONOMIC_GROUPS;
const API_BASE_URL = require('./config').API_BASE_URL;
const API_BASE_URL_STATS = require('./config').API_BASE_URL_STATS;
const CONTENTFUL_SEARCH_URL = require('./config').CONTENTFUL_SEARCH_URL;
const ANALYTICS_COUNTRY_BASEURL = require('./config').ANALYTICS_COUNTRY_BASEURL;
const ANALYTICS_GLOBAL_BASEURL = require('./config').ANALYTICS_GLOBAL_BASEURL;


function getPublicationsGlobal(yearsBack, year) {
    let promises = [];
    let result = {};
    let years = [];
    for (let i = yearsBack; i >= 0; i--) {
        years.push(year - i);
    }

    _.each(years, function(y) {
        promises.push(rp({method: 'GET', uri: CONTENTFUL_SEARCH_URL + 'literature/_search', body: elasticQueryTemplates.peerReviewedLiterature(y), json: true})
            .then(function(res) {
                result[y] = parseInt(res.hits.total);
            })
            .catch(function(err) {
                console.log(err);
            }));
    });

    return Promise.all(promises).then(function() {
        let chartData = {
            'title': {
                text: ''
            },
            'plotOptions': {
                'series': {
                    'dataLabels': {
                        'enabled': true
                    }
                }
            },
            'xAxis': {
                'labels': {
                    'style': {
                        'font': '20px Helvetica, Verdana, sans-serif'
                    }
                },
                'categories': []
            },
            'yAxis': {
                'title': {
                    'text': null
                }
            },

            'series': [
                {
                    'data': [],
                    'type': 'bar'
                }
            ],
            'credits': {
                'enabled': false
            },
            'legend': {
                'enabled': false
            }
        };

        _.each(result, function(val, key) {
            chartData.xAxis.categories.push(key);
            chartData.series[0].data.push(val);
        });
        chartData.series[0].data.reverse();
        chartData.xAxis.categories.reverse();
        // scale: 4, format: 'png', options
        return rp({
            method: 'POST', uri: HIGHCHARTS_SERVER_URL, body: {
                options: chartData,
                type: 'png',
                scale: 4,
                b64: true
            },
            json: true
        })
            .then(function(res) {
                return res;
            }).catch(function(err) {
                console.log(err);
            });
    }).catch(function(err) {
        //   console.log(years)
        console.log(err);
    });
}

async function getDownloadsByMonth(country, year) {
    let data = await getAccessAndUsageData(year, country);

    let options = {
        chart: {
            type: 'line'
        },
        title: {
            text: ''
        },
        xAxis: {
            'labels': {
                'style': {
                    'font': '20px Helvetica, Verdana, sans-serif'
                }
            },
            'categories': data.countryDownloadsByMonth.categories
        },
        yAxis: {
            'labels': {
                'style': {
                    'font': '12px Helvetica, Verdana, sans-serif'
                }
            },
            'title': {
                text: null
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        series: [{
            data: data.countryDownloadsByMonth.data
        }],
        credits: {
            enabled: false
        },
        legend: {
            enabled: false
        }
    };

 let res = await rp({
        method: 'POST', uri: HIGHCHARTS_SERVER_URL, body: {
            options: options,
            type: 'png',
            scale: 4,
            b64: true
        },
        json: true
    });
   return res;
}

async function getRecordsPublishedByCountryDownloadedByMonth(country, year) {
    let data = await getDownloadedOccurrencesPublishedByCountry(year, country);

    let options = {
        chart: {
            type: 'line'
        },
        title: {
            text: ''
        },
        xAxis: {
            'labels': {
                'style': {
                    'font': '20px Helvetica, Verdana, sans-serif'
                }
            },
            'categories': data.occRecordsByMonth.categories
        },
        yAxis: {
            'labels': {
                'style': {
                    'font': '12px Helvetica, Verdana, sans-serif'
                }
            },
            'title': {
                text: null
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        series: [{
            data: data.occRecordsByMonth.data
        }],
        credits: {
            enabled: false
        },
        legend: {
            enabled: false
        }
    };

 let res = await rp({
        method: 'POST', uri: HIGHCHARTS_SERVER_URL, body: {
            options: options,
            type: 'png',
            scale: 4,
            b64: true
        },
        json: true
    });
   return res;
}

function getSelectedCountryPublications(countryCode, year) {
    let promises = [
        rp({method: 'POST', uri: CONTENTFUL_SEARCH_URL + 'literature/_search', body: elasticQueryTemplates.peerReviewedLiterature(year, countryCode), json: true})
            .then(function(res) {
                return res.hits.total;
            })
            .catch(function(err) {
                console.log(err);
            }),
        rp({method: 'POST', uri: CONTENTFUL_SEARCH_URL + 'literature/_search', body: elasticQueryTemplates.peerReviewedLiterature(undefined, countryCode), json: true})
            .then(function(res) {
                return {
                    count: res.hits.total,
                    latest: res.hits.hits.map(function(h) {
                        return h._source;
                    }).splice(0, 5)
                };
            })
            .catch(function(err) {
                console.log(err);
            })];
    return Promise.all(promises).then(function(res) {
        return {'reportYear': res[0], 'allYears': res[1].count, 'latest': res[1].latest};
    }).catch(function(err) {
        console.log(err);
    });
}

function getCountryOccurencesByKingdom(countryCode, year) {
    return rp({method: 'GET', uri: API_BASE_URL + 'occurrence/search?country=' + countryCode + '&facet=kingdomKey&limit=0', json: true})
        .then(function(res) {
            let k = _.zipObject(KINGDOMS, _.map(KINGDOMS, function() {
                return 0
                    ;
            }));

            _.each(res.facets[0].counts, function(f) {
                let key = KINGDOMS[parseInt(f.name)];
                k[key] = f.count;
            });
            return k;
        }).catch(function(err) {
            console.log(err);
        });
}

function getCountsForSelectedtaxonomicGroups(countryCode) {
    let promises = [];

    _.each(SELECTED_TAXONOMIC_GROUPS, function(g) {
        let taxonQueryParam = (_.isArray(g.key)) ? g.key.join('&taxon_key=') : g.key;
        promises.push(
            rp({method: 'GET', uri: API_BASE_URL + 'occurrence/search?country=' + countryCode + '&taxon_key=' + taxonQueryParam + '&limit=0', json: true})
                .then(function(res) {
                    g.count = res.count;
                    return g;
                }));
    });
    let taxonocccounts = {};
    return Promise.all(promises).then(function(res) {
        for (let i = 0; i < res.length; i++) {
            taxonocccounts[res[i].name] = res[i].count;
        }
        return taxonocccounts;
    }).catch(function(err) {
        console.log(err);
    });
}

function getMostRecentDatasets(countryCode) {
    let datasetLimit = 7;
    return rp({method: 'GET', uri: API_BASE_URL + 'dataset?limit=' + datasetLimit + '&country=' + countryCode, json: true})
        .then(function(res) {
            let promises = _.map(res.results, function(dataset) {
                return rp({method: 'GET', uri: API_BASE_URL + 'organization/' + dataset.publishingOrganizationKey, json: true}).then(function(org) {
                    dataset._organisationTitle = org.title;
                    return dataset;
                });
            });
            return Promise.all(promises).then(function(decoratedDatasets) {
                return decoratedDatasets;
            })
                .catch(function(err) {
                    console.log(err);
                });
        }).catch(function(err) {
            console.log(err);
        });
}

function getMostRecentPublishers(countryCode) {
    return rp({method: 'GET', uri: API_BASE_URL + 'organization?country=' + countryCode, json: true})
        .then(function(res) {
            let promises = _.map(res.results, function(organization) {
                return rp({method: 'GET', uri: API_BASE_URL + 'dataset/search?limit=0&publishing_org=' + organization.key, json: true}).then(function(facet) {
                    organization._datasetCount = facet.count;
                    return organization;
                });
            });
            return Promise.all(promises).then(function(decoratedOrginaztions) {
                return _.filter(decoratedOrginaztions, function(o) {
                    return parseInt(o._datasetCount) > 0;
                }).splice(0, 5);
            })
                .catch(function(err) {
                    console.log(err);
                });
        }).catch(function(err) {
            console.log(err);
        });
}

function getTopDataContributors(countryCode) {
    return rp({method: 'GET', uri: API_BASE_URL + 'occurrence/search?facet=publishingCountry&limit=0&country=' + countryCode, json: true})
        .then(function(res) {
            return res.facets[0].counts;
        }).catch(function(err) {
            console.log(err);
        });
}


function getTopDatasets(countryCode) {
    return rp({method: 'GET', uri: API_BASE_URL + 'occurrence/search?facet=datasetKey&limit=0&country=' + countryCode, json: true})
        .then(function(res) {
            let promises = _.map(res.facets[0].counts, function(facet) {
                return rp({method: 'GET', uri: API_BASE_URL + 'dataset/' + facet.name, json: true}).then(function(dataset) {
                    dataset._count = facet.count;
                    return dataset;
                });
            });
            return Promise.all(promises).then(function(decoratedDatasets) {
                return decoratedDatasets.splice(0, 5);
            })
                .catch(function(err) {
                    console.log(err);
                });
        }).catch(function(err) {
            console.log(err);
        });
}

function getOccurrenceFacetsForCountry(countryCode) {
    return rp({method: 'GET', uri: API_BASE_URL + 'occurrence/search?facet=country&facet=datasetKey&limit=0&facetLimit=1000&publishingCountry=' + countryCode, json: true})
        .then(function(res) {
            let facets = {count: res.count};
            for (let i = 0; i < res.facets.length; i++) {
                facets[res.facets[i].field] = res.facets[i].counts.length;
            }

            return facets;
        }).catch(function(err) {
            console.log(err);
        });
}

function getProjectsWithCountryAsPartner(countryCode) {
    let body = elasticQueryTemplates.projectsForCountry(countryCode);
    return rp({method: 'POST', uri: CONTENTFUL_SEARCH_URL + 'project/_search', body: body, json: true})
        .then(function(res) {
            return (res.hits && res.hits.hits && res.hits.hits.length > 0) ? res.hits.hits.map(function(h) {
                return {
                    _id: h._id,
                    title: h._source.title['en-GB'],
                    summary: (h._source.summary) ? h._source.summary['en-GB'].replace('\n\n', ' ') : '',
                    isLead: (h._source.leadPartner && h._source.leadPartner.country === countryCode),
                    programme: (h._source.programme && h._source.programme.title) ? h._source.programme.title['en-GB'] : '',
                    start: h._source.start,
                    end: h._source.end
                };
            }) : [];
        })
        .catch(function(err) {
            console.log(err);
        });
}

async function annualDataGrowth(year, countryCode) {
    let uri = (countryCode) ? ANALYTICS_COUNTRY_BASEURL + countryCode + '/publishedBy/csv/occ_kingdom_basisOfRecord.csv' : ANALYTICS_GLOBAL_BASEURL + '/csv/occ_kingdom_basisOfRecord.csv';
    let csvfile = await rp({method: 'GET', uri: uri});
    let occSnapshotCountMap = {};
    let years = {};

    let emitter = csv
        .fromString(csvfile)

        .on('data', function(data) {
            let snapshotName = data[0].substring(0, 7); // year-month
            if (occSnapshotCountMap[snapshotName]) {
                occSnapshotCountMap[snapshotName] += parseInt(data[3]);
            } else {
                occSnapshotCountMap[snapshotName] = parseInt(data[3]);
            }
        });

    await eventToPromise(emitter, 'end');

    delete occSnapshotCountMap.snapsho; // get rid of the header
    let snapshots = Object.keys(occSnapshotCountMap);

    for (let i = 0; i < snapshots.length; i++) {
        let y = snapshots[i].split('-')[0];
        years[y] = false;
    }
    _.each(years, function(v, k) {
        //if (occSnapshotCountMap[k + '-12']) {
        //    years[k] = occSnapshotCountMap[k + '-12']; // there was a december snapshot
        //} else if (occSnapshotCountMap[(parseInt(k) + 1) + '-01']) {
        //    years[k] = occSnapshotCountMap[(parseInt(k) + 1) + '-01']; // No december snapshot, but from january next year
        //}

        if (occSnapshotCountMap[k + '-07']) {
            years[k] = occSnapshotCountMap[k + '-07'];
        }
    });
    if (years[year] && years[parseInt(year) - 1]) {
        return years[year] - years[parseInt(year) - 1];
    } else if (years[year]) {
        return years[year];
    } else {
        return 0;
        //throw new Error('Not possible to calculate data growth');
    }
}

async function getPublishedOccRecords(year, countryCode) {
    let countryOccRecords = await annualDataGrowth(year, countryCode);
    let globalOccRecords = await annualDataGrowth(year);
     return {
        countryOccRecords: countryOccRecords,
        globalOccRecords: globalOccRecords
    };
}

async function getAccessAndUsageData(year, countryCode) {
    let twoYearsAgo = '2017-01'; //moment().subtract(2, 'years').format('YYYY-MM');
    let lastYear = '2018'; //moment().subtract(1, 'years').format('YYYY');
    let countryDownloadsData = await rp({method: 'GET', uri: API_BASE_URL_STATS + 'occurrence/download/statistics/downloadsByUserCountry?userCountry=' + countryCode.toLowerCase() + '&fromDate=' + twoYearsAgo, json: true} );
    let totalDownloadsData = await rp({method: 'GET', uri: API_BASE_URL_STATS + 'occurrence/download/statistics/downloadsByUserCountry?&fromDate=' + twoYearsAgo, json: true} );
    let countryDownloads = 0;
    let totalDownloads = 0;
    _.each(countryDownloadsData[lastYear], function(v) {
        countryDownloads += parseInt(v);
    });
    _.each(totalDownloadsData[lastYear], function(v) {
        totalDownloads += parseInt(v);
    });

    _.each(countryDownloadsData['2017'], function(k, v) {
        if (parseInt(v) >= 7) {
            countryDownloads += parseInt(k);
        }

    });
    _.each(totalDownloadsData['2017'], function(k, v) {
        if (parseInt(v) >= 7) totalDownloads += parseInt(k);
    });

    let res = {
        countryDownloads: countryDownloads,
        totalDownloads: totalDownloads,
        countryDownloadsByMonth: {
            categories: [],
            data: []
        }
    };
    for (let i = 1; i < 13; i++) {
        let cat = moment().subtract(i, 'months').format('YYYY-MM');
        res.countryDownloadsByMonth.categories.push(cat);
        let count = 0;
        let parts = cat.split('-');
        let y = parseInt(parts[0]);
        let m = parseInt(parts[1]);
        if (countryDownloadsData[y] && countryDownloadsData[y][m]) {
            count = countryDownloadsData[y][m];
        }
        res.countryDownloadsByMonth.data.push(count);
    }
    res.countryDownloadsByMonth.categories.reverse();
    res.countryDownloadsByMonth.data.reverse();
    return res;
}

async function getDownloadedOccurrencesPublishedByCountry(year, countryCode) {
    let lastYear = moment().subtract(1, 'years').format('YYYY-MM-DD');
    let now = moment().format('YYYY-MM-DD');
    let countryOccDownloadsData =
     await rp(
         {method: 'GET',
          uri: API_BASE_URL_STATS + 'occurrence/download/statistics/downloadedRecordsByDataset?publishingCountry=' + countryCode.toLowerCase() + '&fromDate=' + lastYear + '&toDate=' + now,
          json: true}
     );
    let res = {
        occRecordsByMonth: {
            categories: [],
            data: []
        }
    };
    for (let i = 1; i < 13; i++) {
        let cat = moment().subtract(i, 'months').format('YYYY-MM');
        res.occRecordsByMonth.categories.push(cat);
        let count = 0;
        let parts = cat.split('-');
        let y = parseInt(parts[0]);
        let m = parseInt(parts[1]);
        if (countryOccDownloadsData[y] && countryOccDownloadsData[y][m]) {
            count = countryOccDownloadsData[y][m];
        }
        res.occRecordsByMonth.data.push(count);
    }
    res.occRecordsByMonth.categories.reverse();
    res.occRecordsByMonth.data.reverse();
    return res;
}

module.exports = {
    getPublicationsGlobal: getPublicationsGlobal,
    getDownloadsByMonth: getDownloadsByMonth,
    getSelectedCountryPublications: getSelectedCountryPublications,
    getCountryOccurencesByKingdom: getCountryOccurencesByKingdom,
    getCountsForSelectedtaxonomicGroups: getCountsForSelectedtaxonomicGroups,
    getMostRecentDatasets: getMostRecentDatasets,
    getMostRecentPublishers: getMostRecentPublishers,
    getTopDataContributors: getTopDataContributors,
    getTopDatasets: getTopDatasets,
    getOccurrenceFacetsForCountry: getOccurrenceFacetsForCountry,
    getProjectsWithCountryAsPartner: getProjectsWithCountryAsPartner,
    getPublishedOccRecords: getPublishedOccRecords,
    getAccessAndUsageData: getAccessAndUsageData,
    getRecordsPublishedByCountryDownloadedByMonth: getRecordsPublishedByCountryDownloadedByMonth

}
    ;
