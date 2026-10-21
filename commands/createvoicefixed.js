const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('createvoicefixed')
    .setDescription('إنشاء روم صوتي مخصص مع تحديد عدد المسموح لهم بالدخول')
    .addStringOption(option => option.setName('name').setDescription('اسم الروم الصوتي').setRequired(true))
    .addIntegerOption(option => option.setName('limit').setDescription('أقصى عدد أعضاء (1-99)').setRequired(true).setMinValue(1).setMaxValue(99))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  async execute(interaction) {
    const name = interaction.options.getString('name');
    const limit = interaction.options.getInteger('limit');

    try {
      const channel = await interaction.guild.channels.create({
        name: name,
        type: ChannelType.GuildVoice,
        userLimit: limit
      });
      await interaction.reply({ content: `🔊 تم إنشاء الروم الصوتي **${channel.name}** بسعة **${limit}** أعضاء.` });
    } catch (e) {
      await interaction.reply({ content: '❌ حدث خطأ أثناء إنشاء الروم الصوتي.', ephemeral: true });
    }
  },
};