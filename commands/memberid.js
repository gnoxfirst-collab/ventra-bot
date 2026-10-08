const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('memberid').setDescription('إحضار الآيدي (ID) الخاص بأي عضو سريعاً')
    .addUserOption(o => o.setName('user').setDescription('العضو').setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser('user');
    await interaction.reply(`🆔 آيدي العضو ${user.tag} هو: \`${user.id}\``);
  }
};