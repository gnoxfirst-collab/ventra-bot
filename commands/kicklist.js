const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('kicklist').setDescription('قائمة إدارية مخصصة للاستعلام')
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
  async execute(interaction) {
    await interaction.reply('📋 نظام إدارة السيرفر يعمل بكفاءة تامة وجاهز لتنفيذ الأوامر.');
  }
};