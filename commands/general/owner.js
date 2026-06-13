module.exports = {
  name: 'owner',
  category: 'general',
  description: 'Show owner contact',
  run: async (ctx) => {
    if (!ctx.config.ownerNumber) return ctx.reply('Owner number is not set in .env');
    await ctx.send({ contacts: { displayName: 'Bot Owner', contacts: [{ vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:Bot Owner\nTEL;type=CELL;type=VOICE;waid=${ctx.config.ownerNumber}:+${ctx.config.ownerNumber}\nEND:VCARD` }] } });
  }
};
