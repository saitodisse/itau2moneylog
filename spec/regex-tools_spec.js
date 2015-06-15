import h from './spec_helper';
import regexTools from '../src/regex-tools';

describe('RegexTools:', function() {

  it('should remove a line from text', function () {
    var text_array = [
      'abc',
      '123',
      '456',
    ];

    var result = regexTools.removeLine(text_array.join('\n'), 4, 7);
    h.expect(result.split('\n')).to.eql(
      [
        'abc',
        '456',
      ]
    );
  });

  it('should remove all matches from text', function () {
    var text_array = [
      '890',
      'abc0',
      '123',
      'abc1',
      '456',
      'abc2',
      '789',
      'abc3',
      '012',
      'abc4',
      '345',
    ];

    var result = regexTools.removeAllLinesByRegex(text_array.join('\n'), /^\d\d\d$/gm);
    h.expect(result.split('\n')).to.eql(
      [
        'abc0',
        'abc1',
        'abc2',
        'abc3',
        'abc4',
      ]
    );
  });

});
