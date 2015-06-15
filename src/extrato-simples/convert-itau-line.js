import regexTools from '../regex-tools';

/// origin_file_path
module.exports = class ConvertItauLine {
  constructor(opts = {}) {
    Object.keys(opts).forEach((key) => {
      if (opts.hasOwnProperty(key)) {
        this[key] = opts[key];
      }
    });
  }

  convert() {
    var line = this.line;
    this._getDate(line);
    this._getMoneyValue(line);
    this._getDescription(line);

    return `${this.date}\t${this.money_value}\t${this.description}`;
  }

  _getDate(str) {
    var date = regexTools.getGroupStringFromRegex(str, /^(\d\d\/\d\d)\s+(.*)$/gm, 1);
    var day = regexTools.getGroupStringFromRegex(date, /(\d\d)\/(\d\d)/gm, 1);
    var month = regexTools.getGroupStringFromRegex(date, /(\d\d)\/(\d\d)/gm, 2);
    this.date = `${this.year}-${month}-${day}`;
  }

  _removeDate(str) {
    return str.replace(/^(\d\d\/\d\d\s+)?(.*)$/gm, '$2');
  }

  _getMoneyValue(str) {
    var MONEY_REGEX = /(([1-9]\d{0,2}(\.\d{3})*|([1-9]\d*))(\,\d{2})?)(\s+(-))?$/gm;
    var match = regexTools.matchFirstRegex(str, MONEY_REGEX);

    if (!match || match.length === 0) {
      throw new Error(str + ' does not match ' + MONEY_REGEX);
    }

    var money = match[1].replace(/\./gm, '');
    var minus_signal = match[7];

    this.money_value = '';
    if (minus_signal) {
      this.money_value = minus_signal;
    }
    this.money_value = this.money_value + money;
  }

  _removeMoneyValue(str) {
    var MONEY_REGEX = /^(.*?)(\s+([1-9]\d{0,2}(\.\d{3})*|([1-9]\d*))(\,\d{2})?)(\s+(-))?$/gm;
    return str.replace(MONEY_REGEX, '$1');
  }

  _getDescription() {
    var description = this.line;
    description = this._removeDate(description);
    description = this._removeMoneyValue(description);
    description = description.toLowerCase();
    description = description.replace(/\[.*?\]/g, '');
    description = description.replace(/(\s+)/g, ' ');
    description = regexTools.trim(description);
    this.description = description;
  }
};
