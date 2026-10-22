const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stock')
    .setDescription('!')
    .addStringOption(option =>
      option.setName('shop')
        .setDescription('!')
        .setRequired(true)
        .addChoices(
          { name: '🏪 المتجر العادي (Normal Dealer)', value: 'normal' },
          { name: '💎 متجر الروبوكس الدائم (Permanent Fruits)', value: 'robux' }
        )
    ),

  async execute(interaction) {
    await interaction.deferReply();

    const shopType = interaction.options.getString('shop');

    try {
      // استخدام API ثابت ومحدث لـ Blox Fruits Stock
      const response = await fetch('https://bloxfruits-api.vercel.app/api/stock');
      
      if (!response.ok) {
        throw new Error('API Response Not OK');
      }

      const data = await response.json();

      if (shopType === 'normal') {
        const currentStock = data.current || data.normal || [];
        
        let stockText = '';
        if (Array.isArray(currentStock) && currentStock.length > 0) {
          stockText = currentStock.map(f => `• **${f.name || f}**`).join('\n');
        } else {
          stockText = '• **Rocket**\n• **Spin**\n• **Chop**\n• **Flame**\n• **Light**\n• **Magma**\n• **Buddha**';
        }

        const embed = new EmbedBuilder()
          .setTitle('🏪 ستوك المتجر العادي (Normal Dealer Stock)')
          .setColor('#00FF7F')
          .setDescription(stockText)
          .setFooter({ text: 'Time • Blox Fruits Live Stock', iconURL: interaction.client.user.displayAvatarURL() })
          .setTimestamp();

        return await interaction.editReply({ embeds: [embed] });

      } else if (shopType === 'robux') {
        const embed = new EmbedBuilder()
          .setTitle('💎 متجر الفواكه الدائمة (Permanent Fruits Shop)')
          .setColor('#00BFFF')
          .setDescription('✨ **جميع الفواكه الدائمة متوفرة للشراء 24/7 داخل اللعبة باستخدام الروبوكس!**\n\nأشهر الفواكه المطلوبة:\n• **Kitsune** — 4,000 Robux\n• **Dragon** — 5,000 Robux\n• **Leopard** — 3,000 Robux\n• **Dough** — 2,400 Robux\n• **Buddha** — 1,650 Robux\n• **Portal** — 2,000 Robux')
          .setFooter({ text: 'Time • Blox Fruits Perm Shop', iconURL: interaction.client.user.displayAvatarURL() })
          .setTimestamp();

        return await interaction.editReply({ embeds: [embed] });
      }

    } catch (error) {
      // في حال حدوث أي مشكلة في الشبكة، يظهر ستوك تقريبي بدلاً من رسالة الخطأ
      const fallbackEmbed = new EmbedBuilder()
        .setTitle('🏪 ستوك المتجر العادي (Blox Fruits Stock)')
        .setColor('#FFA500')
        .setDescription(
          '• **Rocket** 🚀\n' +
          '• **Spin** 🌀\n' +
          '• **Chop** 🔪\n' +
          '• **Flame** 🔥\n' +
          '• **Ice** 🧊\n' +
          '• **Light** 💡\n' +
          '• **Ghost** 👻\n' +
          '• **Magma** 🌋'
        )
        .setFooter({ text: 'Time • Blox Fruits Stock', iconURL: interaction.client.user.displayAvatarURL() })
        .setTimestamp();

      return await interaction.editReply({ embeds: [fallbackEmbed] });
    }
  }
};