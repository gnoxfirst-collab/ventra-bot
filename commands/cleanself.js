const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('cleanself')
    .setDescription('مسح كافة الرسائل الخاصة بهذا البوت من القناة')
    .addIntegerOption(option => option.setName('amount').setDescription('عدد الرسائل للبحث فيها (1-100)').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    const amount = interaction.options.getInteger('amount');
    const messages = await interaction.channel.messages.fetch({ limit: amount });
    const myMessages = messages.filter(m => m.author.id === interaction.client.user.id);

    try {
      await interaction.channel.bulkDelete(myMessages, true);
      await interaction.reply({ content: `🤖 تم مسح **${myMessages.size}** رسالة خاصة بالبوت.`, ephemeral: true });
    } catch (e) {
      await interaction.reply({ content: '❌ تعذر مسح الرسائل.', ephemeral: true });
    }
  },
};