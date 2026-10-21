const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('directalert')
    .setDescription('إرسال تنبيه مباشر ومميز بداخل الشات')
    .addUserOption(option => option.setName('target').setDescription('العضو المعني بالتنبيه').setRequired(true))
    .addStringOption(option => option.setName('note').setDescription('مضمون التنبيه').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    const target = interaction.options.getUser('target');
    const note = interaction.options.getString('note');

    const alertEmbed = new EmbedBuilder()
      .setColor('#f1c40f')
      .setTitle('⚠️ تنبيه مباشر من الإدارة')
      .setDescription(`${target}، يرجى والانتباه للنقطة التالية:\n\n**${note}**`)
      .setTimestamp();

    await interaction.reply({ content: `${target}`, embeds: [alertEmbed] });
  },
};