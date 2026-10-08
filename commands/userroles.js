const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('userroles').setDescription('معرفة عدد رتب عضو معين في السيرفر')
    .addUserOption(o => o.setName('user').setDescription('العضو المراد فحصه')),
  async execute(interaction) {
    const member = interaction.options.getMember('user') || interaction.member;
    const rolesCount = member.roles.cache.size - 1; // استثناء رتبة @everyone
    await interaction.reply(`🏷️ العضو **${member.user.tag}** يمتلك عدد \`${rolesCount}\` رتبة في هذا السيرفر.`);
  }
};