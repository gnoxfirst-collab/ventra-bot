const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('serververificationlevel').setDescription('عرض تفاصيل أمان وحماية السيرفر'),
  async execute(interaction) {
    const level = interaction.guild.verificationLevel;
    await interaction.reply(`🛡️ درجة التحقق في السيرفر مقدرة بالمستوى: **${level}**`);
  }
};