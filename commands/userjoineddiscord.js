const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('userjoineddiscord').setDescription('معرفة تاريخ إنشاء حساب ديسكورد لعضو معين')
    .addUserOption(o => o.setName('user').setDescription('العضو المراد فحصه')),
  async execute(interaction) {
    const user = interaction.options.getUser('user') || interaction.user;
    const createdDate = user.createdAt.toDateString();
    await interaction.reply(`📅 تم إنشاء حساب ديسكورد لـ **${user.tag}** بتاريخ: \`${createdDate}\``);
  }
};