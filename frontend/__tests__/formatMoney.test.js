import formatMoney from '../lib/formatMoney';

describe('format money function', () => {
  it('works with fractional dollars', () => {
    expect(formatMoney(1)).toEqual('$0.01');
    expect(formatMoney(10)).toEqual('$0.10');
    expect(formatMoney(40)).toEqual('$0.40');
  });

  it('removes cents when input is a whole dollar value', () => {
    expect(formatMoney(100)).toEqual('$1');
    expect(formatMoney(5000)).toEqual('$50');
    expect(formatMoney(500000)).toEqual('$5,000');
  });

  it('it works with whole and fractional dollars', () => {
    expect(formatMoney(140)).toEqual('$1.40');
    expect(formatMoney(5012)).toEqual('$50.12');
    expect(formatMoney(110)).toEqual('$1.10');
    expect(formatMoney(101)).toEqual('$1.01');
  });
});
