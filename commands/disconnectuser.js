const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('disconnectuser')
    .setDescription('طرد عضو من الروم الصوتي المتواجد به')
    .addUserOption(option => option.setName('user').setDescription('العضو المراد طرده من الروم').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.MoveMembers),

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const member = await interaction.guild.members.fetch(user.id);

    if (!member.voice.channel) {
      return interaction.reply({ content: '❌ هذا العضو ليس في أي روم صوتي حالياً.', ephemeral: true });
    }

    try {
      await member.voice.disconnect();
      await interaction.reply({ content: `🚫 تم فصل العضو **${user.tag}** من الروم الصوتي.` });
    } catch (e) {
      await interaction.reply({ content: '❌ تعذر فصل العضو.', ephemeral: true });
    }
  },
};