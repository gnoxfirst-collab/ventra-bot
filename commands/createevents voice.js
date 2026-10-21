const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('createeventvoice')
    .setDescription('إنشاء روم صوتي مخصص للمسابقات والفعاليات')
    .addStringOption(option => option.setName('name').setDescription('اسم الفعالية').setRequired(true))
    .addIntegerOption(option => option.setName('limit').setDescription('عدد المشاركين').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  async execute(interaction) {
    const name = interaction.options.getString('name');
    const limit = interaction.options.getInteger('limit');

    try {
      const channel = await interaction.guild.channels.create({
        name: `🏆 | ${name}`,
        type: ChannelType.GuildVoice,
        userLimit: limit
      });
      await interaction.reply({ content: `🎤 تم إنشاء روم الفعالية بنجاح: ${channel}` });
    } catch (e) {
      await interaction.reply({ content: '❌ تعذر إنشاء الروم الصوتي.', ephemeral: true });
    }
  },
};