const test = require('node:test');
const assert = require('node:assert/strict');
const { isCommandMessage } = require('../lib/command');

test('recognizes messages that start with the configured command prefix', () => {
  assert.equal(isCommandMessage({ body: '.ping' }, '.'), true);
  assert.equal(isCommandMessage({ body: '!menu' }, '!'), true);
});

test('rejects ordinary, empty, and malformed messages', () => {
  assert.equal(isCommandMessage({ body: 'hello there' }, '.'), false);
  assert.equal(isCommandMessage({ body: 'try .ping' }, '.'), false);
  assert.equal(isCommandMessage({ body: '' }, '.'), false);
  assert.equal(isCommandMessage(null, '.'), false);
  assert.equal(isCommandMessage({ body: '.ping' }, ''), false);
});
