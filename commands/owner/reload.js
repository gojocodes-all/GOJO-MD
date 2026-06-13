module.exports = {
  name: 'reload',
  category: 'owner',
  description: 'Reload command files without restarting',
  ownerOnly: true,
  run: async (ctx) => {
    const { loadCommands } = require('../../lib/loader');
    const fresh = loadCommands();
    ctx.commands.clear();
    for (const [k, v] of fresh) ctx.commands.set(k, v);
    await ctx.reply(`Reloaded ${fresh.size} commands ✅`);
  }
};
