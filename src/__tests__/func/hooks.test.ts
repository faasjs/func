import func from '../../index';

describe('func hooks', function () {
  test.each([
    'beforeBuild',
    'onBuild',
    'afterBuild',
    'beforeDeploy',
    'onDeploy',
    'afterDeploy',
    'afterMount',
    'beforeInvoke',
    'afterInvoke',
  ])('%s', function (hook) {
    let called: string;

    func(hook, () => true).on(hook, function () {
      called = hook;
    }).emit(hook);

    expect(called).toEqual(hook);
  });

  test('unknow hook', function () {
    const item = func('test', () => true);

    expect(() => item.on('what', () => true)).toThrow(Error('Unknown hook: what'));
  });
});
