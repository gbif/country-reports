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

module.exports = {
    projectsForCountry: projectsForCountry,
};
