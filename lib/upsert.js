function getIncomingMessages({ messages = [], type } = {}) {
  if (type !== 'notify') return [];

  return messages.filter(raw => Boolean(raw?.key && raw.message && !raw.key.fromMe));
}

module.exports = { getIncomingMessages };
