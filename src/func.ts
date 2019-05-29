import Logger from '@faasjs/logger';
import RunHandler from './plugins/run_handler/index';

export type Handler = (data: InvokeData) => any;
export type Next = () => Promise<void>;

export interface BuildData {
  root: string;
  filename: string;
  env?: string;
  [key: string]: any;
}

export interface DeployData {
  resources: {
    [key: string]: {
      [key: string]: any;
    }[];
  };
  [key: string]: any;
}

export interface InvokeData {
  event: any;
  context: any;
  callback: any;
  response: any;
  logger: Logger;
  handler: Handler;
  [key: string]: any;
}

export interface Plugin {
  onBuild?: (data: BuildData, next: Next) => void;
  onDeploy?: (data: DeployData, next: Next) => void;
  onMount?: (data: {}, next: Next) => void;
  onInvoke?: (data: InvokeData, next: Next) => void;
  [key: string]: any;
}

export class Func {
  public plugins: Plugin[];
  public handler: Handler;
  public logger: Logger;
  private mounted: boolean;

  /**
   * 新建流程
   * @param config {object} 配置项
   * @param config.plugins {Plugin[]} 插件
   * @param config.handler {Handler} 业务函数
   * @param config.builder {object} 构建配置项
   * @param config.deployer {object} 部署配置项
   */
  constructor (config: {
    plugins?: Plugin[];
    handler: Handler;
  }) {
    this.logger = new Logger('func');

    if (typeof config.handler !== 'function') {
      throw Error('Unknown handler');
    }
    this.handler = config.handler;

    this.plugins = config.plugins || [];
    this.plugins.push(new RunHandler());

    this.mounted = false;
  }

  public compose (key: 'onBuild' | 'onDeploy' | 'onMount' | 'onInvoke') {
    let list: ((...args: any) => any)[] = [];
    for (const plugin of this.plugins) {
      if (typeof plugin[key as string] === 'function') {
        list.push(plugin[key as string].bind(plugin));
      }
    }

    return function (data: any, next?: () => void) {
      let index = -1;

      const dispatch = function (i: number): any {
        if (i <= index) return Promise.reject(Error('next() called multiple times'));
        index = i;
        let fn: any = list[i as number];
        if (i === list.length) fn = next;
        if (!fn) return Promise.resolve();
        try {
          return Promise.resolve(fn(data, dispatch.bind(null, i + 1)));
        } catch (err) {
          return Promise.reject(err);
        }
      };

      return dispatch(0);
    };
  }

  /**
   * 构建代码包
   * @param data {object} 代码包信息
   * @param data.root {string} 项目根目录
   * @param data.filename {string} 包括完整路径的流程文件名
   * @param data.env {string} 环境
   */
  public build (data: BuildData) {
    this.logger.debug('onBuild');
    return this.compose('onBuild')(data);
  }

  /**
   * 发布云资源
   * @param data {object} 待发布信息
   * @param data.resources {object} 云资源信息
   */
  public deploy (data: DeployData) {
    this.logger.debug('onDeploy');
    return this.compose('onDeploy')(data);
  }

  /**
   * 启动云实例
   */
  public mount () {
    this.logger.debug('onMount');
    return this.compose('onMount')({});
  }

  /**
   * 执行云函数
   * @param data {object} 执行信息
   */
  public invoke (data: InvokeData) {
    this.logger.debug('onInvoke');
    return this.compose('onInvoke')(data);
  }

  /**
   * 创建触发函数
   */
  public createHandler () {
    this.logger.debug('createHandler');
    return async (event: any, context?: any, callback?: (...args: any) => any) => {
      this.logger.debug('event: %o', event);
      this.logger.debug('conext: %o', context);

      // 实例未启动时执行启动函数
      if (!this.mounted) {
        await this.mount();
        this.mounted = true;
      }

      const data: InvokeData = {
        event,
        context: context || {},
        callback: callback || (() => true),
        response: null,
        handler: this.handler,
        logger: this.logger
      };

      await this.invoke(data);

      return data.response;
    };
  }
}
