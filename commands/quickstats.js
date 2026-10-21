const { SlashCommandBuilder, EmbedBuilder, ChannelType } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('quickstats')
    .setDescription('عرض ملخص إحصائيات القنوات والأعضاء والرتب بالسيرفر'),

  async execute(interaction) {
    const { guild } = interaction;
    const textChannels = guild.channels.cache.filter(c => c.type === ChannelType.GuildText).size;
    const voiceChannels = guild.channels.cache.filter(c => c.type === ChannelType.GuildVoice).size;
    const rolesCount = guild.roles.cache.size;

    const embed = new EmbedBuilder()
      .setColor('#34495e')
      .setTitle(`📈 إحصائيات سريعة: ${guild.name}`)
      .addFields(
        { name: '💬 قنوات كتابية', value: `\`${textChannels}\``, inline: true },
        { name: '🔊 قنوات صوتية', value: `\`${voiceChannels}\``, inline: true },
        { name: '🎭 إجمالي الرتب', value: `\`${rolesCount}\``, inline: true }
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};