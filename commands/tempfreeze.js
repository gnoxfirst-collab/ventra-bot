const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('tempfreeze')
    .setDescription('تجميد القناة الحالية لمدة دقيقة واحدة تلقائياً لحمايتها')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  async execute(interaction) {
    const channel = interaction.channel;

    try {
      await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { SendMessages: false });
      await interaction.reply({ content: '❄️ **تم تجميد القناة مؤقتاً لمدة 60 ثانية!**' });

      setTimeout(async () => {
        await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { SendMessages: null });
        await channel.send('🔥 **انتهت مدة التجميد!** تم فتح القناة مجدداً.');
      }, 60000);
    } catch (e) {
      await interaction.reply({ content: '❌ حدث خطأ أثناء تجميد القناة.', ephemeral: true });
    }
  },
};