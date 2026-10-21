const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('norolelist')
    .setDescription('عرض قائمة الأعضاء الذين ليس لديهم أي رتبة')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),

  async execute(interaction) {
    await interaction.deferReply();
    const members = await interaction.guild.members.fetch();
    const noRoleMembers = members.filter(m => !m.user.bot && m.roles.cache.size === 1); // 1 = @everyone

    const list = noRoleMembers.map(m => `• ${m.user.tag} (\`${m.id}\`)`).slice(0, 20).join('\n') || 'جميع الأعضاء لديهم رتب.';

    const embed = new EmbedBuilder()
      .setColor('#e67e22')
      .setTitle(`👥 قائمة الأعضاء بدون رتب (إجمالي: ${noRoleMembers.size})`)
      .setDescription(list)
      .setTimestamp();

    await interaction.editReply({ embeds: [embed] });
  },
};