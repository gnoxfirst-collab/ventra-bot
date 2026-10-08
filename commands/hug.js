const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('unprivate').setDescription('إلغاء خصوصية الروم').setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
  async execute(interaction) {
    await interaction.channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { ViewChannel: null });
    await interaction.reply('🔓 تم إلغاء خصوصية الروم.');
  }
};