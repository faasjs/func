import { deepMerge } from '@faasjs/utils';
import { Func } from './func';

/**
 * 配置函数
 */
class Faasrc {
  public options: {
    namePrefix?: string;
  };
  public events: {
    [hook: string]: Array<(...args: any) => any>;
  };

  /**
   * 创建配置函数类
   * @param options {object} 配置项
   * @param options.namePrefix {string} 命名前缀
   */
  constructor(options?: {
    namePrefix?: string,
  }) {
    if (options) {
      this.options = options;
    } else {
      this.options = {};
    }

    this.events = Object.create(null);
  }

  /**
   * 监听云函数生命周期事件
   * @param hook {string} 事件名
   * @param handler {function} 回调函数
   */
  public on(hook: string, handler: (...args: any) => any) {
    if (!this.events[hook]) {
      this.events[hook] = [];
    }
    this.events[hook].push(handler);

    return this;
  }

  /**
   * 将配置函数应用于云函数
   * @param func {Func} 云函数
   */
  public assign(func: Func) {
    if (this.options.namePrefix) {
      func.name = this.options.namePrefix + func.name;
    }

    if (Object.keys(this.events).length) {
      func.events = deepMerge(func.events, this.events);
    }
    return this;
  }
}

/**
 * 创建配置函数
 * @param options {object} 配置项
 * @param options.namePrefix {string} 命名前缀
 * @returns Faasrc
 * @example
 * import { faasrc } from '@faasjs/func';
 * 
 * export default faasrc({ namePrefix: '_' })
 *   .on('beforeBuild', function() {
 *     // do something
 *   });
 */
function faasrc(options?: {
  namePrefix?: string,
}) {
  return new Faasrc(options);
}

/**
 * 批量将配置函数应用于云函数
 * @param func {Func} 云函数
 * @param list {Faasrc[]} 配置函数列表
 */
function multiAssign(func: Func, list: Faasrc[]) {
  for (const rc of list) {
    rc.assign(func);
  }
}

export {
  faasrc,
  Faasrc,
  multiAssign,
};

export default faasrc;
