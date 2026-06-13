module.exports = {
  name: 'ask',
  aliases: ['ai', 'gpt'],
  category: 'ai',
  description: 'Ask AI using OPENAI_API_KEY',
  run: async (ctx) => {
    if (!ctx.config.openaiKey) return ctx.reply('AI is not enabled. Add OPENAI_API_KEY inside .env first.');
    const prompt = ctx.msg.text;
    if (!prompt) return ctx.reply('Example: .ask explain React like I am new');
    try {
      const OpenAI = require('openai');
      const client = new OpenAI({ apiKey: ctx.config.openaiKey });
      const res = await client.responses.create({
        model: ctx.config.openaiModel,
        input: `Reply clearly and briefly for WhatsApp. User: ${prompt}`
      });
      await ctx.reply(res.output_text || 'No AI response.');
    } catch (e) {
      console.error(e);
      await ctx.reply('AI request failed. Check your API key/model/network.');
    }
  }
};
