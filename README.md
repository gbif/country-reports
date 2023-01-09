# GBIF Activity Reports

Produces the activity reports shown on the GBIF country/area pages, for example [Andorra](https://www.gbif.org/sites/default/files/gbif_analytics/country/AD/GBIF_CountryReport_AD.pdf).

## Requirements

* Node version v8 installed (for development)
* [Docker installed](https://docs.docker.com/engine/installation/)

## Docker Build

1. Build the Docker image (see the [Dockerfile](./Dockerfile)):
   ```
   docker build --pull --tag gbif/country-reports .
   ```

2. Run the image
   ```
   docker run --env OWNER=$(id -u):$(id -g) --volume $PWD/reports/:/usr/src/app/reports --volume $PWD/cached-data/:/usr/src/app/cached-data --rm --name country-reports --interactive --tty gbif/country-reports
   ```

   Those arguments:

   * `--env` sets an environment variable, so ownership of the files can be controlled
   * `--volume $PWD/reports/:/usr/src/app/reports mounts the host directory `./reports` to `/usr/src/app/reports` within the container
   * `--rm` deletes the container when it exits
   * `--name` assigns a name to it
   * `--interactive` and `--tty` are so it receives input, so `^C` works to exit.

3. Run the reports
   ```
   ./runAll.sh
   ```

4. Stop the container
   Just exit. Type `^D` or `exit` from within, or `docker stop country-reports` from without.

5. Optionally (and assuming it works), publish it to our repository:
   ```
   docker tag gbif/country-reports docker.gbif.org/country-reports:2022-01
   docker push docker.gbif.org/country-reports:2022-01
   ```

## Docker usage (for annual reports)

The usual process when producing annual analytics reports is

1. Update URLs in `config.js`, for example to use UAT analytics results if these are not yet in production, and rebuild the Docker image.
2. Run the reports using the most recent Docker image, they should be output to the `reports/` directory.
   ```
   docker run --env OWNER=$(id -u):$(id -g) --volume $PWD/reports/:/usr/src/app/reports --volume $PWD/cached-data/:/usr/src/app/cached-data --rm --name country-reports --interactive --tty gbif/country-reports:latest
   ./runAll.sh
   ```
3. Rsync to the analytics server.
