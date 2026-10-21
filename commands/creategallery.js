const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('creategallery')
    .setDescription('إنشاء قناة مخصصة فقط لنشر الصور والميديا')
    .addStringOption(option => option.setName('name').setDescription('اسم قناة معرض الصور').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  async execute(interaction) {
    const name = interaction.options.getString('name');

    try {
      const channel = await interaction.guild.channels.create({
        name: `🖼️ | ${name}`,
        type: ChannelType.GuildText,
        topic: 'هذه القناة مخصصة لنشر الصور والميديا فقط.'
      });
      await interaction.reply({ content: `🖼️ تم إنشاء قناة الصور بنجاح: ${channel}` });
    } catch (e) {
      await interaction.reply({ content: '❌ حدث خطأ أثناء إنشاء القناة.', ephemeral: true });
    }
  },
};