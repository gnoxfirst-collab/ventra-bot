const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('quickrole')
    .setDescription('إنشاء رتبة جديدة فوراً بلون مخصص')
    .addStringOption(option => option.setName('name').setDescription('اسم الرتبة').setRequired(true))
    .addStringOption(option => option.setName('color').setDescription('لون الرتبة (مثال: #ff0000 أو BLUE)').setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),

  async execute(interaction) {
    const name = interaction.options.getString('name');
    const color = interaction.options.getString('color') || '#99aab5';

    try {
      const role = await interaction.guild.roles.create({
        name: name,
        color: color,
        reason: 'إنشاء رتبة سريعة بواسطة الأمر',
      });
      await interaction.reply({ content: `🎨 تم إنشاء الرتبة بنجاح: ${role}` });
    } catch (error) {
      await interaction.reply({ content: '❌ تعذر إنشاء الرتبة، تأكد من كود اللون وصلاحياتك.', ephemeral: true });
    }
  },
};