import mount from './functions/mount.func';

test('mount func', () => {
  expect(mount.invoke(1)).resolves.toEqual(1);
  expect(mount.invoke(1)).resolves.toEqual(1);
});
