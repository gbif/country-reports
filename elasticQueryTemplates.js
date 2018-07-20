
function projectsForCountry(countryCode) {
    return {
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
              },
              {
                'term': {'contractCountry': countryCode}
              }
            ]
          }
        }
      };
}

function peerReviewedLiterature(optYear, optCountryCode) {
    let query = {
        'query': {
            'constant_score': {
                'filter': {
                     'bool': {
                        'must': [
                            {'term': {'peerReview': true}},
                            {'term': {'contentType': 'literature'}},
                            {'term': {'relevance': 'GBIF_USED'}}
                        ]
                    }
                }
            }
        },
        'sort': [
            {'year': {'order': 'desc'}}, {'month': {'order': 'desc'}}, {'day': {'order': 'desc'}}
             ]
    };

    if (typeof optCountryCode !== 'undefined') {
        query.query.constant_score.filter.bool.must.push({'term': {'countriesOfResearcher': optCountryCode}});
    }
    if (typeof optYear !== 'undefined') {
        //query.query.constant_score.filter.bool.must.push({'term': {'year': optYear}});
        //query.query.constant_score.filter.bool.must.push({'term': {'year': ['2017','2018']}});
        query.query.constant_score.filter.bool.should = [
            { "term": { "year": 2018 } },
            { "bool": {
                "must": [
                    { "term": { "year": 2017 } },
                    { "range": { "month": { "gte": 7, "lte": 12 } } }
                ]
            }
            }
        ];
    }
    return query;
}

module.exports = {
    projectsForCountry: projectsForCountry,
    peerReviewedLiterature: peerReviewedLiterature
};
