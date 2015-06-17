import h from '../../spec_helper';
import ConvertItauLine from '../../../src/extrato-simples/convert-itau-line';

describe('from Google Chrome: Extrato Simples:', function () {

  describe('convert Itau line', function () {
    var convertItauLine;
    beforeEach(function () {
      convertItauLine = new ConvertItauLine({
        year: 2025,
        line: '22/05 \t\t\tCARTAO PERSONNALITE       [Visualizar cheque compensado.] \t7788 \t2.544,02 \t-',
      });
    });

    it('should get date from begining', function () {
      // https://regex101.com/r/iS1iL1/1
      convertItauLine._getDate(convertItauLine.line);
      h.expect(convertItauLine.date).to.eql('2025-05-22');
    });

    it('should remove date from line', function () {
      h.expect(convertItauLine._removeDate(convertItauLine.line))
      .to.eql('CARTAO PERSONNALITE       [Visualizar cheque compensado.] \t7788 \t2.544,02 \t-');
    });

    it('should get money value', function () {
      // https://regex101.com/r/iS1iL1/2
      convertItauLine._getMoneyValue(convertItauLine.line);
      h.expect(convertItauLine.money_value).to.eql('-2544,02');
    });

    it('should remove money_value from line', function () {
      h.expect(convertItauLine._removeMoneyValue(convertItauLine.line))
      .to.eql('22/05 \t\t\tCARTAO PERSONNALITE       [Visualizar cheque compensado.] \t7788');
    });

    it('should get description', function () {
      convertItauLine._getDescription();
      h.expect(convertItauLine.description).to.eql('cartao personnalite 7788');
    });

    it('should convert to moneylog format 1', function () {
      convertItauLine = new ConvertItauLine({
        year: 2025,
        line: '22/05 \t\t\tCARTAO PERSONNALITE       [Visualizar cheque compensado.] \t7788 \t2.544,02 \t-',
      });
      h.expect(convertItauLine.convert()).to.eql('2025-05-22\t-2544,02\tcartao personnalite 7788');
    });

    it('should convert to moneylog format 2', function () {
      convertItauLine = new ConvertItauLine({
        year: 2025,
        line: '04/05 \t\t\tINT TELEMAR OI 00000       [Visualizar cheque compensado.] \t\t290,28 \t-',
      });
      h.expect(convertItauLine.convert()).to.eql('2025-05-04\t-290,28\tint telemar oi 00000');
    });

    it('should convert to moneylog format 3', function () {
      convertItauLine = new ConvertItauLine({
        year: 2025,
        line: '28/05 \t\t\tTBI 000.000000/000       [Visualizar cheque compensado.] \t\t560,00',
      });
      h.expect(convertItauLine.convert()).to.eql('2025-05-28\t560,00\ttbi 000.000000/000');
    });

    it('should convert to moneylog format 4', function () {
      convertItauLine = new ConvertItauLine({
        year: 2025,
        line: ['20/05 \t D \t\tINT PAG TIT BANCO 0000   [Débito a compensar]',
               '     [Visualizar cheque compensado.] \t\t456,27 \t-'].join(''),
      });
      h.expect(convertItauLine.convert()).to.eql('2025-05-20\t-456,27\td int pag tit banco 0000');
    });

  });
});
