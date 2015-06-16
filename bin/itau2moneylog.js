#!/usr/bin/env node
require('source-map-support').install();

var path = require('path');
var fs = require('fs');

var docopt = require('docopt').docopt;

var doc = fs.readFileSync(path.join(__dirname, 'usage.txt')).toString();
var result = docopt(doc, {
    argv: process.argv.slice(2),
    help: true,
    version: '0.1.0'
  });

var ConvertItauCli = require('../lib/src/cli/itau2moneylog');
var cli = new ConvertItauCli({
  paste_data_path: result['<paste_file_path>']
});

cli.convert();
