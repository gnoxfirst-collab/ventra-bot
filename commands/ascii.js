const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('ascii').setDescription('أمر إداري ترحيبي مخصص'),
  async execute(interaction) {
    await interaction.reply(`🌟 مرحباً بك في لوحة تحكم أوامر **VENTRA** المتكاملة.`);
  }
};