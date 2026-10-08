const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('clear').setDescription('مسح الرسائل')
    .addIntegerOption(o => o.setName('amount').setDescription('عدد الرسائل').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  async execute(interaction) {
    const amount = interaction.options.getInteger('amount');
    await interaction.channel.bulkDelete(amount, true);
    await interaction.reply({ content: `🧹 تم مسح ${amount} رسالة بنجاح.`, ephemeral: true });
  }
};