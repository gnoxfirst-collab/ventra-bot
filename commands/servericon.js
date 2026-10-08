const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('servericon').setDescription('عرض شعار (أيقونة) السيرفر'),
  async execute(interaction) {
    const icon = interaction.guild.displayAvatarURL({ size: 1024, dynamic: true });
    if (!icon) return interaction.reply('❌ هذا السيرفر لا يملك أيقونة.');
    await interaction.reply(`🖼️ شعار سيرفر **${interaction.guild.name}**:\n${icon}`);
  }
};