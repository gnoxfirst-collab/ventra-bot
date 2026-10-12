const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('botcreator').setDescription('معرفة معلومات مطور بوت Aurebot'),
  async execute(interaction) {
    await interaction.reply(`المطورين : @inf.indira @azzam_0006`);
  }
};