const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('createvoice')
    .setDescription('إنشاء روم صوتي (Voice Channel) جديد')
    .addStringOption(option => option.setName('name').setDescription('اسم الروم الصوتي').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  async execute(interaction) {
    const name = interaction.options.getString('name');

    try {
      const vc = await interaction.guild.channels.create({
        name: name,
        type: ChannelType.GuildVoice,
      });
      await interaction.reply({ content: `🔊 تم إنشاء الروم الصوتي بنجاح: ${vc}` });
    } catch (error) {
      await interaction.reply({ content: '❌ حدث خطأ أثناء إنشاء الروم الصوتي.', ephemeral: true });
    }
  },
};