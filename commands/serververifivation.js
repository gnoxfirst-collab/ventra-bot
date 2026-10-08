const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('serververification').setDescription('معرفة مستوى الحماية والتأكيد في السيرفر'),
  async execute(interaction) {
    const level = interaction.guild.verificationLevel;
    await interaction.reply(`🛡️ مستوى التحقق والأمان في السيرفر هو المستوى رقم: **${level}**`);
  }
};