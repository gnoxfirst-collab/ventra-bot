require('dotenv').config();
const { Client, GatewayIntentBits, Collection, ChannelType } = require('discord.js');
const fs = require('fs');
const path = require('path');

const token1 = process.env.TOKEN_BOT1;
const token2 = process.env.TOKEN_BOT2;

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
    console.log(`❌ Error loading command ${file}:`, err.message);
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
  return 'No Invite Permission';
}

global.client1Ref = null;
global.client2Ref = null;

async function main() {
  console.log(`📋 Loaded (${loadedCommandNames.length}) commands successfully:`);
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

  // التصحيح هنا: استبدال clientReady بـ ready
  client1.once('ready', async () => {
    global.client1Ref = client1;
    console.log(`🤖 Bot 1 Connected: (${client1.user.tag})`);
    console.log(`📊 Total Guilds: (${client1.guilds.cache.size})`);
    let index = 1;
    for (const [, guild] of client1.guilds.cache) {
      const invite = await getInviteLink(guild);
      console.log(`${index}. ${guild.name} | ID= ${guild.id} | INVITE= ${invite}`);
      index++;
    }
    console.log('-----------------------------------');
  });

  client2.once('ready', async () => {
    global.client2Ref = client2;
    console.log(`🤖 Bot 2 Connected: (${client2.user.tag})`);
    console.log(`📊 Total Guilds: (${client2.guilds.cache.size})`);
    let index = 1;
    for (const [, guild] of client2.guilds.cache) {
      const invite = await getInviteLink(guild);
      console.log(`${index}. ${guild.name} | ID= ${guild.id} | INVITE= ${invite}`);
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
  };

  client1.on('interactionCreate', handleInteraction);
  client2.on('interactionCreate', handleInteraction);

  if (token1) client1.login(token1);
  if (token2) client2.login(token2);
}

main();

process.on('unhandledRejection', () => {});
process.on('uncaughtException', () => {});