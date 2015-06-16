import h from '../spec_helper';
import ConvertFile from '../../src/periodo-especifico/convert-file';

describe('from Firefox: Periodo Especifico:', function () {
  describe('ConvertFile:', function() {

    var convertFile;

    before(function () {
      var FIXTURE_PATH = './fixtures/from-firefox/firefox-Junho - 2015.txt';
      convertFile = new ConvertFile({
        origin_file_path: FIXTURE_PATH
      });
      return convertFile._readItauCopyPasteFileAsync();
    });

    describe('file:', function () {
      it('should file content be on this._original_content', function () {
        h.expect(convertFile._original_content).not.been.undefined;
      });

      it('should convert each line', function () {
        convertFile.removeAllCrap();
        var result = convertFile.convertEachItauLine();
        h.expect(result).not.been.undefined;
      });
    });

    describe('crap:', function () {

      it('should get year before start extracting', function () {
        h.expect(convertFile._original_content).to.match(/Junho - 2015/);
        convertFile._getYear();
        h.expect(convertFile.year).to.eql('2015');
      });

      it('should extract only lines with data', function () {
        h.expect(convertFile._original_content).to.match(/Junho - 2015/);
        h.expect(convertFile._original_content).to.match(/Extrato anterior a 10 anos/);
        convertFile._extractDataLines();
        h.expect(convertFile.raw_data).to.not.match(/Junho - 2015/);
        h.expect(convertFile.raw_data).to.not.match(/Extrato anterior a 10 anos/);
      });

      it('should remove SALDO and SALDO INICIAL', function () {
        convertFile._extractDataLines();
        h.expect(convertFile.raw_data).to.match(/SALDO/);

        convertFile._removeSaldo();
        h.expect(convertFile.raw_data).to.not.match(/SALDO/);
      });

    });
  });
});
