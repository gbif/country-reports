const year = new Date().getFullYear();
const CACHING_PROXY_PREFIX = 'http://localhost:8092/' + year + '-01-01/';

module.exports = {

    // Direct to the Apache server, to avoid any caches.
    ANALYTICS_COUNTRY_BASEURL: 'http://analytics-files.gbif-uat.org/country/',
    ANALYTICS_GLOBAL_BASEURL: 'http://analytics-files.gbif-uat.org/global/',

    API_BASE_URL: CACHING_PROXY_PREFIX + 'http/api.gbif.org/v1/',
    API_BASE_URL_STATS: CACHING_PROXY_PREFIX + 'http/api.gbif.org/v1/',

    HIGHCHARTS_SERVER_URL: 'http://127.0.0.1:7801', // 'http://export.highcharts.com/'
    CONTENTFUL_SEARCH_URL: CACHING_PROXY_PREFIX + 'http/cms-search.gbif.org:9200/'
};
