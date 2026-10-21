const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('createannouncementchannel')
    .setDescription('إنشاء قناة إعلانات مجهزة ومغلقة تلقائياً')
    .addStringOption(option => option.setName('name').setDescription('اسم القناة').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  async execute(interaction) {
    const name = interaction.options.getString('name');

    try {
      const channel = await interaction.guild.channels.create({
        name: name,
        type: ChannelType.GuildText,
        permissionOverwrites: [
          { id: interaction.guild.roles.everyone.id, deny: [PermissionFlagsBits.SendMessages] },
          { id: interaction.client.user.id, allow: [PermissionFlagsBits.SendMessages] }
        ]
      });
      await interaction.reply({ content: `📢 تم إنشاء قناة الإعلانات المغلقة بنجاح: ${channel}` });
    } catch (e) {
      await interaction.reply({ content: '❌ حدث خطأ أثناء إنشاء القناة.', ephemeral: true });
    }
  },
};