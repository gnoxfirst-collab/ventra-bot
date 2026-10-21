const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('staffping')
    .setDescription('إرسال تنبيه عاجل للطاقم الإداري')
    .addStringOption(option => option.setName('reason').setDescription('سبب التنبيه العاجل').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    const reason = interaction.options.getString('reason');

    const embed = new EmbedBuilder()
      .setColor('#e74c3c')
      .setTitle('🚨 استدعاء عاجل للإدارة')
      .setDescription(`**السبب:** ${reason}\n\n**بواسطة:** ${interaction.user}`)
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};