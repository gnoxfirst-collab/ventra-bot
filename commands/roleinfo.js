const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('roleinfo2').setDescription('معرفة معلومات عن رتبة معينة بالسيرفر')
    .addRoleOption(o => o.setName('role').setDescription('اختر الرتبة').setRequired(true)),
  async execute(interaction) {
    const role = interaction.options.getRole('role');
    await interaction.reply(`🏷️ اسم الرتبة: ${role.name}\n🆔 الآيدي: \`${role.id}\`\n👥 عدد الأعضاء بها: ${role.members.size}`);
  }
};