module.exports = {
  name: 'ship',
  category: 'fun',
  description: 'Fun compatibility percentage',
  run: async (ctx) => {
    const percent = Math.floor(Math.random() * 101);
    await ctx.reply(`Compatibility: ${percent}% ${percent > 70 ? '🔥' : percent > 40 ? '🙂' : '💀'}`);
  }
};
