const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('smartslowmode')
    .setDescription('تفعيل وضع البطيء السريع (10 ثواني) لحماية الشات المؤقتة')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  async execute(interaction) {
    try {
      await interaction.channel.setRateLimitPerUser(10);
      await interaction.reply({ content: '⚡ **تم تفعيل الحماية السريعة!** تم ضبط الوضع البطيء على 10 ثواني.' });
    } catch (e) {
      await interaction.reply({ content: '❌ تعذر ضبط القناة.', ephemeral: true });
    }
  },
};