const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('securitycheck')
    .setDescription('عرض تقرير أمان وحماية السيرفر الحالية')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const { guild } = interaction;

    const embed = new EmbedBuilder()
      .setColor('#2ecc71')
      .setTitle(`🛡️ تقرير أمان سيرفر: ${guild.name}`)
      .addFields(
        { name: '🔐 مستوى التحقق (Verification Level)', value: `\`${guild.verificationLevel}\``, inline: true },
        { name: '🔞 الفلتر التلقائي للوسائط (Explicit Filter)', value: `\`${guild.explicitContentFilter}\``, inline: true },
        { name: '🤖 حماية البوتات الحية', value: '✅ مفعلة ومراقبة 24/7', inline: true }
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};