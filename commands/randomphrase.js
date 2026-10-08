const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('randomphrase').setDescription('عرض عبارة تحفيزية عشوائية للمبرمجين'),
  async execute(interaction) {
    const phrases = [
      "البرمجة هي فن تحويل الأفكار إلى واقع رقمي.",
      "كل خطأ برمجي هو درس جديد يتعلمه المطور.",
      "الكود النظيف هو أفضل توثيق للمبرمج المحترف."
    ];
    const phrase = phrases[Math.floor(Math.random() * phrases.length)];
    await interaction.reply(`💬 **رسالة ملهمة:**\n> ${phrase}`);
  }
};