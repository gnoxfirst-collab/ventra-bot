const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('untimeout').setDescription('رفع الميوت المؤقت عن العضو')
    .addUserOption(o => o.setName('user').setDescription('العضو').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const member = await interaction.guild.members.fetch(user.id);
    await member.timeout(null);
    await interaction.reply(`🔊 تم رفع الميوت عن العضو ${user.tag}.`);
  }
};