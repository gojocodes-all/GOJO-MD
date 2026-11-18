module.exports = {
  name: 'demote',
  category: 'group',
  description: 'Demote mentioned admin',
  groupOnly: true,
  adminOnly: true,
  botAdmin: true,
  run: async (ctx) => {
    const target = ctx.msg.mentions[0];
    if (!target) return ctx.reply('Tag the person to demote.');
    await ctx.sock.groupParticipantsUpdate(ctx.msg.chat, [target], 'demote');
    await ctx.reply('Demoted ✅');
  }
};
