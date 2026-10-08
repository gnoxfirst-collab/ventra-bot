const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('serverroleslist').setDescription('عرض معلومات سريعة عن رتب السيرفر'),
  async execute(interaction) {
    const count = interaction.guild.roles.cache.size;
    await interaction.reply(`🏷️ يمتلك هذا السيرفر عدد إجمالي **${count}** رتبة مرتبة ومنظمة.`);
  }
};