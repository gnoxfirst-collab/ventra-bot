const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('randomnumber4').setDescription('اختيار رقم عشوائي بين رقمين تختارهما بنفسك')
    .addIntegerOption(o => o.setName('min').setDescription('الحد الأدنى').setRequired(true))
    .addIntegerOption(o => o.setName('max').setDescription('الحد الأقصى').setRequired(true)),
  async execute(interaction) {
    const min = interaction.options.getInteger('min');
    const max = interaction.options.getInteger('max');
    if (min >= max) return interaction.reply({ content: '❌ يجب أن يكون الحد الأدنى أقل من الحد الأقصى.', ephemeral: true });
    const result = Math.floor(Math.random() * (max - min + 1)) + min;
    await interaction.reply(`🎲 الرقم العشوائي بين ${min} و ${max} هو: **${result}**`);
  }
};