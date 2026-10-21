const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clearroles')
    .setDescription('تجريد عضو من جميع رتبه في السيرفر')
    .addUserOption(option => option.setName('user').setDescription('العضو المستهدف').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const member = await interaction.guild.members.fetch(user.id);

    try {
      const rolesToRemove = member.roles.cache.filter(role => role.id !== interaction.guild.id);
      await member.roles.remove(rolesToRemove);
      await interaction.reply({ content: `🧹 تم تجريد العضو **${user.tag}** من جميع رتبه بنجاح.` });
    } catch (error) {
      await interaction.reply({ content: '❌ تعذر تجريد العضو من الرتب، تحقق من صلاحيات البوت.', ephemeral: true });
    }
  },
};