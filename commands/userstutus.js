const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('userstatus').setDescription('معرفة حالة العضو (نشط، غائب، إلخ)')
    .addUserOption(o => o.setName('user').setDescription('العضو المراد فحصه')),
  async execute(interaction) {
    const member = interaction.options.getMember('user') || interaction.member;
    const status = member.presence?.status || 'offline';
    await interaction.reply(`🟢 حالة العضو **${member.user.tag}** الحالية هي: \`${status}\``);
  }
};