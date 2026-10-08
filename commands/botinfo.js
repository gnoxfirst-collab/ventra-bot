const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('botinfo').setDescription('عرض معلومات البوت وبرمجته'),
  async execute(interaction) {
    await interaction.reply(`🤖 بوت **VENTRA** يعمل بنظام الأوامر المتكاملة وبأعلى كفاءة.`);
  }
};