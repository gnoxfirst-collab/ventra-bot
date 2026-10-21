const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kicknoavatar')
    .setDescription('طرد الأعضاء الذين لا يملكون صورة حساب شخصية (Avatar)')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });
    const members = await interaction.guild.members.fetch();
    const noAvatarMembers = members.filter(m => !m.user.bot && !m.user.avatar);

    let count = 0;
    for (const [, member] of noAvatarMembers) {
      try {
        await member.kick('حساب بدون صورة شخصية');
        count++;
      } catch (e) {}
    }

    await interaction.editReply({ content: `🛡️ تم بنجاح طرد **${count}** عضو لا يملكون صورة حساب.` });
  },
};