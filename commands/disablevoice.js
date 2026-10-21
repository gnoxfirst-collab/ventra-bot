const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('disablevoice')
    .setDescription('تعطيل الدخول للروم الصوتي الحالي للأعضاء العاديين')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  async execute(interaction) {
    const vc = interaction.channel;

    if (!vc.isVoiceBased()) {
      return interaction.reply({ content: '❌ هذا الأمر يعمل داخل الرومات الصوتية فقط.', ephemeral: true });
    }

    try {
      await vc.permissionOverwrites.edit(interaction.guild.roles.everyone, { Connect: false });
      await interaction.reply({ content: `🔒 تم تعطيل الدخول إلى الروم الصوتي ${vc}.` });
    } catch (e) {
      await interaction.reply({ content: '❌ حدث خطأ أثناء تعديل الصلاحيات.', ephemeral: true });
    }
  },
};