import func from '../../index';

export default func('func', function (input) {
  if (typeof input !== 'string') {
    throw Error('wrong input type');
  }

  return `Hey, ${input}`;
});
