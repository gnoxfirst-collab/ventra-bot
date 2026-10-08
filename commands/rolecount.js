const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('rolecount').setDescription('معرفة عدد الرتب الموجودة في السيرفر'),
  async execute(interaction) {
    const rolesTotal = interaction.guild.roles.cache.size;
    await interaction.reply(`🏷️ إجمالي عدد الرتب في السيرفر هو: **${rolesTotal}** رتبة.`);
  }
};