import R from 'ramda';

//////////////////////////
// regex tools
//////////////////////////
module.exports = {
  removeLine(text, from, to) {
    var first_part = text.substring(0, from);
    if (to !== text.length) {
      return first_part + text.substring(to + 1, text.length);
    } else {
      return first_part.substring(0, first_part.length - 1);
    }
  },

  removeAllLinesByRegex(text, regex) {
    var matches = this.matchAllRegex(text, regex);
    return this.removeAllLines(text, matches);
  },

  removeAllLines(text, maches) {
    return R.reduceRight(function(acc, match) {
      var from = match.index;
      var to = from + match[0].length;
      return this.removeLine(acc, from, to);
    }.bind(this), text, maches);
  },

  matchFirstRegex(str, re) {
    var m;
    while ((m = re.exec(str)) !== null) {
      if (m.index === re.lastIndex) {
        re.lastIndex++;
      }
      // View your result using the m-variable.
      // eg m[0] etc.
      return m;
    }
  },

  getGroupStringFromRegex(str, re, groupIndex) {
    var match = this.matchFirstRegex(str, re);
    return match[groupIndex];
  },

  matchAllRegex(str, re) {
    var m;
    var all_matches = [];
    while ((m = re.exec(str)) !== null) {
      if (m.index === re.lastIndex) {
        re.lastIndex++;
      }
      all_matches.push(m);
    }
    return all_matches;
  },

  extractLines(str, re) {
    var matches = this.matchAllRegex(str, re);
    var extractLines = function (acc, match) {
      return acc + match[0] + '\n';
    };
    return R.reduce(extractLines, '', matches);
  },

  trim(str) {
    return str.replace(/^\s+|\s+$/g, '');
  },

  ltrim(str) {
    return str.replace(/^\s+/, '');
  },

  rtrim(str) {
    return str.replace(/\s+$/, '');
  },

  fulltrim(str) {
    return str.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g, '').replace(/\s+/g, ' ');
  },

};
