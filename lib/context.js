const config = require('../config');
const { jidNormalizedUser } = require('@whiskeysockets/baileys');

function normalizeUserJid(jid) {
  return typeof jid === 'string' && jid ? jidNormalizedUser(jid) : '';
}

function getParticipantAdmin(participants, jid) {
  const normalizedJid = normalizeUserJid(jid);
  if (!normalizedJid) return null;
  return participants.find(participant => normalizeUserJid(participant.id) === normalizedJid)?.admin || null;
}

async function createContext(sock, msg, commands) {
  let metadata = null;
  let participants = [];
  const botJid = normalizeUserJid(sock.user.id);
  const senderJid = normalizeUserJid(msg.sender);

  if (msg.isGroup) {
    metadata = await sock.groupMetadata(msg.chat);
    participants = metadata.participants || [];
  }

  const senderNum = senderJid.split('@')[0].replace(/[^0-9]/g, '');
  const botAdmin = getParticipantAdmin(participants, botJid);
  const senderAdmin = getParticipantAdmin(participants, senderJid);

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
