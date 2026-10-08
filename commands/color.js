const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('color').setDescription('توليد لون عشوائي مع كوده'),
  async execute(interaction) {
    const randomColor = Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    await interaction.reply(`🎨 كود اللون العشوائي الناتج: **#${randomColor.toUpperCase()}**`);
  }
};