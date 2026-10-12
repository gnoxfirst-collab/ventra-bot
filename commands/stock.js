const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stock')
    .setDescription('عرض ستوك الفواكه الحالي في لعبة Blox Fruits')
    .addStringOption(option =>
      option.setName('shop')
        .setDescription('اختر المتجر المراد عرض الستوك الخاص به')
        .setRequired(true)
        .addChoices(
          { name: '🏪 المتجر العادي (Normal Dealer - Beli/Robux)', value: 'normal' },
          { name: '💎 متجر الروبوكس الدائم (Permanent Fruits Shop)', value: 'robux' }
        )
    ),

  async execute(interaction) {
    await interaction.deferReply();

    const shopType = interaction.options.getString('shop');

    try {
      // جلب البيانات مباشرة من API ديسكورد/Blox Fruits الرسمي
      const response = await fetch('https://api.bloxfruits.com/v1/stock');
      
      if (!response.ok) {
        throw new Error('تعذر التواصل مع سيرفرات Blox Fruits');
      }

      const data = await response.json();

      if (shopType === 'normal') {
        const normalStock = data.normal || [];
        
        const fruitsList = normalStock.length > 0 
          ? normalStock.map(f => `• **${f.name}** — 💵 $${f.price.toLocaleString()} | 💎 ${f.coins} Robux`).join('\n')
          : 'لا توجد فواكه متوفرة حالياً.';

        const embed = new EmbedBuilder()
          .setTitle('🏪 ستوك المتجر العادي (Normal Dealer Stock)')
          .setColor('#00FF7F')
          .setDescription(fruitsList)
          .setFooter({ text: 'Aura Bot • Blox Fruits Live Stock', iconURL: interaction.client.user.displayAvatarURL() })
          .setTimestamp();

        return await interaction.editReply({ embeds: [embed] });

      } else if (shopType === 'robux') {
        const robuxStock = data.robux || data.perm || [];

        const fruitsList = robuxStock.length > 0 
          ? robuxStock.map(f => `• **${f.name}** — 💎 ${f.coins || f.price} Robux`).join('\n')
          : 'جميع الفواكه الدائمة متوفرة للشراء عبر الروبوكس داخل اللعبة!';

        const embed = new EmbedBuilder()
          .setTitle('💎 متجر الفواكه الدائمة (Permanent Fruits Shop)')
          .setColor('#00BFFF')
          .setDescription(fruitsList)
          .setFooter({ text: 'Aura Bot • Blox Fruits Live Stock', iconURL: interaction.client.user.displayAvatarURL() })
          .setTimestamp();

        return await interaction.editReply({ embeds: [embed] });
      }

    } catch (error) {
      console.error('Stock Command Error:', error);
      
      // رد احتياطي في حال تعذر الوصول للـ API
      const fallbackEmbed = new EmbedBuilder()
        .setTitle('⚠️ خطأ أثناء جلب الستوك')
        .setColor('#FF0000')
        .setDescription('تعذر الاتصال بمتجر اللعبة حالياً، يرجى المحاولة لاحقاً أو التأكد من حالة سيرفرات اللعبة.')
        .setFooter({ text: 'Aura Bot' });

      return await interaction.editReply({ embeds: [fallbackEmbed] });
    }
  }
};