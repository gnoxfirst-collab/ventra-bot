const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('movevoiceserver')
    .setDescription('نقل كافة الأعضاء في كل الرومات الصوتية إلى روم صوتي واحد محدد')
    .addChannelOption(option => option.setName('target').setDescription('الروم الصوتي المستهدف').addChannelTypes(ChannelType.GuildVoice).setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.MoveMembers),

  async execute(interaction) {
    const targetChannel = interaction.options.getChannel('target');
    await interaction.deferReply();

    const voiceChannels = interaction.guild.channels.cache.filter(c => c.type === ChannelType.GuildVoice);
    let count = 0;

    for (const [, channel] of voiceChannels) {
      if (channel.id === targetChannel.id) continue;
      for (const [, member] of channel.members) {
        try {
          await member.voice.setChannel(targetChannel);
          count++;
        } catch (e) {}
      }
    }

    await interaction.editReply({ content: `🚚 تم تجميع ونقل **${count}** عضو من جميع الرومات الصوتية إلى ${targetChannel}.` });
  },
};