import { Func, Plugin, DeployData, Next, InvokeData } from '../func';

describe('plugins', function () {
  test('onDeploy', async function () {
    const results = [];
    class P1 implements Plugin {
      public onDeploy (data: DeployData, next: Next) {
        results.push('before1');
        next();
        results.push('after1');
      }
    }
    class P2 implements Plugin {
      public onDeploy (data: DeployData, next: Next) {
        results.push('before2');
        next();
        results.push('after2');
      }
    }

    const func = new Func({
      plugins: [new P1(), new P2()],
      handler: () => 1
    });

    results.push('begin');
    const data = {
      root: '.',
      filename: 'base',
      env: 'testing'
    };
    await func.deploy(data);
    results.push('end');

    expect(results).toEqual(['begin', 'before1', 'before2', 'after2', 'after1', 'end']);
  });

  test('onMount', async function () {
    const results = [];
    class P1 implements Plugin {
      public onMount (data: {}, next: Next) {
        results.push('before1');
        next();
        results.push('after1');
      }
    }
    class P2 implements Plugin {
      public onMount (data: {}, next: Next) {
        results.push('before2');
        next();
        results.push('after2');
      }
    }

    const func = new Func({
      plugins: [new P1(), new P2()],
      handler: () => 1
    });

    results.push('begin');
    await func.mount({
      pluginsConfig: func.pluginsConfig
    });
    results.push('end');

    expect(results).toEqual(['begin', 'before1', 'before2', 'after2', 'after1', 'end']);
  });

  test('onInvoke', async function () {
    const results = [];
    class P1 implements Plugin {
      public async onInvoke (data: InvokeData, next: Next) {
        results.push('before1');
        data.response += 'before1';
        await next();
        data.response += 'after1';
        results.push('after1');
      }
    }
    class P2 implements Plugin {
      public async onInvoke (data: InvokeData, next: Next) {
        results.push('before2');
        data.response += 'before2';
        await next();
        data.response += 'after2';
        results.push('after2');
      }
    }

    const func = new Func({
      plugins: [new P1(), new P2()],
      handler () {
        return 'base';
      }
    });

    const data = {
      type: -1,
      event: null,
      context: null,
      callback: () => 1,
      response: null,
      handler: func.handler,
      logger: func.logger,
      pluginsConfig: func.pluginsConfig
    };

    results.push('begin');
    await func.mount({
      pluginsConfig: func.pluginsConfig
    });
    await func.invoke(data);
    results.push('end');

    expect(results).toEqual(['begin', 'before1', 'before2', 'after2', 'after1', 'end']);
    expect(data.response).toEqual('baseafter2after1');
  });

  test('call multiple times next', async function () {
    class P implements Plugin {
      public async onMount (data: DeployData, next: Next) {
        await next();
        await next();
      }
    }

    const func = new Func({
      plugins: [new P()],
      handler: () => 1
    });

    try {
      await func.mount({
        pluginsConfig: func.pluginsConfig
      });
    } catch (error) {
      expect(error.message).toEqual('next() called multiple times');
    }
  });
});
