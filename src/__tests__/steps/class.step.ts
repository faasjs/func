import { Step } from '../../index';

export default new Step({
  id: 'class',
  onInvoke: (input) => {
    if (typeof input !== 'string') {
      throw Error('wrong input type');
    }

    return `Hey, ${input}`;
  },
});
