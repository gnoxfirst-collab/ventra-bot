const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('memberjoined').setDescription('معرفة تاريخ انضمام عضو معين للسيرفر')
    .addUserOption(o => o.setName('user').setDescription('العضو المراد الاستعلام عنه')),
  async execute(interaction) {
    const member = interaction.options.getMember('user') || interaction.member;
    const joinedDate = member.joinedAt.toDateString();
    await interaction.reply(`📅 انضم العضو **${member.user.tag}** إلى السيرفر بتاريخ: \`${joinedDate}\``);
  }
};