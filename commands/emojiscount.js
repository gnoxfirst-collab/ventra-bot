const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('emojiscount').setDescription('معرفة عدد الإيموجيز المتاحة في السيرفر'),
  async execute(interaction) {
    const emojisTotal = interaction.guild.emojis.cache.size;
    await interaction.reply(`😀 يمتلك هذا السيرفر إجمالي **${emojisTotal}** إيموجي مخصص.`);
  }
};