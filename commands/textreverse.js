const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('textreverse').setDescription('عكس الحروف النصية المدخلة')
    .addStringOption(o => o.setName('text').setDescription('النص المراد عكسه').setRequired(true)),
  async execute(interaction) {
    const text = interaction.options.getString('text');
    const reversed = text.split('').reverse().join('');
    await interaction.reply(`🔄 النص بعد العكس:\n\`${reversed}\``);
  }
};