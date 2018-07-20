# GBIF Activity Reports

Produces the activity reports shown on the GBIF country/area pages, for example [Andorra](http://www.gbif.org/sites/default/files/gbif_analytics/country/AD/GBIF_CountryReport_AD.pdf).

See [Usage instructions](Usage.md) for detailed usage.

The usual process when producing quarterly analytics reports is

1. Update URLs in `config.js`, for example to use UAT analytics results if these are not yet in production.
2. Run the reports, they should be output to the `reports/` directory.
3. Move these to an appropriate structure, for example `for i in GBIF_CountryReport_??.pdf; do c=${${i%%.pdf}##GBIF_CountryReport_}; mv -fb $i …/gbif_analytics/country/$c/; done`
4. Rsync to the analytics server.
