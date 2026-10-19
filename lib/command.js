function isCommandMessage(msg, prefix) {
  return Boolean(msg?.body && prefix && msg.body.startsWith(prefix));
}

function canProcessCommand(mode, isOwner) {
  return mode !== 'private' || isOwner;
}

module.exports = { canProcessCommand, isCommandMessage };
