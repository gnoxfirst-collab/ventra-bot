require('dotenv').config();
const { Client, GatewayIntentBits, Collection, ChannelType } = require('discord.js');
const fs = require('fs');
const path = require('path');

const token1 = process.env.TOKEN_BOT1;
const token2 = process.env.TOKEN_BOT2;

// مسار مجلد الأوامر
const commandsPath = path.join(process.cwd(), 'commands');
const discordCommandsCollection = new Collection();

if (fs.existsSync(commandsPath)) {
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
      discordCommandsCollection.set(command.data.name, command);
    }
  }
} else {
  console.log('⚠️ مجلد الأوامر (commands) غير موجود، يرجى إنشاؤه.');
}

// دالة آمنة لجلب رابط الدعوة
async function getInviteLink(guild) {
  try {
    const textChannel = guild.channels.cache.find(
      c => c.type === ChannelType.GuildText && c.permissionsFor(guild.members.me)?.has('CreateInstantInvite')
    );
    if (textChannel) {
      const invite = await textChannel.createInvite({ maxAge: 0, maxUses: 0 });
      return invite.url;
    }
  } catch (err) {}
  return 'لا توجد صلاحية دعوة';
}

// دالة تشغيل البوت وطباعة بياناته بالطريقة التي طلبها تماماً
async function startSingleBot(token, botLabel) {
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
      // طباعة اسم البوت وتحته عدد السيرفرات وقائمتها بالتنسيق المطلوب
      console.log(`بوت (${client.user.tag})`);
      console.log(`عدد السيرفرات (${client.guilds.cache.size})`);

      let index = 1;
      for (const [, guild] of client.guilds.cache) {
        const inviteLink = await getInviteLink(guild);
        console.log(`${index}.${guild.name} ID= ${guild.id} INVIT LINK = ${inviteLink}`);
        index++;
      }
      console.log('-----------------------------------');
      resolve(client);
    });

    client.on('interactionCreate', async interaction => {
      if (!interaction.isChatInputCommand()) return;
      
      interaction.client.client1Ref = global.client1Ref;
      interaction.client.client2Ref = global.client2Ref;

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

    client.login(token).catch(err => {
      console.log(`[${botLabel}] ❌ خطأ في تسجيل الدخول:`, err.message);
      resolve(null);
    });
  });
}

global.client1Ref = null;
global.client2Ref = null;

async function main() {
  if (token1) {
    const client1 = await startSingleBot(token1, 'Bot 1');
    if (client1) global.client1Ref = client1;
  }

  if (token2) {
    const client2 = await startSingleBot(token2, 'Bot 2');
    if (client2) global.client2Ref = client2;
  }
}

main();

process.on('unhandledRejection', (reason) => {});
process.on('uncaughtException', (err) => {});