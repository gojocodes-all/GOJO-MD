module.exports = {
  name: 'quote',
  category: 'tools',
  description: 'Generate a clean quote card text',
  run: async (ctx) => {
    const text = ctx.msg.text || 'No grind, no glory.';
    await ctx.reply(`“${text}”\n\n— ${ctx.config.botName}`);
  }
};
