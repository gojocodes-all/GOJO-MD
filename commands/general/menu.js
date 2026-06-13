module.exports = {
  name: 'menu',
  aliases: ['help'],
  category: 'general',
  description: 'Show bot command menu',
  run: async (ctx) => {
    const grouped = {};
    for (const cmd of ctx.commands.values()) {
      const cat = cmd.category || 'other';
      grouped[cat] ??= [];
      grouped[cat].push(cmd);
    }
    let text = `╭─── ${ctx.config.botName} ───╮\n│ Owner: ${ctx.config.ownerNumber || 'not set'}\n│ Prefix: ${ctx.config.prefix}\n╰──────────────╯\n\n`;
    for (const [cat, cmds] of Object.entries(grouped)) {
      text += `┌─ ${cat.toUpperCase()}\n`;
      for (const c of cmds) text += `│ ${ctx.config.prefix}${c.name} - ${c.description || 'No description'}\n`;
      text += '└────────────\n\n';
    }
    await ctx.reply(text.trim());
  }
};
