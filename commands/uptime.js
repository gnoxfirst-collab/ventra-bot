const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('uptime').setDescription('معرفة مدة تشغيل البوت'),
  async execute(interaction) {
    let totalSeconds = (interaction.client.uptime / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);
    await interaction.reply(`⏱️ مدة تشغيل البوت: ${hours} ساعة، ${minutes} دقيقة، ${seconds} ثانية.`);
  }
};