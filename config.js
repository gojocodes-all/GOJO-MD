require('dotenv').config();

module.exports = {
  botName: process.env.BOT_NAME || 'GOJO-MD',
  prefix: process.env.PREFIX || '.',
  ownerNumber: (process.env.OWNER_NUMBER || '').replace(/[^0-9]/g, ''),
  timezone: process.env.TIMEZONE || 'Africa/Lagos',
  mode: process.env.MODE || 'public',
  autoRead: process.env.AUTO_READ === 'true',
  autoTyping: process.env.AUTO_TYPING !== 'false',
  openaiKey: process.env.OPENAI_API_KEY || '',
  openaiModel: process.env.OPENAI_MODEL || 'gpt-5.5'
};
