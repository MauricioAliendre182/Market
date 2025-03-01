import { VowelsByNumbersPipe } from './vowels-by-numbers.pipe';

describe('VowelsByNumbersPipe', () => {
  let pipe: VowelsByNumbersPipe;

  beforeEach(() => {
    pipe = new VowelsByNumbersPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should replace vowel "a" with number "1"', () => {
    expect(pipe.transform('apple')).toBe('1ppl2');
    expect(pipe.transform('banana')).toBe('b1n1n1');
  });

  it('should replace vowel "e" with number "2"', () => {
    expect(pipe.transform('hello')).toBe('h2ll4');
    expect(pipe.transform('test')).toBe('t2st');
  });

  it('should replace vowel "i" with number "3"', () => {
    expect(pipe.transform('hi')).toBe('h3');
    expect(pipe.transform('pizza')).toBe('p3zz1');
  });

  it('should replace vowel "o" with number "4"', () => {
    expect(pipe.transform('hello')).toBe('h2ll4');
    expect(pipe.transform('world')).toBe('w4rld');
  });

  it('should replace vowel "u" with number "5"', () => {
    expect(pipe.transform('fun')).toBe('f5n');
    expect(pipe.transform('ubuntu')).toBe('5b5nt5');
  });

  it('should handle empty strings', () => {
    expect(pipe.transform('')).toBe('');
  });

  it('should handle strings with no vowels', () => {
    expect(pipe.transform('xyz')).toBe('xyz');
    expect(pipe.transform('dry')).toBe('dry');
  });

  it('should handle strings with all vowels', () => {
    expect(pipe.transform('aeiou')).toBe('12345');
  });

  it('should handle mixed case vowels', () => {
    expect(pipe.transform('Apple')).toBe('1ppl2');
    expect(pipe.transform('HELLO')).toBe('H2LL4');
  });

  it('should handle strings with numbers and special characters', () => {
    expect(pipe.transform('hello123')).toBe('h2ll4123');
    expect(pipe.transform('test@example.com')).toBe('t2st@2x1mpl2.c4m');
  });

  it('should handle complex sentences', () => {
    expect(pipe.transform('The quick brown fox jumps over the lazy dog'))
      .toBe('Th2 q53ck br4wn f4x j5mps 4v2r th2 l1zy d4g');
  });
});
