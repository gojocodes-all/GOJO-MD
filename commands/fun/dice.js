module.exports = {
  name: 'dice',
  category: 'fun',
  description: 'Roll a dice',
  run: async (ctx) => ctx.reply(`🎲 You rolled: ${Math.floor(Math.random() * 6) + 1}`)
};
