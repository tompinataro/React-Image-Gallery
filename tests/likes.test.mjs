import test from 'node:test';
import assert from 'node:assert/strict';
import { readLikes, saveLikes } from '../src/data/likes.mjs';
test('likes survive a new read and reject malformed persisted values', () => {
  let data = null;
  const storage = { getItem: () => data, setItem: (_, value) => { data = value; } };
  assert.deepEqual(readLikes(storage), {});
  assert.equal(saveLikes(storage, { 2: 3 }), true);
  assert.deepEqual(readLikes(storage), { 2: 3 });
  for (const invalid of ['null', '[]', 'invalid']) {
    data = invalid;
    assert.deepEqual(readLikes(storage), {});
  }
  data = '{"1":-1,"2":3,"3":"4","4":1.2}';
  assert.deepEqual(readLikes(storage), { 2: 3 });
});
test('blocked storage does not stop the gallery', () => {
  const storage = { getItem() { throw Error('blocked'); }, setItem() { throw Error('full'); } };
  assert.deepEqual(readLikes(storage), {});
  assert.equal(saveLikes(storage, { 1: 1 }), false);
});
