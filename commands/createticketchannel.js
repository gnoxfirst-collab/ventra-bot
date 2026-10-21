const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('createticketchannel')
    .setDescription('إنشاء روم تكت شخصي بين عضو والإدارة')
    .addUserOption(option => option.setName('user').setDescription('العضو المستهدف').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  async execute(interaction) {
    const target = interaction.options.getUser('user');

    try {
      const channel = await interaction.guild.channels.create({
        name: `ticket-${target.username}`,
        type: ChannelType.GuildText,
        permissionOverwrites: [
          { id: interaction.guild.roles.everyone.id, deny: [PermissionFlagsBits.ViewChannel] },
          { id: target.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages] },
          { id: interaction.client.user.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages] }
        ]
      });
      await interaction.reply({ content: `🎟️ تم إنشاء قناة التكت بنجاح: ${channel}` });
    } catch (e) {
      await interaction.reply({ content: '❌ تعذر إنشاء قناة التكت.', ephemeral: true });
    }
  },
};