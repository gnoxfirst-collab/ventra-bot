const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rolepercentages')
    .setDescription('عرض إحصائيات أعداد الأعضاء في رتب السيرفر'),

  async execute(interaction) {
    const roles = interaction.guild.roles.cache
      .filter(r => r.id !== interaction.guild.id)
      .sort((a, b) => b.position - a.position)
      .map(r => `• **${r.name}**: \`${r.members.size}\` عضو`)
      .slice(0, 15)
      .join('\n');

    const embed = new EmbedBuilder()
      .setColor('#9b59b6')
      .setTitle('📊 إحصائيات رتب السيرفر الأساسية')
      .setDescription(roles || 'لا توجد رتب إضافية.')
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};