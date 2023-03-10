function add(a, b) {
  const aNum = parseInt(a);
  const bNum = parseInt(b);
  return aNum + bNum;
}

describe('Same test 101', () => {
  it('works as expected', () => {
    // run expect statements to see if test passes
    expect(1).toEqual(1);
    const age = 100;
    expect(age).toEqual(100);
  });

  it('it runs the add function properly', () => {
    expect(add(1, 3)).toBeGreaterThanOrEqual(3);
  });

  it('it runs the add function properly', () => {
    expect(add('1', '3')).toBe(4);
  });
});
