import { VowelsByNumbersPipe } from './vowels-by-numbers.pipe';

describe('VowelsByNumbersPipe', () => {
  it('create an instance', () => {
    const pipe = new VowelsByNumbersPipe();
    expect(pipe).toBeTruthy();
  });
});
