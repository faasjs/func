import { Logger } from '@faasjs/utils';

class Step {
  public id: string;
  public logger: Logger;
  public hooks: {
    beforeBuild?: (buildConfig: any) => void;
    onBuild?: (buildConfig: any) => any;
    afterBuild?: (buildResult: any, buildConfig: any) => void;
    beforeDeploy?: (deployer: any) => void;
    onDeploy?: (deployer: any) => void;
    afterDeploy?: (deployer: any) => void;
    afterMount?: () => void;
    beforeInvoke?: (event: any, context: any) => void;
    onInvoke: (event: any, context: any) => void;
    afterInvoke?: (event: any, context: any, output: any) => void;
  };

  /**
   * 标准版创建步骤类
   * @param options {object} 配置项
   * @param options.id {string} 步骤 ID
   * @param options.beforeBuild {function=} 构建前执行的函数
   * @param options.onBuild {function=} 构建时执行函数，未定义则执行默认构建函数
   * @param options.afterBuild {function=} 构建后执行的函数
   * @param options.beforeDeploy {function=} 部署前执行的函数
   * @param options.onDeploy {function=} 部署时执行的函数，未定义则执行部署函数
   * @param options.afterDeploy {function=} 部署后执行的函数
   * @param options.afterMount {function=} 实例加载后执行的函数
   * @param options.beforeInvoke {function=} 触发前执行的函数
   * @param options.onInvoke {function} 触发时执行的函数
   * @param options.afterInvoke {function=} 触发后执行的函数
   * @example
   * import { Step } from '@faasjs/step';
   * 
   * export default new Step({
   *   id: 'demo',
   *   onInvoke(event, context) {
   *     console.log(event);
   *     return 'Hello world!';
   *   }
   * })
   */
  constructor(options: {
    id: string
    beforeBuild?: (buildConfig: any) => void,
    onBuild?: (buildConfig: any) => any,
    afterBuild?: (buildResult: any, buildConfig: any) => void,
    beforeDeploy?: () => void,
    onDeploy?: () => void,
    afterDeploy?: () => void,
    afterMount?: () => void,
    beforeInvoke?: (event: any, context: any) => void,
    onInvoke: (event: any, context: any) => void,
    afterInvoke?: (result: any, event: any, context: any) => void,
  }) {
    this.id = options.id;
    delete options.id;
    this.hooks = options;
    this.logger = new Logger('faasjs.step');
    this.logger.debug('constructor');
  }

  public async invoke(event: any, context?: any) {
    const logger = new Logger('faasjs.step');
    logger.debug('invoke %o %o', event, context);

    if (!this.hooks.onInvoke) { throw Error('onInvoke is not defined'); }

    try {
      if (this.hooks.beforeInvoke) {
        logger.debug('beforeInvoke');
        await this.hooks.beforeInvoke.call(this, event, context);
      }

      logger.debug('onInvoke');
      const res = await this.hooks.onInvoke.call(this, event, context);

      if (this.hooks.afterInvoke) {
        logger.debug('afterInvoke');
        await this.hooks.afterInvoke.call(this, res, event, context);
      }

      return res;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
}

/**
 * 简化版的新建步骤函数
 * @param id {string} 步骤 ID
 * @param onInvoke {function} 步骤触发时执行的函数
 * @param options {object=} 同完整版的触发函数
 * @example
 * import step from '@faasjs/step';
 * 
 * export default step('demo', function(event, context) {
 *   console.log(event);
 *   return 'Hello world!'
 * });
 */
const step = (id: string, onInvoke: (event: any, context: any) => void, options?: {
  beforeBuild?: (buildConfig: any) => void,
  onBuild?: (buildConfig: any) => any,
  afterBuild?: (buildResult: any, buildConfig: any) => void,
  beforeDeploy?: () => void,
  onDeploy?: () => void,
  afterDeploy?: () => void,
  afterMount?: () => void,
  beforeInvoke?: (event: any, context: any) => void,
  afterInvoke?: (result: any, event: any, context: any) => void,
}) => {
  if (options) {
    return new Step({ ...{ id, onInvoke }, ...options });
  }
  return new Step({ id, onInvoke });
};

export {
  Step,
  step,
};

export default step;
