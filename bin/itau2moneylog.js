#!/usr/bin/env node
require('source-map-support').install();

var path = require('path');

var ConvertItauCli = require('../lib/src/cli/itau2moneylog');
var cli = new ConvertItauCli();

cli.createCli({ path: path.join(__dirname, 'usage.txt') });
