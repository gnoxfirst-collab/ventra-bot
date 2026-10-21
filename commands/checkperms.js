const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('checkperms')
    .setDescription('التحقق من صلاحيات عضو أو البوت بداخل القناة الحالية')
    .addUserOption(option => option.setName('user').setDescription('العضو المراد فحصه').setRequired(false)),

  async execute(interaction) {
    const targetUser = interaction.options.getUser('user') || interaction.user;
    const member = await interaction.guild.members.fetch(targetUser.id);
    const channelPermissions = interaction.channel.permissionsFor(member).toArray();

    const embed = new EmbedBuilder()
      .setColor('#9b59b6')
      .setTitle(`🛡️ صلاحيات العضو: ${targetUser.tag}`)
      .setDescription(`\`\`\`\n${channelPermissions.join('\n') || 'لا توجد صلاحيات خضر'}\n\`\`\``)
      .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};