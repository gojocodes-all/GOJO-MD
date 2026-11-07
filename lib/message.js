const { normalizeMessageContent } = require('@whiskeysockets/baileys');

function getText(message = {}) {
  const content = normalizeMessageContent(message) || {};
  return content.conversation ||
    content.extendedTextMessage?.text ||
    content.imageMessage?.caption ||
    content.videoMessage?.caption ||
    '';
}

function getContextInfo(message = {}) {
  const content = normalizeMessageContent(message) || {};
  return content.extendedTextMessage?.contextInfo ||
    content.imageMessage?.contextInfo ||
    content.videoMessage?.contextInfo ||
    null;
}

module.exports = { getContextInfo, getText };
