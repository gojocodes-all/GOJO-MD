module.exports = {
  name: 'kick',
  category: 'group',
  description: 'Remove mentioned member',
  groupOnly: true,
  adminOnly: true,
  botAdmin: true,
  run: async (ctx) => {
    const target = ctx.msg.mentions[0];
    if (!target) return ctx.reply('Tag the person to remove. Example: .kick @user');
    await ctx.sock.groupParticipantsUpdate(ctx.msg.chat, [target], 'remove');
    await ctx.reply('Removed ✅');
  }
};
