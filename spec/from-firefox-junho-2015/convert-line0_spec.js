import h from '../spec_helper';
import ConvertItauLine from '../../src/periodo-especifico/convert-itau-line';
import ConvertFile from '../../src/periodo-especifico/convert-file';

describe('from Firefox: Periodo Especifico:', function () {
  describe('convert Itau line [0]:', function () {

    var convertFile, convertItauLine, lines;

    before(function () {
      var FIXTURE_PATH = './fixtures/from-firefox/firefox-Junho - 2015.txt';
      convertFile = new ConvertFile({
        origin_file_path: FIXTURE_PATH
      });
      return convertFile._readItauCopyPasteFileAsync().then(function() {
        // convert file first
        convertFile.removeAllCrap();
        lines = convertFile.raw_data.split('\n');
      });
    });

    beforeEach(function () {
      convertItauLine = new ConvertItauLine({
        year: '2015',
        line: lines[0],
      });
    });

    it('should get date from begining', function () {
      convertItauLine._getDate();
      h.expect(convertItauLine.date).to.eql('2015-06-01');
    });

    it('should get money value', function () {
      convertItauLine._getMoneyValue();
      h.expect(convertItauLine.money_value).to.eql('-123,46');
    });

    it('should get description', function () {
      convertItauLine._getDescription();
      h.expect(convertItauLine.description).to.eql('d int pag tit banco 033');
    });

  });
});
