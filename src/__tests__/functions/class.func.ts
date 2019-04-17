import { Func } from '../../index';

export default new Func({
  name: 'class',
  onInvoke(input) {
    if (typeof input !== 'string') {
      throw Error('wrong input type');
    }

    return `Hey, ${input}`;
  },
});
