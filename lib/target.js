function getModerationTarget(msg = {}) {
  const mentioned = msg.mentions?.find(Boolean);
  return mentioned || msg.quotedSender || null;
}

module.exports = { getModerationTarget };
