const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pinmessage')
    .setDescription('تثبيت رسالة معينة في القناة الحالية')
    .addStringOption(option => option.setName('messageid').setDescription('آيدي الرسالة (Message ID)').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    const messageId = interaction.options.getString('messageid');

    try {
      const msg = await interaction.channel.messages.fetch(messageId);
      await msg.pin();
      await interaction.reply({ content: '📌 تم تثبيت الرسالة بنجاح في القناة.', ephemeral: true });
    } catch (e) {
      await interaction.reply({ content: '❌ لم يتم العثور على الرسالة في هذه القناة.', ephemeral: true });
    }
  },
};