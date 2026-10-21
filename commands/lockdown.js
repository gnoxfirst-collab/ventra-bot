const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('lockdown')
    .setDescription('قفل جميع القنوات الكتابية بالسيرفر حالة الطوارئ')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    await interaction.deferReply();
    const channels = interaction.guild.channels.cache.filter(c => c.isTextBased());
    let lockedCount = 0;

    for (const [, channel] of channels) {
      try {
        await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { SendMessages: false });
        lockedCount++;
      } catch (e) {}
    }

    await interaction.editReply({ content: `🚨 **وضع الطوارئ مفعل!** تم قفل **${lockedCount}** قناة كتابية بنجاح.` });
  },
};