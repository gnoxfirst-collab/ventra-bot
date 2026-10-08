const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('pingme').setDescription('اختبار التنبيه الشخصي'),
  async execute(interaction) {
    await interaction.reply({ content: `🔔 أهلاً بك ${interaction.user}، النظام يعمل بشكل سليم معك!`, allowedMentions: { users: [interaction.user.id] } });
  }
};