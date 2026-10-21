const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('closeallvoice')
    .setDescription('قطع اتصال وإخلاء كافة الرومات الصوتية في السيرفر')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    await interaction.deferReply();
    const voiceChannels = interaction.guild.channels.cache.filter(c => c.type === ChannelType.GuildVoice);
    let count = 0;

    for (const [, channel] of voiceChannels) {
      for (const [, member] of channel.members) {
        try {
          await member.voice.disconnect();
          count++;
        } catch (e) {}
      }
    }

    await interaction.editReply({ content: `🚨 **تم الإخلاء!** تم فصل **${count}** عضو من كافة الرومات الصوتية.` });
  },
};