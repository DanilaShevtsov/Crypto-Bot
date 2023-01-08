import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';
require('dotenv').config();
import { registrate } from './accounts';

const BOT_TOKEN: string = process.env.BOT_TOKEN!;
const bot = new Telegraf(BOT_TOKEN);



bot.start((ctx) => {
  const userName = ctx.message.from.first_name;
  ctx.reply(`${userName}! Welcome to Awesome Card Sell Bot!`);
  
  // registrate(tgUserId);
});

bot.help((ctx) => ctx.reply('Send me a sticker'));

bot.on(message('sticker'), (ctx) => ctx.reply('👍'));

bot.hears('hi', (ctx) => ctx.reply('Hey there'));


bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));