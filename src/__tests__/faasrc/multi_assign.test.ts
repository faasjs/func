import { faasrc, multiAssign } from '../../faasrc';
import func from '../../func';

describe('multiAssign', function () {
  describe('options', function () {
    test('namePrefix', function () {
      const item = func('faasrc', () => true);

      const base = faasrc({ namePrefix: 'base_' });
      const parent = faasrc({ namePrefix: 'parent_' });

      multiAssign(item, [base, parent]);

      expect(item.name).toEqual('parent_base_faasrc');
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
    ])('multi %s', async function (hook) {
      const res: string[] = [];

      const item = func('faasrc', () => true).on(hook, () => res.push('item'));

      const base = faasrc().on(hook, () => res.push('base'));
      const parent = faasrc().on(hook, () => res.push('parent'));

      multiAssign(item, [base, parent]);

      await item.emit(hook);

      expect(res).toEqual(['parent', 'base', 'item']);
    });
  });
});
