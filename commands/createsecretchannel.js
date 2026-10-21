const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('createsecretchannel')
    .setDescription('إنشاء قناة كتابية سرية لرتبة محددة فقط')
    .addStringOption(option => option.setName('name').setDescription('اسم القناة').setRequired(true))
    .addRoleOption(option => option.setName('role').setDescription('الرتبة المسموح لها برؤيتها').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  async execute(interaction) {
    const name = interaction.options.getString('name');
    const role = interaction.options.getRole('role');

    try {
      const channel = await interaction.guild.channels.create({
        name: name,
        type: ChannelType.GuildText,
        permissionOverwrites: [
          { id: interaction.guild.roles.everyone.id, deny: [PermissionFlagsBits.ViewChannel] },
          { id: role.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages] },
          { id: interaction.client.user.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages] }
        ]
      });
      await interaction.reply({ content: `🔒 تم إنشاء القناة السرية بنجاح: ${channel} (مرئية لرتبة: **${role.name}**)` });
    } catch (e) {
      await interaction.reply({ content: '❌ حدث خطأ أثناء إنشاء القناة.', ephemeral: true });
    }
  },
};