const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('serverregion').setDescription('معرفة منطقة السيرفر الحالية'),
  async execute(interaction) {
    const region = interaction.guild.preferredLocale || 'غير محدد';
    await interaction.reply(`🌍 لغة/منطقة السيرفر المفضلة: \`${region}\``);
  }
};