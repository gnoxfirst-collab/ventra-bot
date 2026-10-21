const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('cleanbotmsgs')
    .setDescription('حذف رسائل وأوامر البوتات فقط من الشات')
    .addIntegerOption(option => option.setName('amount').setDescription('عدد الرسائل للبحث فيها (1-100)').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    const amount = interaction.options.getInteger('amount');
    const messages = await interaction.channel.messages.fetch({ limit: amount });
    const botMessages = messages.filter(m => m.author.bot);

    try {
      await interaction.channel.bulkDelete(botMessages, true);
      await interaction.reply({ content: `🤖 تم مسح **${botMessages.size}** رسالة تابعة للبوتات.`, ephemeral: true });
    } catch (e) {
      await interaction.reply({ content: '❌ حدث خطأ أثناء مسح رسائل البوتات.', ephemeral: true });
    }
  },
};