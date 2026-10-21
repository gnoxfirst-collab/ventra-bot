const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('giverolebots')
    .setDescription('إعطاء رتبة معينة لجميع البوتات في السيرفر')
    .addRoleOption(option => option.setName('role').setDescription('الرتبة المراد إعطاؤها').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),

  async execute(interaction) {
    const role = interaction.options.getRole('role');
    await interaction.deferReply();

    const members = await interaction.guild.members.fetch();
    const botMembers = members.filter(m => m.user.bot && !m.roles.cache.has(role.id));

    let count = 0;
    for (const [, bot] of botMembers) {
      try {
        await bot.roles.add(role);
        count++;
      } catch (e) {}
    }

    await interaction.editReply({ content: `🤖 تم منح رتبة **${role.name}** لـ **${count}** بوت بالسيرفر.` });
  },
};