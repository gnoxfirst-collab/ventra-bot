const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clonechannel')
    .setDescription('نسخ القناة الحالية وإعادة إنشائها فارغة بنسبة 100%')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  async execute(interaction) {
    const channel = interaction.channel;

    try {
      const clonedChannel = await channel.clone();
      await channel.delete();
      await clonedChannel.send(`✨ تم إعادة تجديد القناة بنجاح بواسطة ${interaction.user}`);
    } catch (error) {
      await interaction.reply({ content: '❌ حدث خطأ أثناء محاولة استنساخ القناة.', ephemeral: true });
    }
  },
};