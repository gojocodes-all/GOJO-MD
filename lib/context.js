const config = require('../config');
const { jidNormalizedUser } = require('@whiskeysockets/baileys');

async function createContext(sock, msg, commands) {
  let metadata = null;
  let participants = [];
  let botJid = jidNormalizedUser(sock.user.id);

  if (msg.isGroup) {
    metadata = await sock.groupMetadata(msg.chat);
    participants = metadata.participants || [];
  }

  const senderNum = msg.sender.split('@')[0].replace(/[^0-9]/g, '');
  const botAdmin = participants.find(p => p.id === botJid)?.admin;
  const senderAdmin = participants.find(p => p.id === msg.sender)?.admin;

  return {
    sock,
    msg,
    commands,
    config,
    metadata,
    participants,
    isOwner: senderNum === config.ownerNumber,
    isGroup: msg.isGroup,
    isAdmin: Boolean(senderAdmin),
    isBotAdmin: Boolean(botAdmin),
    reply: (text) => sock.sendMessage(msg.chat, { text }, { quoted: msg.raw }),
    react: (emoji) => sock.sendMessage(msg.chat, { react: { text: emoji, key: msg.key } }),
    send: (content) => sock.sendMessage(msg.chat, content, { quoted: msg.raw })
  };
}

module.exports = { createContext };
