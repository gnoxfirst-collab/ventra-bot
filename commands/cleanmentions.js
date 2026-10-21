const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('cleanmentions')
    .setDescription('حذف الرسائل التي تحتوي على منشن لأعضاء أو رتب')
    .addIntegerOption(option => option.setName('amount').setDescription('عدد الرسائل للبحث فيها (1-100)').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    const amount = interaction.options.getInteger('amount');
    const messages = await interaction.channel.messages.fetch({ limit: amount });
    const mentionMessages = messages.filter(m => m.mentions.users.size > 0 || m.mentions.roles.size > 0);

    try {
      await interaction.channel.bulkDelete(mentionMessages, true);
      await interaction.reply({ content: `🧹 تم حذف **${mentionMessages.size}** رسالة تحتوي على منشن.`, ephemeral: true });
    } catch (e) {
      await interaction.reply({ content: '❌ تعذر مسح الرسائل.', ephemeral: true });
    }
  },
};