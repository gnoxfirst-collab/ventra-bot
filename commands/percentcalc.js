const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('percentcalc')
    .setDescription('حساب النسبة المئوية لقيمة من إجمالي معين')
    .addNumberOption(option => option.setName('value').setDescription('الرقم الجزئي').setRequired(true))
    .addNumberOption(option => option.setName('total').setDescription('الرقم الإجمالي').setRequired(true)),

  async execute(interaction) {
    const val = interaction.options.getNumber('value');
    const total = interaction.options.getNumber('total');

    if (total === 0) {
      return interaction.reply({ content: '❌ لا يمكن القسمة على صفر.', ephemeral: true });
    }

    const result = ((val / total) * 100).toFixed(2);

    const embed = new EmbedBuilder()
      .setColor('#2ecc71')
      .setTitle('📐 نتيجة النسبة المئوية')
      .setDescription(`نسبة **${val}** من **${total}** هي:\n\n# \`${result}%\``)
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};