const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('deafenuser')
    .setDescription('تعطيل سماع الصوت (Deafen) لعضو في الروم الصوتي')
    .addUserOption(option => option.setName('user').setDescription('العضو المستهدف').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.DeafenMembers),

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const member = await interaction.guild.members.fetch(user.id);

    if (!member.voice.channel) {
      return interaction.reply({ content: '❌ هذا العضو ليس متواجداً في أي روم صوتي حالياً.', ephemeral: true });
    }

    try {
      await member.voice.setDeaf(true);
      await interaction.reply({ content: `🎧 تم تعطيل السماع للعضو **${user.tag}** في الروم الصوتي.` });
    } catch (e) {
      await interaction.reply({ content: '❌ لم أتمكن من تنفيذ الأمر.', ephemeral: true });
    }
  },
};