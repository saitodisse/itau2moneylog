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
    this._whithout_crap = this._original_content;
    this._whithout_crap = this._removeTextBeforeMounthYear(this._whithout_crap);
    this._whithout_crap = this._removeTextAfterData(this._whithout_crap);
    this._whithout_crap = this._removeHeader(this._whithout_crap);
    this._whithout_crap = this._removeSaldoAnterior(this._whithout_crap);
    this._whithout_crap = this._removeSaldoDoDia(this._whithout_crap);
  }

  convertEachItauLine() {
    var lines = this._whithout_crap.split('\n');

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

  // https://regex101.com/r/lH2hT0/1
  _removeTextBeforeMounthYear(text) {
    var match = regexTools.matchFirstRegex(text, /^\w+ - (\d{4})$/gm);
    var where_was_found = match.index;
    var after_that_found = where_was_found + match[0].length;
    this.year = match[1];
    return match.input.substring(after_that_found, match.input.length);
  }

  _removeTextAfterData(text) {
    var match = regexTools.matchFirstRegex(text, /^< Mês Anterior\s+Próximo Mês/gm);
    var where_was_found = match.index;
    return match.input.substring(0, where_was_found);
  }

  _removeHeader(text) {
    var match = regexTools.matchFirstRegex(text, /^Data\s+Lançamento.*$/gm);
    var where_was_found = match.index;
    var after_that_found = where_was_found + match[0].length;
    return regexTools.removeLine(text, where_was_found, after_that_found);
  }

  _removeSaldoAnterior(text) {
    var match = regexTools.matchFirstRegex(text, /^.*\s+SALDO ANTERIOR\s+.*$/gm);
    var where_was_found = match.index;
    var after_that_found = where_was_found + match[0].length;
    return regexTools.removeLine(text, where_was_found, after_that_found);
  }

  _removeSaldoDoDia(text) {
    return regexTools.removeAllLinesByRegex(text, /^.*\s+SALDO DO DIA\s+.*$/gm);
  }

};
