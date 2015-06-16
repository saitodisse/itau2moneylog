import h from '../../spec_helper';
import ConvertItauLine from '../../../src/periodo-especifico/convert-itau-line';

describe('from Google Chrome: Periodo Especifico:', function () {
  describe('convert Itau line', function () {
    var convertItauLine;
    beforeEach(function () {
      convertItauLine = new ConvertItauLine({
        year: 2025,
        line: '05/01\t\t\tTBI 0000.0000-7nicolau\t\t1.000,00-',
      });
    });

    it('should get date from begining', function () {
      convertItauLine._getDate();
      h.expect(convertItauLine.date).to.eql('2025-01-05');
    });

    it('should get money value without SALDO', function () {
      convertItauLine.line = '05/01\t\t\tTBI 0000.0000-7nicolau\t\t1.000,00-';
      convertItauLine._getMoneyValue();
      h.expect(convertItauLine.money_value).to.eql('-1000,00');
    });

    it('should get money value with SALDO', function () {
      convertItauLine.line = '05/01\t\t\tTAR MULTICTA MENS 12/14\t\t49,00-\t\t1.454,68';
      convertItauLine._getMoneyValue();
      h.expect(convertItauLine.money_value).to.eql('-49,00');
    });

    it('should get description', function () {
      convertItauLine._getDescription();
      h.expect(convertItauLine.description).to.eql('tbi 0000.0000-7nicolau');
    });

    it('should convert to moneylog format 1', function () {
      convertItauLine = new ConvertItauLine({
        year: 2025,
        line: '05/01\t\t\tTBI 0000.0000-7nicolau\t\t1.000,00-',
      });
      h.expect(convertItauLine.convert()).to.eql('2025-01-05\t-1000,00\ttbi 0000.0000-7nicolau');
    });

    it('should convert to moneylog format 2', function () {
      convertItauLine = new ConvertItauLine({
        year: 2025,
        line: '01/08\t\t\tIOF\t\t0,46-',
      });
      h.expect(convertItauLine.convert()).to.eql('2025-08-01\t-0,46\tiof');
    });

    it('should convert to moneylog format 3', function () {
      convertItauLine = new ConvertItauLine({
        year: 2025,
        line: '02/06\t\t\tIOF\t\t0,96-\t\t1.561,98',
      });
      h.expect(convertItauLine.convert()).to.eql('2025-06-02\t-0,96\tiof');
    });

  });
});
