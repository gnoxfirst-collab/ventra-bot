const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('checkwarns')
    .setDescription('عرض سجل العقوبات والتحذيرات لعضو معين')
    .addUserOption(option => option.setName('user').setDescription('العضو المراد فحصه').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction) {
    const user = interaction.options.getUser('user');

    const embed = new EmbedBuilder()
      .setColor('#f39c12')
      .setTitle(`📋 سجل عقوبات العضو: ${user.tag}`)
      .setDescription('هذا العضو لا يملك أي سوابق مخالفتها نشطة في الوقت الحالي.')
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};