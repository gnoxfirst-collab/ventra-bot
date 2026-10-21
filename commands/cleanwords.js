const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('cleanwords')
    .setDescription('مسح الرسائل التي تحتوي على كلمة مخصصة في الشات')
    .addStringOption(option => option.setName('word').setDescription('الكلمة المراد مسح الرسائل المحتوية عليها').setRequired(true))
    .addIntegerOption(option => option.setName('amount').setDescription('عدد الرسائل للبحث فيها (1-100)').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    const word = interaction.options.getString('word').toLowerCase();
    const amount = interaction.options.getInteger('amount');

    const messages = await interaction.channel.messages.fetch({ limit: amount });
    const targetMessages = messages.filter(m => m.content.toLowerCase().includes(word));

    try {
      await interaction.channel.bulkDelete(targetMessages, true);
      await interaction.reply({ content: `🧹 تم حذف **${targetMessages.size}** رسالة تحتوي على الكلمة المحددة.`, ephemeral: true });
    } catch (e) {
      await interaction.reply({ content: '❌ تعذر مسح الرسائل.', ephemeral: true });
    }
  },
};