const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('feedback2').setDescription('تقييم أداء البوت أو السيرفر')
    .addStringOption(o => o.setName('text').setDescription('رسالة التقييم').setRequired(true)),
  async execute(interaction) {
    await interaction.reply({ content: '⭐ شكراً لك على تقييمك ورأيك، تم استلامه بنجاح!', ephemeral: true });
  }
};