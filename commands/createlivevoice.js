const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('createlivevoice')
    .setDescription('إنشاء روم صوتي مخصص للبث المباشر والأستريم')
    .addStringOption(option => option.setName('name').setDescription('اسم الروم').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  async execute(interaction) {
    const name = interaction.options.getString('name');

    try {
      const channel = await interaction.guild.channels.create({
        name: `🔴 | ${name}`,
        type: ChannelType.GuildVoice
      });
      await interaction.reply({ content: `📡 تم إنشاء روم البث المباشر بنجاح: ${channel}` });
    } catch (e) {
      await interaction.reply({ content: '❌ تعذر إنشاء الروم الصوتي.', ephemeral: true });
    }
  },
};