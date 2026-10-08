const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('serverfeatures').setDescription('عرض مزايا السيرفر الخاصة (إن وجدت)'),
  async execute(interaction) {
    const features = interaction.guild.features;
    if (features.length === 0) return interaction.reply('ℹ️ لا توجد مميزات خاصة مفعلة في هذا السيرفر.');
    await interaction.reply(`✨ مميزات السيرفر:\n\`${features.join(', ')}\``);
  }
};