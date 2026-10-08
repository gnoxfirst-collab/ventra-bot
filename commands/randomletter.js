const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('randomletter').setDescription('اختيار حرف إنجليزي عشوائي'),
  async execute(interaction) {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomL = letters[Math.floor(Math.random() * letters.length)];
    await interaction.reply(`🔤 الحرف العشوائي الناتج هو: **${randomL}**`);
  }
};