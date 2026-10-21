const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stripadminperms')
    .setDescription('سحب الصلاحيات الإدارية الحساسة (Administrator) من رتبة محددة')
    .addRoleOption(option => option.setName('role').setDescription('الرتبة المراد نزع الصلاحية منها').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const role = interaction.options.getRole('role');

    try {
      await role.setPermissions(role.permissions.remove(PermissionFlagsBits.Administrator));
      await interaction.reply({ content: `🛡️ تم بنجاح سحب الصلاحية الإدارية العالية من رتبة **${role.name}**.` });
    } catch (e) {
      await interaction.reply({ content: '❌ لم أتمكن من تعديل صلاحيات الرتبة.', ephemeral: true });
    }
  },
};