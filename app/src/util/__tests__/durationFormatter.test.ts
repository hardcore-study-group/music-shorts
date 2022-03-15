import durationFormatter from '../durationFormatter';

describe('util/durationFormatter', () => {
  it('5000 -> 0:05', () => {
    const result = durationFormatter(5000);
    expect(result).toBe('0:05');
  });
  it('50000 -> 0:50', () => {
    const result = durationFormatter(50000);
    expect(result).toBe('0:50');
  });
  it('51000 -> 0:51', () => {
    const result = durationFormatter(51000);
    expect(result).toBe('0:51');
  });
  it('60000 -> 1:00', () => {
    const result = durationFormatter(60000);
    expect(result).toBe('1:00');
  });
  it('65000 -> 1:05', () => {
    const result = durationFormatter(65000);
    expect(result).toBe('1:05');
  });
  it('110000 -> 1:50', () => {
    const result = durationFormatter(110000);
    expect(result).toBe('1:50');
  });
});
