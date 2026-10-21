const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('maintenancemode')
    .setDescription('وضع القناة في حالة الصيانة والتحديث المؤقت')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  async execute(interaction) {
    const channel = interaction.channel;

    try {
      await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { SendMessages: false });
      
      const embed = new EmbedBuilder()
        .setColor('#f39c12')
        .setTitle('🛠️ القناة تحت الصيانة')
        .setDescription('تم قفل الكتابة في هذه القناة مؤقتاً لإجراء بعض التحديثات والصيانة الإدارية.')
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } catch (e) {
      await interaction.reply({ content: '❌ حدث خطأ أثناء تفعيل وضع الصيانة.', ephemeral: true });
    }
  },
};