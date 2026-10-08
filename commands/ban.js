const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('slap').setDescription('إعطاء كف لشخص')
    .addUserOption(o => o.setName('user').setDescription('الشخص').setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser('user');
    await interaction.reply(`👋 قام ${interaction.user.username} بإعطاء كف لـ ${user.username}!`);
  }
};