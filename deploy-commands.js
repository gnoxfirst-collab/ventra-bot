const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if ('data' in command && 'execute' in command) {
    commands.push(command.data.toJSON());
  }
}

// مصفوفة تعتمد على المتغيرات الموجودة لديك في Railway بالضبط
const bots = [
  { name: 'Bot 1', token: process.env.TOKEN_BOT1, clientId: process.env.CLIENT_ID },
  { name: 'Bot 2', token: process.env.TOKEN_BOT2, clientId: process.env.CLIENT_ID2 }
];

(async () => {
  for (const bot of bots) {
    if (!bot.token || !bot.clientId) {
      console.log(`⚠️ تخطي ${bot.name} لعدم توفر التوكن أو الـ Client ID الخاص به.`);
      continue;
    }

    const rest = new REST({ version: '10' }).setToken(bot.token);

    try {
      console.log(`⏳ جاري تسجيل ${commands.length} أمر لـ ${bot.name}...`);

      await rest.put(
        Routes.applicationCommands(bot.clientId),
        { body: commands },
      );

      console.log(`✅ تم تسجيل وتحديث الأوامر لـ ${bot.name} بنجاح!`);
    } catch (error) {
      console.error(`❌ حدث خطأ أثناء تسجيل الأوامر لـ ${bot.name}:`, error);
    }
  }
})();