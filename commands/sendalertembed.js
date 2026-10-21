const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('sendalertembed')
    .setDescription('إرسال تنبيه ملون في الشات بطريقة أنيقة')
    .addStringOption(option => option.setName('message').setDescription('نص التنبيه').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    const msg = interaction.options.getString('message');

    const embed = new EmbedBuilder()
      .setColor('#e74c3c')
      .setTitle('🚨 تنبيه مهم من الإدارة')
      .setDescription(msg)
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};