import h from '../spec_helper';
import ConvertFile from '../../src/periodo-especifico/convert-file';

describe('Periodo Especifico:', function () {
  describe('ConvertFile:', function() {

    var convertFile;

    before(function () {
      var FIXTURE_PATH = './fixtures/itau-periodo-especifico-2015.txt';
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

        // checking results
        var lines = result.split('\n');
        h.expect(lines[0]).to.match(/^2025-01-02\t-900,00\tsaque 24h 00000$/);
      });
    });

    describe('crap:', function () {

      it('should get year before start extracting', function () {
        h.expect(convertFile._original_content).to.match(/Maio - 2025/);
        convertFile._getYear();
        h.expect(convertFile.year).to.eql('2025');
      });

      it('should extract only lines with data', function () {
        h.expect(convertFile._original_content).to.match(/Maio - 2025/);
        h.expect(convertFile._original_content).to.match(/Digite o valor desejado/);
        convertFile._extractDataLines();
        h.expect(convertFile.raw_data).to.not.match(/Maio - 2025/);
        h.expect(convertFile.raw_data).to.not.match(/Digite o valor desejado/);
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
