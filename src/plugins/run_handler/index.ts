import { InvokeData } from '../../index';

export default class RunHandler {
  public readonly type: string;
  public name?: string;

  constructor () {
    this.type = 'handler';
    this.name = 'handler';
  }

  public async onInvoke (data: InvokeData, next: () => void) {
    if (!data.runHandler) {
      data.logger.debug('[RunHandler] begin');
      try {
        data.logger.time('RunHandler');
        data.response = await data.handler(data);
      } catch (error) {
        data.logger.error(error);
        data.response = error;
      }
      data.runHandler = true;
      data.logger.timeEnd('RunHandler', '[RunHandler] end %o', data);
    } else {
      data.logger.warn('[RunHandler] handler has been run');
    }

    next();
  }
}
