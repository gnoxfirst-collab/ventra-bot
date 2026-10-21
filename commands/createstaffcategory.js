const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('createstaffcategory')
    .setDescription('إنشاء فئة قنوات (Category) سري ومغلق للإدارة فقط')
    .addStringOption(option => option.setName('name').setDescription('اسم الفئة الإدارية').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const name = interaction.options.getString('name');

    try {
      const category = await interaction.guild.channels.create({
        name: `🛡️ | ${name}`,
        type: ChannelType.GuildCategory,
        permissionOverwrites: [
          { id: interaction.guild.roles.everyone.id, deny: [PermissionFlagsBits.ViewChannel] },
          { id: interaction.client.user.id, allow: [PermissionFlagsBits.ViewChannel] }
        ]
      });
      await interaction.reply({ content: `📁 تم إنشاء الفئة الإدارية بنجاح: **${category.name}**` });
    } catch (e) {
      await interaction.reply({ content: '❌ حدث خطأ أثناء إنشاء الفئة.', ephemeral: true });
    }
  },
};