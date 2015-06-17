import { CliController } from 'cli-router';
import ConvertFilePeriodo from '../../periodo-especifico/convert-file';

class Convert extends CliController {
  index(params) {
    var convertFile = new ConvertFilePeriodo({
      origin_file_path: params.paste_file_path
    });
    return convertFile._readItauCopyPasteFileAsync()
     .then(convertFile.removeAllCrap.bind(convertFile))
     .then(convertFile.convertEachItauLine.bind(convertFile));
  }
}

module.exports = Convert;
