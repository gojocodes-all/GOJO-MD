const config = require('../config');

function getText(message) {
  return message.conversation ||
    message.extendedTextMessage?.text ||
    message.imageMessage?.caption ||
    message.videoMessage?.caption ||
    '';
}

async function parseMessage(sock, raw) {
  const body = getText(raw.message);
  const withoutPrefix = body.startsWith(config.prefix) ? body.slice(config.prefix.length).trim() : body.trim();
  const [command = '', ...args] = withoutPrefix.split(/\s+/);
  return {
    raw,
    key: raw.key,
    chat: raw.key.remoteJid,
    sender: raw.key.participant || raw.key.remoteJid,
    isGroup: raw.key.remoteJid.endsWith('@g.us'),
    body,
    command,
    args,
    text: args.join(' '),
    quoted: raw.message?.extendedTextMessage?.contextInfo?.quotedMessage || null,
    mentions: raw.message?.extendedTextMessage?.contextInfo?.mentionedJid || []
  };
}

module.exports = { parseMessage };
