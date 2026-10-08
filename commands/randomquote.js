const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('randomquote').setDescription('عرض حكمة أو مقولة تحفيزية عشوائية'),
  async execute(interaction) {
    const quotes = [
      "النجاح ليس عدم ارتكاب الأخطاء، النجاح هو عدم تكرارها.",
      "اعمل بصمت ودع نجاحك يصنع الضجيج.",
      "المبرمج العظيم هو من يحل المشكلة قبل أن تقع.",
      "لا توجد إم مستحيلة، يوجد كود لم يتم ضبطه بعد!"
    ];
    const q = quotes[Math.floor(Math.random() * quotes.length)];
    await interaction.reply(`💡 **حكمة اليوم:**\n> ${q}`);
  }
};