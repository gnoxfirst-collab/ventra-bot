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

async function startBot(token, botLabel, botNum) {
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
    
    // ربط المراجع لكي يتعرف أمر go-out عليها
    if (botNum === 1) client.client1Ref = client;
    if (botNum === 2) client.client2Ref = client;

    client.on('ready', async () => {
      console.log(`بوت (${client.user.tag})`);
      console.log(`عدد السيرفرات (${client.guilds.cache.size})`);

      let index = 1;
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
      
      // تمرير المراجع لجميع البوتات لكي تعمل الأوامر المشتركة
      interaction.client.client1Ref = global.client1Ref;
      interaction.client.client2Ref = global.client2Ref;

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

// متغيرات عامة للمراجع
global.client1Ref = null;
global.client2Ref = null;

async function main() {
  if (token1) {
    const c1 = new Client({ intents: [GatewayIntentBits.Guilds] });
    // سيتم تخزين المرجع عند التشغيل الفعلي
  }
  
  // تشغيل بالطريقة العادية المتسلسلة
  const client1 = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers] });
  const client2 = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers] });

  client1.commands = discordCommandsCollection;
  client2.commands = discordCommandsCollection;

  client1.on('ready', async () => {
    global.client1Ref = client1;
    console.log(`بوت (${client1.user.tag})`);
    console.log(`عدد السيرفرات (${client1.guilds.cache.size})`);
    let index = 1;
    for (const [, guild] of client1.guilds.cache) {
      const invite = await getInviteLink(guild);
      console.log(`${index}.${guild.name} ID= ${guild.id} INVIT LINK = ${invite}`);
      index++;
    }
    console.log('-----------------------------------');
  });

  client2.on('ready', async () => {
    global.client2Ref = client2;
    console.log(`بوت (${client2.user.tag})`);
    console.log(`عدد السيرفرات (${client2.guilds.cache.size})`);
    let index = 1;
    for (const [, guild] of client2.guilds.cache) {
      const invite = await getInviteLink(guild);
      console.log(`${index}.${guild.name} ID= ${guild.id} INVIT LINK = ${invite}`);
      index++;
    }
    console.log('-----------------------------------');
  });

  // حدث التفاعل المشترك للأوامر
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
  };

  client1.on('interactionCreate', handleInteraction);
  client2.on('interactionCreate', handleInteraction);

  if (token1) client1.login(token1);
  if (token2) client2.login(token2);
}

main();

process.on('unhandledRejection', (reason) => {});
process.on('uncaughtException', (err) => {});