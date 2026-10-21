const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('temprole')
    .setDescription('إعطاء رتبة لعضو لمدة محددة بالدقائق ثم سحبها تلقائياً')
    .addUserOption(option => option.setName('user').setDescription('العضو المستهدف').setRequired(true))
    .addRoleOption(option => option.setName('role').setDescription('الرتبة').setRequired(true))
    .addIntegerOption(option => option.setName('minutes').setDescription('المدة بالدقائق').setRequired(true).setMinValue(1))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const role = interaction.options.getRole('role');
    const minutes = interaction.options.getInteger('minutes');
    const member = await interaction.guild.members.fetch(user.id);

    try {
      await member.roles.add(role);
      await interaction.reply({ content: `⏳ تم إعطاء رتبة **${role.name}** للعضو **${user.tag}** لمدة **${minutes}** دقيقة.` });

      setTimeout(async () => {
        try {
          await member.roles.remove(role);
        } catch (e) {}
      }, minutes * 60 * 1000);
    } catch (e) {
      await interaction.reply({ content: '❌ لم أتمكن من إضافة الرتبة، تحقق من صلاحيات البوت.', ephemeral: true });
    }
  },
};