const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('userinfo2').setDescription('عرض معلومات العضو')
    .addUserOption(o => o.setName('user').setDescription('العضو')),
  async execute(interaction) {
    const user = interaction.options.getUser('user') || interaction.user;
    await interaction.reply(`👤 اسم المستخدم: ${user.tag}\n🆔 الآيدي: ${user.id}`);
  }
};