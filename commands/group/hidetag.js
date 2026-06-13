module.exports = {
  name: 'hidetag',
  category: 'group',
  description: 'Send hidden mention to everyone',
  groupOnly: true,
  adminOnly: true,
  run: async (ctx) => {
    const mentions = ctx.participants.map(p => p.id);
    await ctx.send({ text: ctx.msg.text || ' ', mentions });
  }
};
