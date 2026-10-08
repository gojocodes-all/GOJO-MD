const config = require('../config');
const { getContextInfo, getText } = require('./message');

async function parseMessage(sock, raw) {
  const body = getText(raw.message);
  const contextInfo = getContextInfo(raw.message);
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
    quoted: contextInfo?.quotedMessage || null,
    quotedSender: contextInfo?.participant || null,
    mentions: contextInfo?.mentionedJid || []
  };
}

module.exports = { parseMessage };
