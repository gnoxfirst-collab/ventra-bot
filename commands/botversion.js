const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('botversion').setDescription('معرفة إصدار مكتبة ديسكورد المستخدمة'),
  async execute(interaction) {
    const { version } = require('discord.js');
    await interaction.reply(`📦 يعمل البوت حالياً بإصدار مكتبة Discord.js v${version}`);
  }
};