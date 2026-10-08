const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('serverowner').setDescription('معرفة مالك السيرفر الأساسي'),
  async execute(interaction) {
    const owner = await interaction.guild.fetchOwner();
    await interaction.reply(`👑 مالك السيرفر هو: **${owner.user.tag}** (الآيدي: \`${owner.id}\`)`);
  }
};