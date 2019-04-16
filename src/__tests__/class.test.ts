import kls from './steps/class.step';

describe('basic', () => {
  test('should work', async () => {
    expect(kls.id).toEqual('class');
    expect(await kls.invoke('bro!')).toEqual('Hey, bro!');
  });

  test('should throw', async () => {
    expect(kls.invoke(0)).rejects.toEqual(Error('wrong input type'));
  });
});
