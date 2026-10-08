const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('membercount').setDescription('عرض عدد أعضاء السيرفر بالتفصيل'),
  async execute(interaction) {
    const guild = interaction.guild;
    await interaction.reply(`👥 إجمالي أعضاء السيرفر: **${guild.memberCount}** عضواً.`);
  }
};