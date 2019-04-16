import step from '../../index';

export default step('func', function (input) {
  if (typeof input !== 'string') {
    throw Error('wrong input type');
  }

  return `Hey, ${input}`;
});
