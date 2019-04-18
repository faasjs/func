import { Logger } from '@faasjs/utils';

/**
 * 云函数
 */
class Func {
  public name: string;
  public logger: Logger;
  public handler: (...args: any) => any;
  private events: {
    [hook: string]: Array<(...args: any) => any>,
  };

  /**
   * 创建云函数
   * @param name {string} 云函数名字
   * @param handler {function} 执行函数
   */
  constructor(name: string, handler: (event: any, context: any) => any) {
    this.name = name;
    this.logger = new Logger('faasjs.func');
    this.logger.debug('constructor');
    this.handler = handler;
    this.events = {};
  }

  /**
   * 监听云函数生命周期的钩子并执行回调函数
   * @param hook {string} 钩子名
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
   * 触发生命周期钩子
   * @param hook {string} 钩子名
   * @param args {any} 参数
   */
  public async emit(hook: string, ...args: any) {
    this.logger.debug('emit', hook);

    if (this.events[hook]) {
      for (const handler of this.events[hook]) {
        await handler.call(this, ...args);
      }
    }

    return this;
  }

  /**
   * 执行云函数
   * @param event {any} 事件
   * @param context {any} 背景
   */
  public async invoke(event: any, context?: any) {
    const logger = new Logger('faasjs.func');
    logger.debug('invoke %o %o', event, context);

    try {
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
 * @param name {string} 云函数名字
 * @param handler {function} 步骤触发时执行的函数
 * @param options {object=} 同完整版的触发函数
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
