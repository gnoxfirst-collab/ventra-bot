const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('blockmentions')
    .setDescription('منع الأعضاء من استخدام منشن @everyone في هذه القناة')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  async execute(interaction) {
    try {
      await interaction.channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { MentionEveryone: false });
      await interaction.reply({ content: '🚫 تم منع التنابيه والمنشن الجماعي في هذه القناة.' });
    } catch (error) {
      await interaction.reply({ content: '❌ تعذر تعديل صلاحيات القناة.', ephemeral: true });
    }
  },
};