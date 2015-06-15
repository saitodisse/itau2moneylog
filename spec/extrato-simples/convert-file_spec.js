import h from '../spec_helper';
import ConvertFile from '../../src/extrato-simples/convert-file';

describe('Extrato Simples:', function () {

  describe('ConvertFile:', function() {

    var convertFile;

    before(function () {
      var FIXTURE_PATH = './fixtures/itau-2015-06-12.txt';
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
        h.expect(lines[0]).to.match(/^2025-05-04\t-290,28\tint telemar oi 00000$/);
        h.expect(lines[lines.length - 2]).to.match(/^2025-05-28\t560,00\ttbi 000.000000\/000$/);
      });
    });

    describe('crap:', function () {
      it('should remove before "Maio - 2025"', function () {
        h.expect(convertFile._original_content).to.match(/Maio - 2025/);
        var new_text = convertFile._removeTextBeforeMounthYear(convertFile._original_content);
        h.expect(new_text).to.not.match(/Maio - 2025/);
      });

      it('should remove after "Mês Anterior Próximo Mês"', function () {
        h.expect(convertFile._original_content).to.match(/Mês Anterior/);
        var new_text = convertFile._removeTextAfterData(convertFile._original_content);
        h.expect(new_text).to.not.match(/Mês Anterior/);
      });

      it('should remove header', function () {
        h.expect(convertFile._original_content).to.match(/\s+Lançamento\s+/);
        var new_text = convertFile._removeHeader(convertFile._original_content);
        h.expect(new_text).to.not.match(/\s+Lançamento\s+/);
      });

      it('should remove SALDO ANTERIOR', function () {
        h.expect(convertFile._original_content).to.match(/SALDO ANTERIOR/);
        var new_text = convertFile._removeSaldoAnterior(convertFile._original_content);
        h.expect(new_text).to.not.match(/SALDO ANTERIOR/);
      });

      it('should remove SALDO DO DIA', function () {
        h.expect(convertFile._original_content).to.match(/\s+SALDO DO DIA\s+/);
        var new_text = convertFile._removeSaldoDoDia(convertFile._original_content);
        h.expect(new_text).to.not.match(/\s+SALDO DO DIA\s+/);
      });

      it('should remove all crap', function () {
        // all text
        h.expect(convertFile._original_content).to.match(/Maio - 2025/);
        h.expect(convertFile._original_content).to.match(/Mês Anterior/);
        h.expect(convertFile._original_content).to.match(/\s+Lançamento\s+/);
        h.expect(convertFile._original_content).to.match(/SALDO ANTERIOR/);
        h.expect(convertFile._original_content).to.match(/\s+SALDO DO DIA\s+/);

        convertFile.removeAllCrap();

        // without crap
        h.expect(convertFile._whithout_crap).to.not.match(/Maio - 2025/);
        h.expect(convertFile._whithout_crap).to.not.match(/Mês Anterior/);
        h.expect(convertFile._whithout_crap).to.not.match(/\s+Lançamento\s+/);
        h.expect(convertFile._whithout_crap).to.not.match(/SALDO ANTERIOR/);
        h.expect(convertFile._whithout_crap).to.not.match(/\s+SALDO DO DIA\s+/);
      });
    });
  });
});
