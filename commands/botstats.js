const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('botstats').setDescription('عرض إحصائيات عامة عن تشغيل البوت'),
  async execute(interaction) {
    const guildsCount = interaction.client.guilds.cache.size;
    await interaction.reply(`📊 إحصائيات البوت:\n🌐 عدد السيرفرات المتصل بها: **${guildsCount}**\n⚙️ النظام يعمل بكفاءة تامة.`);
  }
};