const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('channelaudit')
    .setDescription('فحص إعدادات الأمان والسرعة للقناة الحالية')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  async execute(interaction) {
    const channel = interaction.channel;
    const everyonePermissions = channel.permissionsFor(interaction.guild.roles.everyone);

    const canSend = everyonePermissions.has(PermissionFlagsBits.SendMessages);
    const canMention = everyonePermissions.has(PermissionFlagsBits.MentionEveryone);
    const canAttach = everyonePermissions.has(PermissionFlagsBits.AttachFiles);

    const embed = new EmbedBuilder()
      .setColor('#2ecc71')
      .setTitle(`🔍 تدقيق وإعدادات القناة: ${channel.name}`)
      .addFields(
        { name: '💬 كتابة الرسائل للجميع', value: canSend ? '✅ مسموح' : '❌ ممنوع', inline: true },
        { name: '📢 منشن @everyone', value: canMention ? '⚠️ مسموح' : '🛡️ محمي', inline: true },
        { name: '🖼️ إرسال الصور والملفات', value: canAttach ? '✅ مسموح' : '❌ ممنوع', inline: true },
        { name: '⏱️ المهلة الزمنية (Slowmode)', value: `\`${channel.rateLimitPerUser || 0} ثانية\``, inline: true }
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};