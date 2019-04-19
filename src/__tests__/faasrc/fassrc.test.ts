import faasrc from '../../faasrc';
import func from '../../func';

describe('faasrc', function () {
  describe('options', function () {
    test('namePrefix', function () {
      const item = func('faasrc', () => true);

      faasrc({ namePrefix: 'prefix_' }).assign(item);

      expect(item.name).toEqual('prefix_faasrc');
    });
  });

  describe('hook', function () {
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
    ])('single %s', async function (hook) {
      const res: string[] = [];

      const item = func('faasrc', () => true).on(hook, () => res.push('item'));

      faasrc().on(hook, () => res.push('rc')).assign(item);

      await item.emit(hook);

      expect(res).toEqual(['rc', 'item']);
    });

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
    ])('multi %s', async function (hook) {
      const res: string[] = [];

      const item = func('faasrc', () => true).on(hook, () => res.push('item'));

      faasrc().on(hook, () => res.push('base')).assign(item);
      faasrc().on(hook, () => res.push('parent')).assign(item);

      await item.emit(hook);

      expect(res).toEqual(['parent', 'base', 'item']);
    });
  });
});
