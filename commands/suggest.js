const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('suggest').setDescription('إرسال اقتراح جديد للإدارة')
    .addStringOption(o => o.setName('idea').setDescription('نص الاقتراح').setRequired(true)),
  async execute(interaction) {
    const idea = interaction.options.getString('idea');
    const embed = new EmbedBuilder()
      .setTitle('💡 اقتراح جديد')
      .setDescription(idea)
      .setColor('Yellow')
      .setFooter({ text: `بواسطة: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
      .setTimestamp();
    await interaction.reply({ content: '✅ تم إرسال اقتراحك بنجاح!', ephemeral: true });
    await interaction.channel.send({ embeds: [embed] });
  }
};