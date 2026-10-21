const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('lockallvoice')
    .setDescription('قفل إمكانية الانضمام لجميع الرومات الصوتية حالة الطوارئ')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    await interaction.deferReply();
    const voiceChannels = interaction.guild.channels.cache.filter(c => c.type === ChannelType.GuildVoice);
    let count = 0;

    for (const [, channel] of voiceChannels) {
      try {
        await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { Connect: false });
        count++;
      } catch (e) {}
    }

    await interaction.editReply({ content: `🔇 **تم قفل الرومات الصوتية!** تم منع الانضمام في **${count}** روم صوتي.` });
  },
};