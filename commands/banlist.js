const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('banlist')
    .setDescription('عرض قائمة بأول 10 أعضاء محظورين في السيرفر')
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  async execute(interaction) {
    try {
      const bans = await interaction.guild.bans.fetch();
      const bannedMembers = bans.map(b => `• **${b.user.tag}** (\`${b.user.id}\`)`).slice(0, 10).join('\n') || 'لا يوجد محظورين.';

      const embed = new EmbedBuilder()
        .setColor('#c0392b')
        .setTitle(`🔨 قائمة المحظورين (إجمالي: ${bans.size})`)
        .setDescription(bannedMembers)
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } catch (e) {
      await interaction.reply({ content: '❌ لا أملك صلاحية الوصول لقائمة المحظورين.', ephemeral: true });
    }
  },
};