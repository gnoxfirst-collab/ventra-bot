const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('userroleslist')
    .setDescription('عرض قائمة بالرتب التي يحملها عضو معين')
    .addUserOption(option => option.setName('user').setDescription('العضو المستهدف').setRequired(true)),

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const member = await interaction.guild.members.fetch(user.id);

    const roles = member.roles.cache
      .filter(r => r.id !== interaction.guild.id)
      .map(r => r.toString())
      .join(', ') || 'لا يملك أي رتبة إضافية.';

    const embed = new EmbedBuilder()
      .setColor('#3498db')
      .setTitle(`🎭 رتب العضو: ${user.tag}`)
      .setDescription(roles)
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};