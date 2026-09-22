const test = require('node:test');
const assert = require('node:assert/strict');
const { getIncomingMessages } = require('../lib/upsert');

test('returns every eligible message in an upsert batch in order', () => {
  const first = { key: { fromMe: false }, message: { conversation: '.ping' } };
  const second = { key: { fromMe: false }, message: { conversation: '.menu' } };

  assert.deepEqual(
    getIncomingMessages({ type: 'notify', messages: [first, second] }),
    [first, second]
  );
});

test('ignores outbound, empty, and non-notify upserts', () => {
  const incoming = { key: { fromMe: false }, message: { conversation: '.ping' } };
  const outbound = { key: { fromMe: true }, message: { conversation: '.ping' } };
  const empty = { key: { fromMe: false } };
  const keyless = { message: { conversation: '.menu' } };

  assert.deepEqual(getIncomingMessages({ type: 'notify', messages: [outbound, empty, keyless, incoming] }), [incoming]);
  assert.deepEqual(getIncomingMessages({ type: 'append', messages: [incoming] }), []);
  assert.deepEqual(getIncomingMessages(), []);
});
