const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('botlist')
    .setDescription('عرض قائمة بجميع البوتات المتواجدة في السيرفر'),

  async execute(interaction) {
    await interaction.deferReply();
    const members = await interaction.guild.members.fetch();
    const bots = members.filter(m => m.user.bot);

    const botNames = bots.map(b => `• ${b.user.tag} (\`${b.id}\`)`).join('\n') || 'لا توجد بوتات.';

    const embed = new EmbedBuilder()
      .setColor('#3498db')
      .setTitle(`🤖 قائمة البوتات في السيرفر (إجمالي: ${bots.size})`)
      .setDescription(botNames)
      .setTimestamp();

    await interaction.editReply({ embeds: [embed] });
  },
};