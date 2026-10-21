const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('cleanlinks')
    .setDescription('مسح الرسائل التي تحتوي على روابط فقط من الشات')
    .addIntegerOption(option => option.setName('amount').setDescription('عدد الرسائل للبحث فيها (1-100)').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    const amount = interaction.options.getInteger('amount');
    const messages = await interaction.channel.messages.fetch({ limit: amount });
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const linkMessages = messages.filter(m => urlRegex.test(m.content));

    try {
      await interaction.channel.bulkDelete(linkMessages, true);
      await interaction.reply({ content: `🔗 تم مسح **${linkMessages.size}** رسالة تحتوي على روابط.`, ephemeral: true });
    } catch (e) {
      await interaction.reply({ content: '❌ تعذر مسح الرسائل.', ephemeral: true });
    }
  },
};