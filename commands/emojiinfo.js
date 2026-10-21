const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('emojiinfo')
    .setDescription('عرض تفاصيل ورابط تحميل إيموجي من السيرفر')
    .addStringOption(option => option.setName('emoji').setDescription('اسم أو ايدي الإيموجي').setRequired(true)),

  async execute(interaction) {
    const emojiInput = interaction.options.getString('emoji');
    const customEmoji = interaction.guild.emojis.cache.find(e => e.name === emojiInput || e.id === emojiInput);

    if (!customEmoji) {
      return interaction.reply({ content: '❌ لم يتم العثور على هذا الإيموجي بداخل السيرفر.', ephemeral: true });
    }

    const embed = new EmbedBuilder()
      .setColor('#f1c40f')
      .setTitle(`😃 تفاصيل الإيموجي: ${customEmoji.name}`)
      .setThumbnail(customEmoji.url)
      .addFields(
        { name: '🆔 الآيدي', value: `\`${customEmoji.id}\``, inline: true },
        { name: '✨ متحرك؟', value: customEmoji.animated ? 'نعم' : 'لا', inline: true },
        { name: '🔗 الرابط المباشر', value: `[اضغط هنا للتحميل](${customEmoji.url})`, inline: false }
      );

    await interaction.reply({ embeds: [embed] });
  },
};