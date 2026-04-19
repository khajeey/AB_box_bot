const { Telegraf, Markup } = require('telegraf');
const bot = new Telegraf('8446486322:AAFkCLeQ24a-NjIraLQ6X6Gq1Q_dH95vmsI');

bot.start((ctx) => {
  ctx.reply('Mini App kalkulyatorni oching:',
    Markup.inlineKeyboard([
      [Markup.button.webApp('Kalkulyatorni ochish', 'https://ab-box.vercel.app')]
    ])
  );
});

bot.launch();
