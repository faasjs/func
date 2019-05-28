import { InvokeData } from '../../func';

export default class RunHandler {
  public async onInvoke (data: InvokeData, next: () => void) {
    if (!data.runHandler) {
      data.logger.debug('RunHandler: begin');
      try {
        data.response = await data.handler(data);
      } catch (error) {
        data.logger.error(error);
        data.response = error;
      }
      data.runHandler = true;
      data.logger.debug('RunHandler: end %o', data);
    } else {
      data.logger.warn('handler has been run');
    }

    next();
  }
}
