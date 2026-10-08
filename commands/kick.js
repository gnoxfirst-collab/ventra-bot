const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('ban').setDescription('حظر عضو من السيرفر')
    .addUserOption(o => o.setName('user').setDescription('العضو').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
  async execute(interaction) {
    const user = interaction.options.getUser('user');
    await interaction.guild.members.ban(user);
    await interaction.reply(`🔨 تم حظر العضو ${user.tag} بنجاح.`);
  }
};