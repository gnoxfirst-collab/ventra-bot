const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

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

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log(`⏳ جاري تسجيل ${commands.length} أمر لدى ديسكورد...`);

    // تسجيل الأوامر عامة (Global Commands)
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands },
    );

    console.log('✅ تم تسجيل وتحديث كافة الأوامر بنجاح!');
  } catch (error) {
    console.error('❌ حدث خطأ أثناء تسجيل الأوامر:', error);
  }
})();