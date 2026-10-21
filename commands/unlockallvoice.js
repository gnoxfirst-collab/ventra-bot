const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unlockallvoice')
    .setDescription('إعادة فتح إمكانية الانضمام لجميع الرومات الصوتية')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    await interaction.deferReply();
    const voiceChannels = interaction.guild.channels.cache.filter(c => c.type === ChannelType.GuildVoice);
    let count = 0;

    for (const [, channel] of voiceChannels) {
      try {
        await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { Connect: null });
        count++;
      } catch (e) {}
    }

    await interaction.editReply({ content: `🔊 **تم إعادة فتح الرومات الصوتية!** تم السماح بالانضمام في **${count}** روم صوتي.` });
  },
};