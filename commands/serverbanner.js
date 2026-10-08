const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('serverbanner').setDescription('عرض بانر السيرفر إن وجد'),
  async execute(interaction) {
    const banner = interaction.guild.bannerURL({ size: 1024 });
    if (!banner) return interaction.reply('❌ هذا السيرفر لا يملك بانر خاص.');
    await interaction.reply(`banner بانر سيرفر **${interaction.guild.name}**:\n${banner}`);
  }
};