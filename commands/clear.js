const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('kick').setDescription('طرد عضو من السيرفر')
    .addUserOption(o => o.setName('user').setDescription('العضو').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
  async execute(interaction) {
    const user = interaction.options.getUser('user');
    await interaction.guild.members.kick(user);
    await interaction.reply(`👢 تم طرد العضو ${user.tag} بنجاح.`);
  }
};