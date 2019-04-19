import func from '../../../index';

export default func('func', function (event) {
  return `Hey, ${event}`;
}).on('beforeInvoke', function (event) {
  if (typeof event !== 'string') {
    throw Error('Who are you?');
  }
});
