require('dotenv').config();
const { Client, GatewayIntentBits, Collection, ChannelType, Events } = require('discord.js');
const fs = require('fs');
const path = require('path');

const token1 = process.env.TOKEN_BOT1;
const token2 = process.env.TOKEN_BOT2;

// قراءة الأوامر وتخزينها
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
const discordCommandsCollection = new Collection();

const loadedCommandNames = [];

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  try {
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
      discordCommandsCollection.set(command.data.name, command);
      loadedCommandNames.push(command.data.name);
    }
  } catch (err) {
    console.log(`❌ خطأ في تحميل ملف الأمر ${file}:`, err.message);
  }
}

// دالة جلب رابط الدعوة للسيرفرات
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

// متغيرات عامة لمراجع البوتات
global.client1Ref = null;
global.client2Ref = null;

async function main() {
  console.log(`📋 تم تحميل (${loadedCommandNames.length}) أمر بنجاح:`);
  console.log(loadedCommandNames.join(', '));
  console.log('-----------------------------------');

  const intents = [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ];

  const client1 = new Client({ intents });
  const client2 = new Client({ intents });

  client1.commands = discordCommandsCollection;
  client2.commands = discordCommandsCollection;

  // استخدام Events.ClientReady بدلاً من 'ready' للتخلص من التحذير
  client1.on(Events.ClientReady, async () => {
    global.client1Ref = client1;
    console.log(`🤖 البوت الأول (${client1.user.tag}) متصل!`);
    console.log(`📊 عدد السيرفرات: (${client1.guilds.cache.size})`);
    let index = 1;
    for (const [, guild] of client1.guilds.cache) {
      const invite = await getInviteLink(guild);
      console.log(`${index}.${guild.name} ID= ${guild.id} INVIT LINK = ${invite}`);
      index++;
    }
    console.log('-----------------------------------');
  });

  client2.on(Events.ClientReady, async () => {
    global.client2Ref = client2;
    console.log(`🤖 البوت الثاني (${client2.user.tag}) متصل!`);
    console.log(`📊 عدد السيرفرات: (${client2.guilds.cache.size})`);
    let index = 1;
    for (const [, guild] of client2.guilds.cache) {
      const invite = await getInviteLink(guild);
      console.log(`${index}.${guild.name} ID= ${guild.id} INVIT LINK = ${invite}`);
      index++;
    }
    console.log('-----------------------------------');
  });

  const handleInteraction = async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    
    interaction.client.client1Ref = global.client1Ref;
    interaction.client.client2Ref = global.client2Ref;

    const command = discordCommandsCollection.get(interaction.commandName);
    if (!command) return;
    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
    }