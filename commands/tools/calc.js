module.exports = {
  name: 'calc',
  aliases: ['math'],
  category: 'tools',
  description: 'Calculate simple math safely',
  run: async (ctx) => {
    const exp = ctx.msg.text;
    if (!exp) return ctx.reply('Example: .calc 2*(10+5)');
    if (!/^[0-9+\-*/().%\s]+$/.test(exp)) return ctx.reply('Only numbers and basic math symbols are allowed.');
    try {
      const result = Function(`"use strict"; return (${exp})`)();
      await ctx.reply(`${exp} = ${result}`);
    } catch {
      await ctx.reply('Invalid calculation.');
    }
  }
};
