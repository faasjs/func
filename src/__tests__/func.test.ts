import basic from './functions/func.func';

describe('basic', () => {
  test('should work', async () => {
    expect(basic.name).toEqual('func');
    expect(await basic.invoke('bro!')).toEqual('Hey, bro!');
  });

  test('should throw', async () => {
    expect(basic.invoke(0)).rejects.toEqual(Error('wrong input type'));
  });
});
