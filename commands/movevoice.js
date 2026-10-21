const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('movevoice')
    .setDescription('نقل جميع المتواجدين في روم صوتي إلى روم صوتي آخر')
    .addChannelOption(option => option.setName('from').setDescription('الروم الحالي').addChannelTypes(ChannelType.GuildVoice).setRequired(true))
    .addChannelOption(option => option.setName('to').setDescription('الروم الهدف').addChannelTypes(ChannelType.GuildVoice).setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.MoveMembers),

  async execute(interaction) {
    const fromChannel = interaction.options.getChannel('from');
    const toChannel = interaction.options.getChannel('to');

    await interaction.deferReply();
    let movedCount = 0;

    for (const [, member] of fromChannel.members) {
      try {
        await member.voice.setChannel(toChannel);
        movedCount++;
      } catch (e) {}
    }

    await interaction.editReply({ content: `🚚 تم نقل **${movedCount}** عضو من ${fromChannel} إلى ${toChannel}.` });
  },
};