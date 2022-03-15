import artistFormatter from '../artistFormatter';

describe('util/artistFormatter', () => {
  it('[one, two] -> one, two', () => {
    const result = artistFormatter(['one', 'two']);
    expect(result).toBe('one, two');
  });
  it('one -> one', () => {
    const result = artistFormatter(['one']);
    expect(result).toBe('one');
  });
});
