module.exports = {
  name: 'ping',
  aliases: ['speed'],
  category: 'general',
  description: 'Check bot response speed',
  run: async (ctx) => {
    const start = Date.now();
    await ctx.reply('Pinging...');
    await ctx.reply(`Pong ⚡ ${Date.now() - start}ms`);
  }
};
