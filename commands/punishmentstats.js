const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('punishmentstats')
    .setDescription('عرض عدد الحسابات المحظورة في قائمة الـ Bans للسيرفر')
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  async execute(interaction) {
    try {
      const bans = await interaction.guild.bans.fetch();
      
      const embed = new EmbedBuilder()
        .setColor('#e74c3c')
        .setTitle('🔨 إحصائيات الحظر عقوبات السيرفر')
        .setDescription(`إجمالي الحسابات المحظورة حالياً من السيرفر: **${bans.size}** حساب.`)
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } catch (e) {
      await interaction.reply({ content: '❌ لا أملك صلاحية عرض قائمة المحظورين.', ephemeral: true });
    }
  },
};