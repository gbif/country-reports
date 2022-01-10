FROM node:8

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Setting to use the GBIF NPM registry mirror, which doesn't work.
# The --registry option below also seems not to work.
COPY .docker-npmrc /root/.npmrc

# Install Highcharts server
ENV HIGHCHARTS_USE_STYLED=NO
ENV HIGHCHARTS_VERSION=latest
ENV ACCEPT_HIGHCHARTS_LICENSE=YES
RUN npm install highcharts-export-server -g --registry http://repository.gbif.org/content/repositories/npmjs/ --unsafe-perm

# Install app and dependencies
COPY . /usr/src/app
RUN npm install --registry http://repository.gbif.org/content/repositories/npmjs/ --save

# This ought to be run automatically.
# highcharts-export-server --enableServer 1 --allowCodeExecution 1

CMD [ "bash" ]
