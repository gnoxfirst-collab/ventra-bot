const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unlockdown')
    .setDescription('إلغاء قفل الطوارئ وإعادة فتح جميع قنوات السيرفر')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    await interaction.deferReply();
    const channels = interaction.guild.channels.cache.filter(c => c.isTextBased());
    let unlockedCount = 0;

    for (const [, channel] of channels) {
      try {
        await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { SendMessages: null });
        unlockedCount++;
      } catch (e) {}
    }

    await interaction.editReply({ content: `🟢 **تم إنهاء وضع الطوارئ!** تم إعادة فتح **${unlockedCount}** قناة.` });
  },
};