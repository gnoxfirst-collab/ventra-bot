const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('striprolebots')
    .setDescription('إزالة رتبة معينة من كافة البوتات بالسيرفر')
    .addRoleOption(option => option.setName('role').setDescription('الرتبة المراد سحبها').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),

  async execute(interaction) {
    const role = interaction.options.getRole('role');
    await interaction.deferReply();

    const members = await interaction.guild.members.fetch();
    const botMembers = members.filter(m => m.user.bot && m.roles.cache.has(role.id));

    let count = 0;
    for (const [, bot] of botMembers) {
      try {
        await bot.roles.remove(role);
        count++;
      } catch (e) {}
    }

    await interaction.editReply({ content: `🤖 تم سحب رتبة **${role.name}** من **${count}** بوت.` });
  },
};