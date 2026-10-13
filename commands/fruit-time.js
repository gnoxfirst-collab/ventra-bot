const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const FRUITS_PART_1 = [
  { name: 'Rocket 🚀', value: 'Rocket' },
  { name: 'Spin 🌀', value: 'Spin' },
  { name: 'Chop 🔪', value: 'Chop' },
  { name: 'Spring 🦘', value: 'Spring' },
  { name: 'Bomb 💣', value: 'Bomb' },
  { name: 'Smoke 💨', value: 'Smoke' },
  { name: 'Spike 🌵', value: 'Spike' },
  { name: 'Flame 🔥', value: 'Flame' },
  { name: 'Falcon 🦅', value: 'Falcon' },
  { name: 'Ice 🧊', value: 'Ice' },
  { name: 'Sand 🏜️', value: 'Sand' },
  { name: 'Dark 🌑', value: 'Dark' },
  { name: 'Diamond 💎', value: 'Diamond' },
  { name: 'Light 💡', value: 'Light' },
  { name: 'Rubber 🥊', value: 'Rubber' },
  { name: 'Barrier 🛡️', value: 'Barrier' },
  { name: 'Ghost 👻', value: 'Ghost' },
  { name: 'Magma 🌋', value: 'Magma' },
  { name: 'Quake 🫨', value: 'Quake' },
  { name: 'Buddha 🧘', value: 'Buddha' },
  { name: 'Love ❤️', value: 'Love' },
  { name: 'Spider 🕷️', value: 'Spider' },
  { name: 'Sound 🎵', value: 'Sound' },
  { name: 'Phoenix 🐦‍🔥', value: 'Phoenix' },
  { name: 'Portal 🌀', value: 'Portal' }
];

const FRUITS_PART_2 = [
  { name: 'Rumble ⚡', value: 'Rumble' },
  { name: 'Pain 💢', value: 'Pain' },
  { name: 'Blizzard ❄️', value: 'Blizzard' },
  { name: 'Gravity 🪐', value: 'Gravity' },
  { name: 'Mammoth 🦣', value: 'Mammoth' },
  { name: 'T-Rex 🦖', value: 'T-Rex' },
  { name: 'Dough 🍩', value: 'Dough' },
  { name: 'Shadow 👤', value: 'Shadow' },
  { name: 'Venom 🧪', value: 'Venom' },
  { name: 'Control 🎮', value: 'Control' },
  { name: 'Gas ⛽', value: 'Gas' },
  { name: 'Spirit 👻', value: 'Spirit' },
  { name: 'Leopard 🐆', value: 'Leopard' },
  { name: 'Kitsune 🦊', value: 'Kitsune' },
  { name: 'Dragon 🐉', value: 'Dragon' }
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('fruit-time')
    .setDescription('معرفة تجديد المتجر. لو ملقتش فاكهتك في fruit روح لاوبشن fruit2')
    .addStringOption(option =>
      option.setName('shop')
        .setDescription('اختر نوع المتجر')
        .setRequired(true)
        .addChoices(
          { name: '🏪 المتجر العادي (Normal Dealer)', value: 'normal' },
          { name: '💎 متجر الروبوكس (Permanent Shop)', value: 'robux' }
        )
    )
    .addStringOption(option => {
      option.setName('fruit')
        .setDescription('الفواكه (الجزء الأول) - اختياري')
        .setRequired(false);
      FRUITS_PART_1.forEach(f => option.addChoices(f));
      return option;
    })
    .addStringOption(option => {
      option.setName('fruit2')
        .setDescription('الفواكه (الجزء الثاني) - اختياري')
        .setRequired(false);
      FRUITS_PART_2.forEach(f => option.addChoices(f));
      return option;
    }),

  async execute(interaction) {
    await interaction.deferReply();

    const selectedShop = interaction.options.getString('shop');
    const fruit1 = interaction.options.getString('fruit');
    const fruit2 = interaction.options.getString('fruit2');

    const selectedFruit = fruit1 || fruit2 || 'جميع الفواكه (استعلام عام)';

    const now = new Date();
    const currentHour = now.getUTCHours();
    const nextRestockHour = Math.ceil((currentHour + 0.001) / 4) * 4;
    
    const nextRestockDate = new Date(now);
    nextRestockDate.setUTCHours(nextRestockHour % 24, 0, 0, 0);
    if (nextRestockHour >= 24) {
      nextRestockDate.setUTCDate(nextRestockDate.getUTCDate() + 1);
    }

    const unixTime = Math.floor(nextRestockDate.getTime() / 1000);

    if (selectedShop === 'normal') {
      const embed = new EmbedBuilder()
        .setTitle(`🏪 موعد تجديد المتجر العادي — [ ${selectedFruit} ]`)
        .setColor('#FFA500')
        .setDescription(
          `🍎 **الفاكهة المحددة:** \`${selectedFruit}\`\n` +
          `🛒 **نوع المتجر:** المتجر العادي (Normal Dealer)\n\n` +
          `⏰ **موعد تجديد المتجر القادم (Restock):**\n` +
          `<t:${unixTime}:F> (<t:${unixTime}:R>)\n\n` +
          `💡 **ملاحظة:** نزول الفواكه في المتجر العادي يكون عشوائياً كل 4 ساعات.`
        )
        .setFooter({ text: 'Time • Blox Fruits Restock System', iconURL: interaction.client.user.displayAvatarURL() })
        .setTimestamp();

      return await interaction.editReply({ embeds: [embed] });

    } else if (selectedShop === 'robux') {
      const embed = new EmbedBuilder()
        .setTitle(`💎 متجر الروبوكس (Permanent Shop) — [ ${selectedFruit} ]`)
        .setColor('#00BFFF')
        .setDescription(
          `🍎 **الفاكهة المحددة:** \`${selectedFruit}\`\n` +
          `💳 **نوع المتجر:** متجر الروبوكس الدائم (Permanent Fruits)\n\n` +
          `✨ **الوقت والتوفر:** **متوفرة حالياً 24/7!**\n` +
          `فواكه الروبوكس الدائمة متواجدة دائماً في متجر اللعبة ويمكنك شراؤها في أي وقت دون إنتظار.`
        )
        .setFooter({ text: 'Time • Blox Fruits Perm Shop', iconURL: interaction.client.user.displayAvatarURL() })
        .setTimestamp();

      return await interaction.editReply({ embeds: [embed] });
    }
  }
};