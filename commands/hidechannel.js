const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('hidechannel')
    .setDescription('إخفاء القناة الحالية عن الرتب العادية')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  async execute(interaction) {
    try {
      await interaction.channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { ViewChannel: false });
      await interaction.reply({ content: '🙈 تم إخفاء هذه القناة عن جميع الأعضاء.' });
    } catch (error) {
      await interaction.reply({ content: '❌ لم أتمكن من إخفاء القناة.', ephemeral: true });
    }
  },
};