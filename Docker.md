# Docker experiment

See the [Dockerfile](./Dockerfile)

To run the reports using Docker:

1. [Install Docker](https://docs.docker.com/engine/installation/)

2. Build the Docker image

```
docker build --tag gbif/country-reports .
```

3. Run the image

```
docker run --volume $PWD/reports/:/usr/src/app/reports --rm --name country-reports --interactive --tty gbif/country-reports
```

Those arguments:

* `--volume $PWD/reports/:/usr/src/app/reports mounts the host directory `./reports` to `/usr/src/app/reports` within the container
* `--rm` deletes the container when it exits
* `--name` assigns a name to it
* `--interactive` and `--tty` are so it receives input, so `^C` works to exit.

4. Run the reports
```
$ highcharts-export-server --enableServer 1 & sleep 1 && node runAll.js
```

5. To stop the container

Just exit. Type `^D` or `exit` from within, or `docker stop country-reports` from without.

## Not investigated

* The GBIF repository isn't used by `npm install`.
