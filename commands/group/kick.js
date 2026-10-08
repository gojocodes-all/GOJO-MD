const { getModerationTarget } = require('../../lib/target');

module.exports = {
  name: 'kick',
  category: 'group',
  description: 'Remove a mentioned or replied-to member',
  groupOnly: true,
  adminOnly: true,
  botAdmin: true,
  run: async (ctx) => {
    const target = getModerationTarget(ctx.msg);
    if (!target) return ctx.reply('Mention the person to remove or reply to their message.');
    await ctx.sock.groupParticipantsUpdate(ctx.msg.chat, [target], 'remove');
    await ctx.reply('Removed ✅');
  }
};
