const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('botinfoext').setDescription('معلومات تفصيلية إضافية عن البوت'),
  async execute(interaction) {
    await interaction.reply(`🤖 بوت **Aurebot** يعمل بأعلى كفاءة وبنظام أوامر السلاش المتكاملة.`);
  }
};