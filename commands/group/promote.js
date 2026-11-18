module.exports = {
  name: 'promote',
  category: 'group',
  description: 'Promote mentioned member to admin',
  groupOnly: true,
  adminOnly: true,
  botAdmin: true,
  run: async (ctx) => {
    const target = ctx.msg.mentions[0];
    if (!target) return ctx.reply('Tag the person to promote.');
    await ctx.sock.groupParticipantsUpdate(ctx.msg.chat, [target], 'promote');
    await ctx.reply('Promoted ✅');
  }
};
