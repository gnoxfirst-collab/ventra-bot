const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('serverinfo').setDescription('عرض معلومات السيرفر'),
  async execute(interaction) {
    const { guild } = interaction;
    await interaction.reply(`📊 اسم السيرفر: ${guild.name}\n👥 عدد الأعضاء: ${guild.memberCount}\n👑 المالك: <@${guild.ownerId}>`);
  }
};