const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('botpingtest').setDescription('فحص اتصال البوت بقواعد ديسكورد'),
  async execute(interaction) {
    const sent = await interaction.reply({ content: '⚡ جاري قياس سرعة الاتصال...', fetchReply: true });
    const latency = sent.createdTimestamp - interaction.createdTimestamp;
    await interaction.reply(`🏓 سرعة استجابة البوت: **${latency}ms**`);
  }
};