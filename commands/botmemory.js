const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('botmemory').setDescription('معرفة استهلاك البوت للذاكرة العشوائية (RAM)'),
  async execute(interaction) {
    const usedMemory = process.memoryUsage().heapUsed / 1024 / 1024;
    await interaction.reply(`💾 استهلاك البوت الحالي للذاكرة: **${usedMemory.toFixed(2)} MB**`);
  }
};