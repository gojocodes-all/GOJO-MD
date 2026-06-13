module.exports = {
  name: 'tagall',
  aliases: ['everyone'],
  category: 'group',
  description: 'Mention all group members',
  groupOnly: true,
  adminOnly: true,
  run: async (ctx) => {
    const mentions = ctx.participants.map(p => p.id);
    const note = ctx.msg.text || 'Attention everyone';
    const list = mentions.map(j => `@${j.split('@')[0]}`).join('\n');
    await ctx.send({ text: `${note}\n\n${list}`, mentions });
  }
};
