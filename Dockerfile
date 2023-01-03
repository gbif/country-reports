FROM node:8

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Setting to use the GBIF NPM registry mirror.
COPY .docker-npmrc /root/.npmrc

# Install Highcharts server
ENV HIGHCHARTS_USE_STYLED=NO
ENV HIGHCHARTS_VERSION=8.2.2
ENV ACCEPT_HIGHCHARTS_LICENSE=YES
# Colors version needed temporarily due to https://github.com/highcharts/node-export-server/issues/318
RUN npm install -g colors@1.4.0 highcharts-export-server@2.0.28 --registry http://repository.gbif.org/content/repositories/npmjs/ --unsafe-perm

# Install app and dependencies
COPY . /usr/src/app
RUN npm install --registry http://repository.gbif.org/content/repositories/npmjs/ --save

# This ought to be run automatically.
# highcharts-export-server --enableServer 1 --allowCodeExecution 1
COPY .docker-bash_history /root/.bash_history

CMD [ "bash" ]
