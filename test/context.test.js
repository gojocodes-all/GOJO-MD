const test = require('node:test');
const assert = require('node:assert/strict');

process.env.OWNER_NUMBER = '2348000000000';
const { createContext } = require('../lib/context');

test('normalizes device-qualified sender JIDs for owner and admin checks', async () => {
  const sock = {
    user: { id: '2348999999999:7@s.whatsapp.net' },
    groupMetadata: async () => ({
      participants: [
        { id: '2348999999999@s.whatsapp.net', admin: 'admin' },
        { id: '2348000000000@s.whatsapp.net', admin: 'superadmin' }
      ]
    }),
    sendMessage: async () => {}
  };
  const msg = {
    raw: {},
    key: {},
    chat: '120363000000000000@g.us',
    sender: '2348000000000:19@s.whatsapp.net',
    isGroup: true
  };

  const context = await createContext(sock, msg, new Map());

  assert.equal(context.isOwner, true);
  assert.equal(context.isAdmin, true);
  assert.equal(context.isBotAdmin, true);
});
