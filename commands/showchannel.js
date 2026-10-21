const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('showchannel')
    .setDescription('إعادة إظهار القناة المخفية للأعضاء')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  async execute(interaction) {
    try {
      await interaction.channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { ViewChannel: null });
      await interaction.reply({ content: '🐵 تم إعادة إظهار القناة للجميع بنجاح.' });
    } catch (error) {
      await interaction.reply({ content: '❌ لم أتمكن من إظهار القناة.', ephemeral: true });
    }
  },
};