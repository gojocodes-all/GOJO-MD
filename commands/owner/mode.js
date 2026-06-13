module.exports = {
  name: 'mode',
  category: 'owner',
  description: 'Show current public/private mode',
  ownerOnly: true,
  run: async (ctx) => ctx.reply(`Current mode: ${ctx.config.mode}\nChange it inside .env: MODE=public or MODE=private`)
};
