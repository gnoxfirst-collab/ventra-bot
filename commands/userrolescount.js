const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('userrolescount').setDescription('عدد رتب عضو معين في السيرفر')
    .addUserOption(o => o.setName('user').setDescription('العضو')),
  async execute(interaction) {
    const member = interaction.options.getMember('user') || interaction.member;
    const count = member.roles.cache.size - 1;
    await interaction.reply(`🏷️ يمتلك العضو **${member.user.tag}** عدد \`${count}\` رتبة.`);
  }
};