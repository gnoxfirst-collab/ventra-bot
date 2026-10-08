const { Client, GatewayIntentBits, Collection, REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
const token = process.dotenv?.TOKEN || process.env.TOKEN || require('./config.json').token;
const clientId = process.env.CLIENT_ID || require('./config.json').clientId;

// السيرفرات التي تريد أن يظهر فيها الأمر
const ALLOWED_GUILDS = [
  '1557683815445692496', // السيرفر الأول
  '15505210204442818'   // السيرفر الثاني
];

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

client.commands = new Collection();
const commands = [];
const commandNames = new Set();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  
  if ('data' in command && 'execute' in command) {
    if (commandNames.has(command.data.name)) continue;
    commandNames.add(command.data.name);
    client.commands.set(command.data.name, command);
    commands.push(command.data.toJSON());
  }
}

const rest = new REST({ version: '10' }).setToken(token);

client.once('ready', async () => {
  console.log(`✅ البوت شغال أونلاين باسم: ${client.user.tag}`);
  console.log(`🔄 جاري تسجيل الأوامر في السيرفرات المحددة...`);

  // تسجيل الأوامر في كل سيرفر بشكل مستقل مع حماية لمنع توقف البوت لو حدث خطأ في سيرفر معين
  for (const guildId of ALLOWED_GUILDS) {
    try {
      await rest.put(
        Routes.applicationGuildCommands(clientId, guildId),
        { body: commands },
      );
      console.log(`✨ تم تسجيل الأوامر بنجاح في السيرفر: ${guildId}`);
    } catch (error) {
      console.log(`⚠️ تعذر تسجيل الأوامر في السيرفر ${guildId} (تأكد أن البوت موجود فيه).`);
    }
  }

  console.log(`🌐 روابط السيرفرات المتواجد فيها البوت (${client.guilds.cache.size}):`);
  
  for (const [id, guild] of client.guilds.cache) {
    try {
      const channels = guild.channels.cache.filter(c => c.isTextBased() && c.permissionsFor(guild.members.me).has('CreateInstantInvite'));
      
      if (channels.size > 0) {
        const channel = channels.first();
        const invite = await channel.createInvite({ maxAge: 0, maxUses: 0 }).catch(() => null);
        
        if (invite) {
          console.log(`- [ ${guild.name} ] ➔ https://discord.gg/${invite.code}`);
        } else {
          console.log(`- [ ${guild.name} ] ➔ (تعذر إنشاء رابط دعوة)`);
        }
      } else {
        console.log(`- [ ${guild.name} ] ➔ (لا توجد قناة نصية مناسبة)`);
      }
    } catch (err) {
      console.log(`- [ ${guild.name} ] ➔ (خطأ أثناء جلب الرابط)`);
    }
  }
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
  const command = client.commands.get(interaction.commandName);
  
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

client.login(token);