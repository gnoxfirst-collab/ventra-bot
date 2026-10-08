const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('botuptime').setDescription('معرفة مدة تشغيل البوت بالدقائق والساعات بدقة'),
  async execute(interaction) {
    let seconds = Math.floor(interaction.client.uptime / 1000);
    let hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    let minutes = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    await interaction.reply(`⏱️ مدة التشغيل المستمرة: **${hours}** ساعة، **${minutes}** دقيقة، **${secs}** ثانية.`);
  }
};