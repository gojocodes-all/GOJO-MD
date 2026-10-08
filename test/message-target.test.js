const test = require('node:test');
const assert = require('node:assert/strict');
const { getContextInfo, getText } = require('../lib/message');
const { getModerationTarget } = require('../lib/target');

test('extracts text and reply context from supported message types', () => {
  const quotedMessage = { conversation: 'original message' };
  const contextInfo = {
    participant: '2348000000000@s.whatsapp.net',
    mentionedJid: ['2348111111111@s.whatsapp.net'],
    quotedMessage
  };

  assert.equal(getText({ extendedTextMessage: { text: '.kick', contextInfo } }), '.kick');
  assert.equal(getText({ imageMessage: { caption: '.promote', contextInfo } }), '.promote');
  assert.equal(getText({ videoMessage: { caption: '.demote', contextInfo } }), '.demote');
  assert.equal(getContextInfo({ imageMessage: { contextInfo } }), contextInfo);
  assert.equal(getContextInfo({ conversation: '.ping' }), null);
});

test('prefers an explicit mention over a replied-to participant', () => {
  assert.equal(
    getModerationTarget({
      mentions: ['2348111111111@s.whatsapp.net'],
      quotedSender: '2348000000000@s.whatsapp.net'
    }),
    '2348111111111@s.whatsapp.net'
  );
});

test('falls back to the replied-to participant and rejects missing targets', () => {
  assert.equal(
    getModerationTarget({
      mentions: [],
      quotedSender: '2348000000000@s.whatsapp.net'
    }),
    '2348000000000@s.whatsapp.net'
  );
  assert.equal(getModerationTarget({ mentions: [] }), null);
  assert.equal(getModerationTarget(), null);
});
