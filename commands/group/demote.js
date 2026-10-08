const { getModerationTarget } = require('../../lib/target');

module.exports = {
  name: 'demote',
  category: 'group',
  description: 'Demote a mentioned or replied-to admin',
  groupOnly: true,
  adminOnly: true,
  botAdmin: true,
  run: async (ctx) => {
    const target = getModerationTarget(ctx.msg);
    if (!target) return ctx.reply('Mention the person to demote or reply to their message.');
    await ctx.sock.groupParticipantsUpdate(ctx.msg.chat, [target], 'demote');
    await ctx.reply('Demoted ✅');
  }
};
