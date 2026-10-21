const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('giveroleall')
    .setDescription('إعطاء رتبة معينة لجميع أعضاء السيرفر')
    .addRoleOption(option => option.setName('role').setDescription('الرتبة المراد توزيعها').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const role = interaction.options.getRole('role');
    await interaction.deferReply();

    const members = await interaction.guild.members.fetch();
    const targetMembers = members.filter(m => !m.user.bot && !m.roles.cache.has(role.id));

    let count = 0;
    for (const [, member] of targetMembers) {
      try {
        await member.roles.add(role);
        count++;
      } catch (e) {}
    }

    await interaction.editReply({ content: `✅ تم إعطاء رتبة **${role.name}** لـ **${count}** عضو.` });
  },
};