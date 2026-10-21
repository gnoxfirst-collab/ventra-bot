const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('antilinkstatus')
    .setDescription('عرض حالة نظام حماية الروابط في السيرفر')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor('#e67e22')
      .setTitle('🛡️ حالة حماية الروابط (Anti-Link System)')
      .setDescription('نظام الحماية من نشر روابط السيرفرات الخارجية أو الإعلانات مفعل ويعمل بكفاءة عالية على حذف أي رابط مخالف تلقائياً.')
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};