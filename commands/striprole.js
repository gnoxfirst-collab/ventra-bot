const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('striprole')
    .setDescription('إزالة رتبة معينة من جميع الأعضاء الحاملين لها')
    .addRoleOption(option => option.setName('role').setDescription('الرتبة المراد إزالتها من الجميع').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),

  async execute(interaction) {
    const role = interaction.options.getRole('role');
    await interaction.deferReply();

    const members = await interaction.guild.members.fetch();
    const membersWithRole = members.filter(m => m.roles.cache.has(role.id));

    let count = 0;
    for (const [, member] of membersWithRole) {
      try {
        await member.roles.remove(role);
        count++;
      } catch (e) {}
    }

    await interaction.editReply({ content: `🧹 تم بنجاح سحب رتبة **${role.name}** من **${count}** عضو.` });
  },
};