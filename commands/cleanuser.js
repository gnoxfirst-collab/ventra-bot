const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('cleanuser')
    .setDescription('مسح رسائل عضو معين فقط من الشات')
    .addUserOption(option => option.setName('target').setDescription('العضو المراد مسح رسائله').setRequired(true))
    .addIntegerOption(option => option.setName('amount').setDescription('عدد الرسائل للبحث فيها (1-100)').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    const target = interaction.options.getUser('target');
    const amount = interaction.options.getInteger('amount');

    const messages = await interaction.channel.messages.fetch({ limit: amount });
    const userMessages = messages.filter(m => m.author.id === target.id);

    try {
      await interaction.channel.bulkDelete(userMessages, true);
      await interaction.reply({ content: `🧹 تم حذف **${userMessages.size}** رسالة للعضو ${target}.`, ephemeral: true });
    } catch (error) {
      await interaction.reply({ content: '❌ تعذر حذف الرسائل، قد تكون قديمة جداً.', ephemeral: true });
    }
  },
};