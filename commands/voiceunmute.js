const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('voiceunmute')
    .setDescription('إلغاء الكتم الصوتي عن عضو بداخل الروم الصوتي')
    .addUserOption(option => option.setName('user').setDescription('العضو المستهدف').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers),

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const member = await interaction.guild.members.fetch(user.id);

    if (!member.voice.channel) {
      return interaction.reply({ content: '❌ هذا العضو ليس متواجداً في أي روم صوتي حالياً.', ephemeral: true });
    }

    try {
      await member.voice.setMute(false);
      await interaction.reply({ content: `🔊 تم رفع الكتم الصوتي عن العضو **${user.tag}**.` });
    } catch (e) {
      await interaction.reply({ content: '❌ لم أتمكن من رفع الكتم الصوتي.', ephemeral: true });
    }
  },
};