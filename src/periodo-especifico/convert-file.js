import fsAsync from 'file-async';
import regexTools from '../regex-tools';
import ConvertItauLine from './convert-itau-line';
import R from 'ramda';

/// origin_file_path
module.exports = class ConvertFile {
  constructor(opts = {}) {
    Object.keys(opts).forEach((key) => {
      if (opts.hasOwnProperty(key)) {
        this[key] = opts[key];
      }
    });
  }

  removeAllCrap() {
    this._extractDataLines();
    this._removeSaldo();
  }

  convertEachItauLine() {
    var lines = this.raw_data.split('\n');

    this._getYear();
    var year = this.year;

    var transformItauLine = function(acc, value) {
      if (value.replace('/\s+/gm', '') !== '') {
        var convertItauLine = new ConvertItauLine({
          year: year,
          line: value,
        });
        var converted = convertItauLine.convert();
        return acc + converted + '\n';
      }
      return acc;
    };

    var result = R.reduce(transformItauLine, '', lines);
    return result;
  }

  _readItauCopyPasteFileAsync() {
    return fsAsync.readFile(this.origin_file_path).then(function(content) {
      this._original_content = content.toString();
    }.bind(this));
  }

  _getYear() {
    var match = regexTools.matchFirstRegex(this._original_content, /^[A-Za-zÀ-ú]+ - (\d{4})$/gm);
    this.year = match[1];
  }

  // https://regex101.com/r/vT6cY4/1
  _extractDataLines() {
    this.raw_data = regexTools.extractLines(this._original_content, /^\d\d\/\d\d\s+.*$/gm);
  }

  _removeSaldo() {
    this.raw_data = this.raw_data.replace(/^.*\s+SALDO\s*?(INICIAL)?\s+.*$\n/gm, '');
  }

};
