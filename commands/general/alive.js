const moment = require('moment-timezone');
module.exports = {
  name: 'alive',
  category: 'general',
  description: 'Show bot status',
  run: async (ctx) => {
    const up = process.uptime();
    const h = Math.floor(up / 3600), m = Math.floor((up % 3600) / 60), s = Math.floor(up % 60);
    await ctx.reply(`${ctx.config.botName} is alive 🗿\nUptime: ${h}h ${m}m ${s}s\nTime: ${moment().tz(ctx.config.timezone).format('YYYY-MM-DD HH:mm:ss')}`);
  }
};
