const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stagecontrol')
    .setDescription('كتم صوت جميع الحاضرين بالروم الصوتي والاستثنائك للحديث')
    .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers),

  async execute(interaction) {
    const member = await interaction.guild.members.fetch(interaction.user.id);
    const vc = member.voice.channel;

    if (!vc) {
      return interaction.reply({ content: '❌ يجب أن تكون في روم صوتي أولاً.', ephemeral: true });
    }

    let mutedCount = 0;
    for (const [, target] of vc.members) {
      if (target.id !== interaction.user.id) {
        try {
          await target.voice.setMute(true);
          mutedCount++;
        } catch (e) {}
      }
    }

    await interaction.reply({ content: `🎙️ **وضع المنصة مفعل!** تم كتم **${mutedCount}** عضو في ${vc.name}.` });
  },
};