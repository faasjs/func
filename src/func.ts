import { Logger } from '@faasjs/utils';

/**
 * 云函数
 */
class Func {
  public name: string;
  public logger: Logger;
  public handler: (...args: any) => any;
  public events: {
    [hook: string]: Array<(...args: any) => any>,
  };
  private mounted: boolean;

  /**
   * 创建云函数类
   * @param name {string} 云函数名字
   * @param handler {function} 执行函数
   */
  constructor(name: string, handler: (event: any, context: any) => any) {
    this.name = name;
    this.logger = new Logger('faasjs.func');
    this.logger.debug('constructor');
    this.handler = handler;
    this.events = Object.create(null);
    this.mounted = false;
  }

  /**
   * 监听云函数生命周期事件并执行回调函数
   * @param hook {string} 事件名
   * @param hanlder {function} 回调函数
   */
  public on(hook: string, hanlder: (...args: any) => void) {
    this.logger.debug('on', hook);

    if (![
      'beforeBuild',
      'onBuild',
      'afterBuild',
      'beforeDeploy',
      'onDeploy',
      'afterDeploy',
      'afterMount',
      'beforeInvoke',
      'afterInvoke',
    ].includes(hook)) {
      throw Error('Unknown hook: ' + hook);
    }

    if (!this.events[hook]) {
      this.events[hook] = [];
    }

    this.events[hook].push(hanlder);

    return this;
  }

  /**
   * 手动触发生命周期事件
   * @param hook {string} 事件名
   * @param args {any} 参数
   */
  public async emit(hook: string, ...args: any) {
    this.logger.debug('emit', hook, (this.events[hook] ? this.events[hook].length : 0));

    if (this.events[hook]) {
      for (const handler of this.events[hook]) {
        await handler.call(this, ...args);
      }
    }

    return this;
  }

  /**
   * 触发云函数
   * @param event {any} 事件
   * @param context {any} 背景
   */
  public async invoke(event: any, context?: any) {
    const logger = new Logger('faasjs.func');
    logger.debug('invoke %o %o', event, context);

    try {
      if (!this.mounted) {
        await this.emit('afterMount');
      }

      await this.emit('beforeInvoke', event, context);

      logger.debug('handler');
      const res = await this.handler.call(this, event, context);

      await this.emit('afterInvoke', res, event, context);

      return res;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
}

/**
 * 新建云函数
 * @param name {string} 云函数名
 * @param handler {function} 触发时执行的函数
 * @returns Func
 * @example
 * import func from '@faasjs/func';
 * 
 * export default func('demo', function(event, context) {
 *   this.logger.info(event);
 *   return 'Hello world!'
 * });
 */
const func = (name: string, handler: (event: any, context: any) => any) => {
  return new Func(name, handler);
};

export {
  Func,
  func,
};

export default func;
