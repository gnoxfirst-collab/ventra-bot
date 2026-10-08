const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('calc').setDescription('حساب عملية رياضية بسيطة (جمع رقمين)')
    .addNumberOption(o => o.setName('num1').setDescription('الرقم الأول').setRequired(true))
    .addNumberOption(o => o.setName('num2').setDescription('الرقم الثاني').setRequired(true)),
  async execute(interaction) {
    const n1 = interaction.options.getNumber('num1');
    const n2 = interaction.options.getNumber('num2');
    await interaction.reply(`🧮 ناتج جمع ${n1} +${n2} هو: **${n1 + n2}**`);
  }
};