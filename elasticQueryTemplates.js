
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
                            {'term': {'contentType': 'literature'}}
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
        query.query.constant_score.filter.bool.must.push({'term': {'year': optYear}});
    }
    return query;
}

module.exports = {
    projectsForCountry: projectsForCountry,
    peerReviewedLiterature: peerReviewedLiterature
};
