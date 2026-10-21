const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('createcategory')
    .setDescription('إنشاء فئة قنوات (Category) جديدة')
    .addStringOption(option => option.setName('name').setDescription('اسم الفئة').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  async execute(interaction) {
    const name = interaction.options.getString('name');

    try {
      const category = await interaction.guild.channels.create({
        name: name,
        type: ChannelType.GuildCategory,
      });
      await interaction.reply({ content: `📁 تم إنشاء الكاتيجوري بنجاح: **${category.name}**` });
    } catch (error) {
      await interaction.reply({ content: '❌ حدث خطأ أثناء إنشاء الفئة.', ephemeral: true });
    }
  },
};