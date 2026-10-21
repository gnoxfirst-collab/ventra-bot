const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('sendreviewcard')
    .setDescription('إرسال بطاقة تقييم وتغذية راجعة للسيرفر')
    .addStringOption(option => option.setName('feedback').setDescription('رأيك أو تقييمك').setRequired(true)),

  async execute(interaction) {
    const feedback = interaction.options.getString('feedback');

    const embed = new EmbedBuilder()
      .setColor('#f1c40f')
      .setTitle('⭐ تقييم جديد للسيرفر')
      .setDescription(`**من:** ${interaction.user}\n\n**التقييم:**\n${feedback}`)
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};