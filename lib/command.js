function isCommandMessage(msg, prefix) {
  return Boolean(msg?.body && prefix && msg.body.startsWith(prefix));
}

module.exports = { isCommandMessage };
