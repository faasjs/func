import { Func, Plugin, Next, MountData } from '../index';

describe('lifecycle', function () {
  describe('mount', function () {
    test('plugin throw error', async function () {
      class P implements Plugin {
        public async onMount () {
          throw Error('wrong');
        }
      }

      const func = new Func({
        plugins: [new P()],
        handler: () => 1
      });

      try {
        await func.export().handler(null);
      } catch (error) {
        expect(error.message).toEqual('wrong');
      }

      const res = await func.export().handler(null);

      expect(res.message).toEqual('wrong');
    });

    test('mount called multiple times', async function () {
      let times = 0;

      class P implements Plugin {
        public async onMount (data: MountData, next: Next) {
          times++;
          await next();
        }
      }

      const func = new Func({
        plugins: [new P()],
        handler: () => 1
      });
      const handler = func.export().handler;

      await handler(null);
      expect(times).toEqual(1);

      await handler(null);
      expect(times).toEqual(1);

      await func.mount({
        event: null,
        context: null
      });
      expect(times).toEqual(1);
    });
  });

  describe('invoke', function () {
    test('plugin throw error', async function () {
      class P implements Plugin {
        public async onInvoke () {
          throw Error('wrong');
        }
      }

      const func = new Func({
        plugins: [new P()],
        handler: () => 1
      });

      const res = await func.export().handler(null);

      expect(res.message).toEqual('wrong');
    });
  });
});
