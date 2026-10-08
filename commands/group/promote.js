const { getModerationTarget } = require('../../lib/target');

module.exports = {
  name: 'promote',
  category: 'group',
  description: 'Promote a mentioned or replied-to member to admin',
  groupOnly: true,
  adminOnly: true,
  botAdmin: true,
  run: async (ctx) => {
    const target = getModerationTarget(ctx.msg);
    if (!target) return ctx.reply('Mention the person to promote or reply to their message.');
    await ctx.sock.groupParticipantsUpdate(ctx.msg.chat, [target], 'promote');
    await ctx.reply('Promoted ✅');
  }
};
