const TelegramBot = require('node-telegram-bot-api');
const chatId = process.argv[2];
const TOKEN_BOT_TELEGRAM = process.env.BOT_TOKEN;
const LINTER_RESULT = process.argv[3];
const TEST_RESULT = process.argv[4]
const UPDATE_README_RESULT = process.argv[5]
const DEPLOY_RESULT = process.argv[6]

const bot = new TelegramBot(TOKEN_BOT_TELEGRAM, {polling: true});

// console.log(chatId + botToken + msg);

const msg = `S´ha executat la pipeline de jenkins amb els següents resultats: \n 
- Linter_stage: ${LINTER_RESULT} \n
- Tests_stage: ${TEST_RESULT} \n
- Update_readme_stage: ${UPDATE_README_RESULT} \n
- Deploy_to_Verce_stage: ${DEPLOY_RESULT}`;

bot.sendMessage(chatId, msg)
  .then(() => {
    console.log('Message sent');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error:', error);
    process.exit(1);
  });