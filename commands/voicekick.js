const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('voicekick')
    .setDescription('فصل عضو من الروم الصوتي المتواجد فيه')
    .addUserOption(option => option.setName('target').setDescription('العضو المراد فصله').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.MoveMembers),

  async execute(interaction) {
    const target = interaction.options.getUser('target');
    const member = await interaction.guild.members.fetch(target.id);

    if (!member.voice.channel) {
      return interaction.reply({ content: '❌ هذا العضو ليس متواجداً في أي روم صوتي حالياً.', ephemeral: true });
    }

    try {
      await member.voice.disconnect();
      await interaction.reply({ content: `🔇 تم فصل العضو **${target.tag}** من الروم الصوتي بنجاح.` });
    } catch (e) {
      await interaction.reply({ content: '❌ لم أتمكن من فصل العضو.', ephemeral: true });
    }
  },
};