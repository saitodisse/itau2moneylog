import ConvertFilePeriodo from '../periodo-especifico/convert-file';

/// origin_file_path
module.exports = class ConvertItauCli {
  constructor(opts = {}) {
    Object.keys(opts).forEach((key) => {
      if (opts.hasOwnProperty(key)) {
        this[key] = opts[key];
      }
    });
  }

  convert() {
    var convertFile = new ConvertFilePeriodo({
      origin_file_path: this.paste_data_path
    });
    convertFile._readItauCopyPasteFileAsync()
    .then(convertFile.removeAllCrap.bind(convertFile))
    .then(function() {
      var result = convertFile.convertEachItauLine();
      console.log(result);
    });
  }
};
