import func from '../../../index';

let times = 0;

export default func('mount', function (event) {
  return times;
}).on('afterMount', function (event) {
  times++;
  return times;
});
