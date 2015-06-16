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

  _getDate() {
    var date = regexTools.getGroupStringFromRegex(this.line, /^(\d\d\/\d\d)\s+(.*)$/gm, 1);
    var day = regexTools.getGroupStringFromRegex(date, /(\d\d)\/(\d\d)/gm, 1);
    var month = regexTools.getGroupStringFromRegex(date, /(\d\d)\/(\d\d)/gm, 2);
    this.date = `${this.year}-${month}-${day}`;
  }

  // https://regex101.com/r/dS6pQ0/5
  _getMoneyValue() {
    var MONEY_REGEX = /^.*?((([0-9]\d{0,2}(\.\d{3})*|([0-9]\d*))(\,\d{2}))\s*(-)?\s*)?\s+((([0-9]\d{0,2}(\.\d{3})*|([0-9]\d*))(\,\d{2}))\s*(-)?\s*)$/g;
    var match = regexTools.matchFirstRegex(this.line, MONEY_REGEX);

    if (!match || match.length === 0) {
      throw new Error(this.line + ' does not match ' + MONEY_REGEX);
    }

    var money, minus_signal;
    if (!match[2] && match[9]) {
      money = match[9].replace(/\./gm, '');
      minus_signal = match[14];

      this.money_value = '';
      if (minus_signal) {
        this.money_value = minus_signal;
      }
      this.money_value = this.money_value + money;
    } else if (match[2]) {
      money = match[2].replace(/\./gm, '');
      minus_signal = match[7];

      this.money_value = '';
      if (minus_signal) {
        this.money_value = minus_signal;
      }
      this.money_value = this.money_value + money;
    }
  }

  // https://regex101.com/r/dS6pQ0/4
  _getDescription() {
    var DESC_REGEX = /^(\d\d\/\d\d)\s+(.+?)((([0-9]\d{0,2}(\.\d{3})*|([0-9]\d*))(\,\d{2}))(-)?)/g;
    var match = regexTools.matchFirstRegex(this.line, DESC_REGEX);

    if (!match || match.length === 0) {
      throw new Error(this.line + ' does not match ' + DESC_REGEX);
    }

    var description = match[2].toLowerCase();
    description = description.replace(/\[.*?\]/g, '');
    description = description.replace(/(\s+)/g, ' ');
    description = regexTools.trim(description);
    this.description = description;
  }
};
