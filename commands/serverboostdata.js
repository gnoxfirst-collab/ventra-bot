const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('serverboostdate').setDescription('معرفة تاريخ بوست السيرفر الخاص بك'),
  async execute(interaction) {
    const member = interaction.member;
    if (!member.premiumSince) return interaction.reply('❌ أنت لم تقم بعمل بوست لهذا السيرفر.');
    await interaction.reply(`💎 لقد قمت بعمل بوست لهذا السيرفر بتاريخ: \`${member.premiumSince.toDateString()}\``);
  }
};