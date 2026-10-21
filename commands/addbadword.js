const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('automodinfo')
    .setDescription('عرض تفاصيل وإعدادات التصفية التلقائية للرسائل (Auto-Mod)')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor('#9b59b6')
      .setTitle('🛡️ نظام Auto-Moderation الفعال')
      .setDescription('البوت يقوم بمراقبة الشات تلقائياً وحذف السيرفرات الإعلانية، روابط الديسكورد، والكلمات النابية لحماية القنوات 24/7.')
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};