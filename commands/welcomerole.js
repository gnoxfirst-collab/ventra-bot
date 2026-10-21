const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('welcomeroleinfo')
    .setDescription('عرض تفاصيل نظام إعطاء الرتب التلقائية للمنضمين الجدد')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor('#2ecc71')
      .setTitle('✨ نظام Auto-Role للمنضمين')
      .setDescription('يقوم البوت بمنح رتبة الأعضاء الجدد تلقائياً فور دخولهم السيرفر لضمان تنظيم الرتب.')
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};