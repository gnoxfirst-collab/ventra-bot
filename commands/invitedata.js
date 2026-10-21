const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('invitedata')
    .setDescription('عرض أعلى الأعضاء جلياً ودعوة للمستثمرين والسيرفر'),

  async execute(interaction) {
    try {
      const invites = await interaction.guild.invites.fetch();
      const topInviters = invites.map(inv => `${inv.inviter ? inv.inviter.tag : 'مجهول'}: **${inv.uses}** استخدام`).slice(0, 10).join('\n');

      const embed = new EmbedBuilder()
        .setColor('#1abc9c')
        .setTitle('📩 قائمة أعلى روابط الدعوة الموردة')
        .setDescription(topInviters || 'لا توجد دعوات مسجلة حالياً.')
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } catch (e) {
      await interaction.reply({ content: '❌ لا أملك صلاحية الوصول إلى بيانات الدعوات (Manage Server).', ephemeral: true });
    }
  },
};