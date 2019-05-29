import { Func, Plugin, BuildData, DeployData, Next, InvokeData } from '../func';

describe('plugins', function () {
  test('onBuild', async function () {
    const results = [];
    class P1 implements Plugin {
      public onBuild (data: BuildData, next: Next) {
        results.push('before1');
        data.filename += 'before1';
        next();
        data.filename += 'after1';
        results.push('after1');
      }
    }
    class P2 implements Plugin {
      public onBuild (data: BuildData, next: Next) {
        results.push('before2');
        data.filename += 'before2';
        next();
        data.filename += 'after2';
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
    await func.build(data);
    results.push('end');

    expect(results).toEqual(['begin', 'before1', 'before2', 'after2', 'after1', 'end']);
    expect(data.filename).toEqual('basebefore1before2after2after1');
  });

  test('onDeploy', async function () {
    const results = [];
    class P1 implements Plugin {
      public onDeploy (data: DeployData, next: Next) {
        results.push('before1');
        data.resources.functions[0].package += 'before1';
        next();
        data.resources.functions[0].package += 'after1';
        results.push('after1');
      }
    }
    class P2 implements Plugin {
      public onDeploy (data: DeployData, next: Next) {
        results.push('before2');
        data.resources.functions[0].package += 'before2';
        next();
        data.resources.functions[0].package += 'after2';
        results.push('after2');
      }
    }

    const func = new Func({
      plugins: [new P1(), new P2()],
      handler: () => 1
    });

    results.push('begin');
    const data = {
      resources: {
        functions: [
          {
            package: 'base'
          }
        ]
      }
    };
    await func.deploy(data);
    results.push('end');

    expect(results).toEqual(['begin', 'before1', 'before2', 'after2', 'after1', 'end']);
    expect(data.resources.functions[0].package).toEqual('basebefore1before2after2after1');
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
    await func.mount();
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
      handler: () => 'base'
    });

    const data = {
      type: -1,
      event: null,
      context: null,
      callback: () => 1,
      response: null,
      handler: func.handler,
      logger: func.logger
    };

    results.push('begin');
    await func.mount();
    await func.invoke(data);
    results.push('end');

    expect(results).toEqual(['begin', 'before1', 'before2', 'after2', 'after1', 'end']);
    expect(data.response).toEqual('baseafter2after1');
  });

  test('call multiple times next', async function () {
    class P implements Plugin {
      public async onMount (data: BuildData, next: Next) {
        await next();
        await next();
      }
    }

    const func = new Func({
      plugins: [new P()],
      handler: () => 1
    });

    try {
      await func.mount();
    } catch (error) {
      expect(error.message).toEqual('next() called multiple times');
    }
  });
});
