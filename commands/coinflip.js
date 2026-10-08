const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('roll').setDescription('رمي حظ أو نرد برقم عشوائي من 1 لـ 100'),
  async execute(interaction) {
    const result = Math.floor(Math.random() * 100) + 1;
    await interaction.reply(`🎲 لقد حصلت على الرقم: **${result}**`);
  }
};