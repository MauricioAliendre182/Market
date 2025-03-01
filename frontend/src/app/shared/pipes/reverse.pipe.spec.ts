import { ReversePipe } from './reverse.pipe';

describe('ReversePipe', () => {
  let pipe: ReversePipe;

  beforeEach(() => {
    pipe = new ReversePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should reverse a string', () => {
    expect(pipe.transform('hello')).toBe('olleh');
    expect(pipe.transform('angular')).toBe('ralugna');
  });

  it('should handle empty strings', () => {
    expect(pipe.transform('')).toBe('');
  });

  it('should handle single character strings', () => {
    expect(pipe.transform('a')).toBe('a');
  });

  it('should handle strings with spaces', () => {
    expect(pipe.transform('hello world')).toBe('dlrow olleh');
  });

  it('should handle strings with special characters', () => {
    expect(pipe.transform('hello!')).toBe('!olleh');
    expect(pipe.transform('123-456')).toBe('654-321');
  });

  it('should handle palindromes', () => {
    expect(pipe.transform('radar')).toBe('radar');
    expect(pipe.transform('level')).toBe('level');
  });
});
