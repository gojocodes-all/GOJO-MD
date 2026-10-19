const test = require('node:test');
const assert = require('node:assert/strict');
const { canProcessCommand, isCommandMessage } = require('../lib/command');

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

test('private mode processes owner commands and ignores non-owner commands', () => {
  assert.equal(canProcessCommand('private', true), true);
  assert.equal(canProcessCommand('private', false), false);
});

test('public mode continues to process commands from every sender', () => {
  assert.equal(canProcessCommand('public', false), true);
  assert.equal(canProcessCommand('public', true), true);
});
