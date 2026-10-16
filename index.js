require('dotenv').config();
const { Client, GatewayIntentBits, Collection, ChannelType } = require('discord.js');
const fs = require('fs');
const path = require('path');

const token1 = process.env.TOKEN_BOT1;
const token2 = process.env.TOKEN_BOT2;

// قراءة الأوامر
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
const discordCommandsCollection = new Collection();

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if ('data' in command && 'execute' in command) {
    discordCommandsCollection.set(command.data.name, command);
  }
}

// دالة آمنة لجلب رابط الدعوة بدون تعطيل الكود
async function getInviteLink(guild) {
  try {
    const textChannel = guild.channels.cache.find(
      c => c.type === ChannelType.GuildText && c.permissionsFor(guild.members.me)?.has('CreateInstantInvite')
    );
    if (textChannel) {
      const invite = await textChannel.createInvite({ maxAge: 0, maxUses: 0 });
      return invite.url;
    }
  } catch (err) {
    // تجاهل الخطأ في حال عدم وجود صلاحية
  }
  return 'لا توجد صلاحية دعوة';
}

// دالة لتشغيل وطباعة بيانات كل بوت بترتيب دقيق
async function startBot(token, botLabel) {
  return new Promise((resolve) => {
    const client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
      ],
      rest: { timeout: 30000 }
    });

    client.commands = discordCommandsCollection;

    client.on('ready', async () => {
      console.log(`بوت (${client.user.tag})`);
      console.log(`عدد السيرفرات (${client.guilds.cache.size})`);

      let index = 1;
      // استخدام for...of لضمان طباعة السيرفرات بالترتيب وبدون تداخل
      for (const [, guild] of client.guilds.cache) {
        const inviteLink = await getInviteLink(guild);
        console.log(`${index}.${guild.name} ID= ${guild.id} INVIT LINK = ${inviteLink}`);
        index++;
      }
      console.log('\n-----------------------------------\n');
      resolve();
    });

    client.on('interactionCreate', async interaction => {
      if (!interaction.isChatInputCommand()) return;
      const command = client.commands.get(interaction.commandName);
      if (!command) return;
      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(error);
      }
    });

    client.login(token).catch(err => {
      console.log(`[${botLabel}] ❌ خطأ في تسجيل الدخول:`, err.message);
      resolve();
    });
  });
}

// تشغيل البوتات بالترتيب (البوت الأول ثم الثاني) لمنع تداخل التيرمنال
async function main() {
  if (token1) {
    await startBot(token1, 'Bot 1');
  } else {
    console.log('⚠️ TOKEN_BOT1 غير موجود');
  }

  if (token2) {
    await startBot(token2, 'Bot 2');
  } else {
    console.log('⚠️ TOKEN_BOT2 غير موجود');
  }
}

main();

// منع البوت من الكراش
process.on('unhandledRejection', (reason) => console.log('🔴 خطأ غير معالج:', reason));
process.on('uncaughtException', (err) => console.log('🔴 استثناء غير ملتقط:', err));