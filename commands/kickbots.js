const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kickbots')
    .setDescription('طرد كافة البوتات من السيرفر (حماية ضد البوتات العشوائية)')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const members = await interaction.guild.members.fetch();
    const bots = members.filter(m => m.user.bot && m.id !== interaction.client.user.id);

    let kickedCount = 0;
    for (const [, bot] of bots) {
      try {
        await bot.kick('تطهير البوتات الإداري');
        kickedCount++;
      } catch (e) {}
    }

    await interaction.editReply({ content: `🤖 تم بنجاح طرد **${kickedCount}** بوت من السيرفر.` });
  },
};