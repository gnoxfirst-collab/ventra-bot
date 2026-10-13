require('dotenv').config();
const { Client, GatewayIntentBits, Collection, REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// قراءة التوكنات من ملف البيئة .env
const token1 = process.env.TOKEN_BOT1;
const token2 = process.env.TOKEN_BOT2;

// قراءة الأوامر مرة واحدة لتستخدمها البوتات
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
const botCommands = [];
const commandNames = new Set();
const discordCommandsCollection = new Collection();

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if ('data' in command && 'execute' in command) {
    if (commandNames.has(command.data.name)) continue;
    commandNames.add(command.data.name);
    discordCommandsCollection.set(command.data.name, command);
    botCommands.push(command.data.toJSON());
  }
}

// ==========================================
// 1. إعداد وتشغيل البوت الأول (Client 1)
// ==========================================
if (token1) {
  const client1 = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMembers
    ],
    rest: { timeout: 30000 }
  });

  client1.commands = discordCommandsCollection;

  client1.on('ready', () => {
    console.log(`[Bot 1] ✅ شغال أونلاين باسم: ${client1.user.tag}`);
  });

  client1.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
    const command = client1.commands.get(interaction.commandName);
    if (!command) return;
    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      if (!interaction.replied && !interaction.deferred) {
        await interaction.reply({ content: '❌ حدث خطأ أثناء تنفيذ الأمر!', ephemeral: true });
      }
    }
  });

  client1.login(token1).catch(err => console.error('[Bot 1] ❌ خطأ في تسجيل الدخول:', err));
}

// ==========================================
// 2. إعداد وتشغيل البوت الثاني (Client 2)
// ==========================================
if (token2) {
  const client2 = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMembers
    ],
    rest: { timeout: 30000 }
  });

  client2.commands = discordCommandsCollection;

  client2.on('ready', () => {
    console.log(`[Bot 2] ✅ شغال أونلاين باسم: ${client2.user.tag}`);
  });

  client2.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
    const command = client2.commands.get(interaction.commandName);
    if (!command) return;
    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      if (!interaction.replied && !interaction.deferred) {
        await interaction.reply({ content: '❌ حدث خطأ أثناء تنفيذ الأمر!', ephemeral: true });
      }
    }
  });

  client2.login(token2).catch(err => console.error('[Bot 2] ❌ خطأ في تسجيل الدخول:', err));
}

// منع البوت من الكراش عند حدوث أخطاء غير متوقعة
process.on('unhandledRejection', (reason, promise) => {
    console.log('🔴 خطأ غير معالج:', reason);
});

process.on('uncaughtException', (err, origin) => {
    console.log('🔴 استثناء غير ملتقط:', err);
});

process.on('uncaughtExceptionMonitor', (err, origin) => {
    console.log('🔴 مراقبة الاستثناءات:', err);
});