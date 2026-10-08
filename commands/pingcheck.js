const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('pingcheck').setDescription('عرض تأخير الاتصال (WebSocket Ping)'),
  async execute(interaction) {
    const wsPing = interaction.client.ws.ping;
    await interaction.reply(`⚡ سرعة اتصال البوت (WebSocket): **${wsPing}ms**`);
  }
};