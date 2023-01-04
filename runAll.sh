#!/bin/bash
#

set -e

# Caching proxy
node node_modules/caching-proxy/start.js -d cached-data/ > /dev/null &

# Highcharts
highcharts-export-server --enableServer 1 --allowCodeExecution 1 &

sleep 1

# Country reports
node runAll.js

chown -R $OWNER reports cached-data
