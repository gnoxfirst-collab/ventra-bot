const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('serverchannels').setDescription('عرض إجمالي عدد رومات السيرفر'),
  async execute(interaction) {
    const channels = interaction.guild.channels.cache;
    const textChannels = channels.filter(c => c.type === 0).size;
    const voiceChannels = channels.filter(c => c.type === 2).size;
    await interaction.reply(`📂 إجمالي الرومات:\n💬 رومات الكتابة: **${textChannels}**\n🔊 رومات الصوت: **${voiceChannels}**`);
  }
};