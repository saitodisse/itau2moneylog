#!/usr/bin/env node

/**/console.log('\n>>---------\n process.argv:\n', process.argv, '\n>>---------\n');/*-debug-*/

require('source-map-support').install();
var ConvertFile = require('../lib/src/periodo-especifico/convert-file');
var path = require('path');

var PASTE_DATA_PATH = 'paste-data.txt';
var convertFile = new ConvertFile({
  origin_file_path: path.join(__dirname, PASTE_DATA_PATH)
});
convertFile._readItauCopyPasteFileAsync()
.then(convertFile.removeAllCrap.bind(convertFile))
.then(function() {
  var result = convertFile.convertEachItauLine();
  console.log(result);
});
