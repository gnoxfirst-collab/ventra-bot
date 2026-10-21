const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('createnewinvite')
    .setDescription('إنشاء رابط دعوة دائم جديد للسيرفر')
    .setDefaultMemberPermissions(PermissionFlagsBits.CreateInstantInvite),

  async execute(interaction) {
    try {
      const invite = await interaction.channel.createInvite({ maxAge: 0, maxUses: 0 });
      await interaction.reply({ content: `🔗 رابط الدعوة الدائم الخاص بالسيرفر:\n${invite.url}` });
    } catch (e) {
      await interaction.reply({ content: '❌ تعذر إنشاء رابط الدعوة.', ephemeral: true });
    }
  },
};