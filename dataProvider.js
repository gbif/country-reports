const mockdata = require('./mockDataProvider');
const HIGHCHARTS_SERVER_URL = require('./config').HIGHCHARTS_SERVER_URL;
const _ = require('lodash');
const rp = require('request-promise');
const KINGDOMS = require('./enums').KINGDOMS;
const SELECTED_TAXONOMIC_GROUPS = require('./enums').SELECTED_TAXONOMIC_GROUPS;
const API_BASE_URL = require('./config').API_BASE_URL;
const PORTAL_API_BASE_URL = require('./config').PORTAL_API_BASE_URL;
const CONTENTFUL_SEARCH_URL = require('./config').CONTENTFUL_SEARCH_URL;

function getPublicationsGlobal( yearsBack, year) {
    let promises = [];
    let result = {};
    let years = [];
    for (let i = yearsBack; i >= 0; i--) {
        years.push(year - i);
    }
    _.each(years, function(y) {
        promises.push(rp({method: 'GET', uri: PORTAL_API_BASE_URL + 'resource/search?contentType=literature&year=' + y, json: true})
            .then(function(res) {
                result[y] = res.count;
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
        return rp({method: 'POST', uri: HIGHCHARTS_SERVER_URL, body: {
             options: chartData,
             type: 'png',
             scale: 4,
             b64: true
        },
        json: true})
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

function occDownloadsByMonth(country, year) {
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
            'categories': mockdata.getAccessAndUsageData(year).occRecordByMonth.categories
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
            data: mockdata.getAccessAndUsageData(year).occRecordByMonth.data
        }],
        credits: {
            enabled: false
        },
        legend: {
            enabled: false
        }
    };

    return rp({method: 'POST', uri: HIGHCHARTS_SERVER_URL, body: {
        options: options,
        type: 'png',
        scale: 4,
        b64: true
   },
   json: true})
   .then(function(res) {
       return res;
   }).catch(function(err) {
       console.log(err);
   });
}

function getSelectedCountryPublications(countryCode, year) {
    let promises = [
        rp({method: 'GET', uri: PORTAL_API_BASE_URL + 'resource/search?contentType=literature&relevance=GBIF_USED&peerReview=true&year=' + year + '&countriesOfResearcher=' + countryCode, json: true})
            .then(function(res) {
            return res.count;
        })
            .catch(function(err) {
            console.log(err);
        }),
        rp({method: 'GET', uri: PORTAL_API_BASE_URL + 'resource/search?contentType=literature&relevance=GBIF_USED&peerReview=true&countriesOfResearcher=' + countryCode, json: true})
            .then(function(res) {
                return {
                    count: res.count,
                    latest: res.results.splice(0, 5)
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
    // http://api.gbif.org/v1/occurrence/search?country=DK&facet=kingdomKey&limit=0
    return rp({method: 'GET', uri: API_BASE_URL + 'occurrence/search?country=' + countryCode + '&facet=kingdomKey&limit=0&year=*,' + year, json: true})
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
        let body = {
            'query': {
              'bool': {
                'should': [
                  {
                    'nested': {
                      'path': 'additionalPartners',
                      'query': {
                        'bool': {
                          'must': [
                            {
                              'match': {
                                'additionalPartners.country': countryCode
                              }
                            }
                          ]
                        }
                      }
                    }
                  },
                  {
                    'nested': {
                      'path': 'leadPartner',
                      'query': {
                        'bool': {
                          'must': [
                            {
                              'match': {
                                'leadPartner.country': countryCode
                              }
                            }
                          ]
                        }
                      }
                    }
                  }
                ]
              }
            }
          };
    return rp({method: 'POST', uri: CONTENTFUL_SEARCH_URL + 'project/_search', body: body, json: true})
        .then(function(res) {
                return (res.hits && res.hits.hits && res.hits.hits.length > 0) ? res.hits.hits.map(function(h) {
                    return {
                        _id: h._id,
                        title: h._source.title['en-GB'],
                        summary: h._source.summary['en-GB'],
                        isLead: (h._source.leadPartner && h._source.leadPartner.country === countryCode)
                    };
                }) : [];
        })
        .catch(function(err) {
            console.log(err);
        });
}


module.exports = {
    getPublicationsGlobal: getPublicationsGlobal,
    occDownloadsByMonth: occDownloadsByMonth,
    getSelectedCountryPublications: getSelectedCountryPublications,
    getCountryOccurencesByKingdom: getCountryOccurencesByKingdom,
    getCountsForSelectedtaxonomicGroups: getCountsForSelectedtaxonomicGroups,
    getMostRecentDatasets: getMostRecentDatasets,
    getMostRecentPublishers: getMostRecentPublishers,
    getTopDataContributors: getTopDataContributors,
    getTopDatasets: getTopDatasets,
    getOccurrenceFacetsForCountry: getOccurrenceFacetsForCountry,
    getProjectsWithCountryAsPartner: getProjectsWithCountryAsPartner

}
;
