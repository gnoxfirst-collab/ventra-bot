const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('creategamingvoice')
    .setDescription('إنشاء روم صوتي مخصص للألعاب وبث عالي الجودة')
    .addStringOption(option => option.setName('name').setDescription('اسم الروم').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  async execute(interaction) {
    const name = interaction.options.getString('name');

    try {
      const channel = await interaction.guild.channels.create({
        name: `🎮 | ${name}`,
        type: ChannelType.GuildVoice,
        bitrate: 96000
      });
      await interaction.reply({ content: `🎧 تم إنشاء روم الألعاب بنجاح: ${channel}` });
    } catch (e) {
      await interaction.reply({ content: '❌ لم أتمكن من إنشاء الروم الصوتي.', ephemeral: true });
    }
  },
};