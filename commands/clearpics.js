const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clearpics')
    .setDescription('حذف الرسائل التي تحتوي على صور ومرفقات فقط')
    .addIntegerOption(option => option.setName('amount').setDescription('عدد الرسائل للبحث فيها (1-100)').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    const amount = interaction.options.getInteger('amount');
    const messages = await interaction.channel.messages.fetch({ limit: amount });
    const imageMessages = messages.filter(m => m.attachments.size > 0);

    try {
      await interaction.channel.bulkDelete(imageMessages, true);
      await interaction.reply({ content: `🖼️ تم بنجاح حذف **${imageMessages.size}** رسالة تحتوي على صور ومرفقات.`, ephemeral: true });
    } catch (e) {
      await interaction.reply({ content: '❌ تعذر حذف الرسائل، قد تكون قديمة جداً.', ephemeral: true });
    }
  },
};