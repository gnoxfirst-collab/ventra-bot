const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('servermuteall')
    .setDescription('إسكات جميع المتواجدين في الروم الصوتي الخاص بك')
    .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers),

  async execute(interaction) {
    const member = await interaction.guild.members.fetch(interaction.user.id);
    const voiceChannel = member.voice.channel;

    if (!voiceChannel) {
      return interaction.reply({ content: '❌ يجب أن تكون متواجدأ في روم صوتي لتنفيذ هذا الأمر.', ephemeral: true });
    }

    let count = 0;
    for (const [, targetMember] of voiceChannel.members) {
      if (targetMember.id !== interaction.user.id) {
        try {
          await targetMember.voice.setMute(true);
          count++;
        } catch (e) {}
      }
    }

    await interaction.reply({ content: `🔇 تم إسكات **${count}** عضو في الروم الصوتي ${voiceChannel.name}.` });
  },
};