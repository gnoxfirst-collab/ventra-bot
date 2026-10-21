const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setchannelname')
    .setDescription('تغيير اسم القناة الكتابية الحالية')
    .addStringOption(option => option.setName('name').setDescription('الاسم الجديد للقناة').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  async execute(interaction) {
    const newName = interaction.options.getString('name');

    try {
      await interaction.channel.setName(newName);
      await interaction.reply({ content: `✏️ تم تغيير اسم القناة إلى: **${newName}**` });
    } catch (e) {
      await interaction.reply({ content: '❌ لم أتمكن من تغيير اسم القناة.', ephemeral: true });
    }
  },
};