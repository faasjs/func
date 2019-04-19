import basic from './functions/demo.func';

describe('basic func', () => {
  test('should work', async () => {
    expect(basic.name).toEqual('func');
    expect(await basic.invoke('bro!')).toEqual('Hey, bro!');
  });

  test('should throw', async () => {
    expect(basic.invoke(0)).rejects.toEqual(Error('Who are you?'));
  });
});
