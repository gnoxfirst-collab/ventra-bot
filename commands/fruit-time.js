const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

// قائمة الفواكه ومواعيد تجديد المتجر العادي (كل 4 ساعات)
const FRUITS_LIST = [
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
  { name: 'Magma 🌋', value: 'Magma' },
  { name: 'Quake 🫨', value: 'Quake' },
  { name: 'Buddha 🧘', value: 'Buddha' },
  { name: 'Love ❤️', value: 'Love' },
  { name: 'Spider 🕷️', value: 'Spider' },
  { name: 'Sound 🎵', value: 'Sound' },
  { name: 'Phoenix 🐦‍🔥', value: 'Phoenix' },
  { name: 'Portal 🌀', value: 'Portal' },
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
    .setDescription('معرفة موعد نزول فاكهة محددة وتوقيت تجديد المتجر في Blox Fruits')
    .addStringOption(option =>
      option.setName('shop')
        .setDescription('اختر نوع المتجر')
        .setRequired(true)
        .addChoices(
          { name: '🏪 المتجر العادي (Normal Dealer)', value: 'normal' },
          { name: '💎 متجر الروبوكس/الفواكه الدائمة (Robux / Perm Shop)', value: 'robux' }
        )
    )
    .addStringOption(option => {
      option.setName('fruit')
        .setDescription('اختر الفاكهة اللي عايز تعرف موعدها')
        .setRequired(true);
      
      // إضافة أول 25 فاكهة متوافقة مع حد ديسكورد للأخيار المباشر
      FRUITS_LIST.slice(0, 25).forEach(f => {
        option.addChoices({ name: f.name, value: f.value });
      });
      return option;
    }),

  async execute(interaction) {
    const selectedShop = interaction.options.getString('shop');
    const selectedFruit = interaction.options.getString('fruit');

    // حساب موعد تجديد المتجر القادم (متجر Blox Fruits بيتجدد كل 4 ساعات بالعالم)
    const now = new Date();
    const currentHour = now.getUTCHours();
    const nextRestockHour = Math.ceil((currentHour + 1) / 4) * 4;
    
    const nextRestockDate = new Date(now);
    nextRestockDate.setUTCHours(nextRestockHour % 24, 0, 0, 0);
    if (nextRestockHour >= 24) {
      nextRestockDate.setUTCDate(nextRestockDate.getUTCDate() + 1);
    }

    const unixTime = Math.floor(nextRestockDate.getTime() / 1000);

    if (selectedShop === 'normal') {
      const embed = new EmbedBuilder()
        .setTitle(`🏪 موعد تجديد المتجر العادي — فاكهة [ ${selectedFruit} ]`)
        .setColor('#FFA500')
        .setDescription(
          `🍎 **الفاكهة المحددة:** \`${selectedFruit}\`\n` +
          `🛒 **نوع المتجر:** المتجر العادي (Normal Dealer)\n\n` +
          `⏰ **تجديد المتجر القادم (Restock):** <t:${unixTime}:F> (<t:${unixTime}:R>)\n\n` +
          `💡 **ملاحظة:** نزول الفواكه في المتجر العادي يكون **عشوائي (RNG)** كل 4 ساعات. استعد للتفقد في التوقيت الموضح أعلاه!`
        )
        .setFooter({ text: 'Aura Bot • Blox Fruits Restock System', iconURL: interaction.client.user.displayAvatarURL() })
        .setTimestamp();

      return await interaction.reply({ embeds: [embed] });

    } else if (selectedShop === 'robux') {
      const embed = new EmbedBuilder()
        .setTitle(`💎 متجر الروبوكس (Permanent Shop) — فاكهة [ ${selectedFruit} ]`)
        .setColor('#00BFFF')
        .setDescription(
          `🍎 **الفاكهة المحددة:** \`${selectedFruit}\`\n` +
          `💳 **نوع المتجر:** متجر الروبوكس الدائم (Perm Fruits)\n\n` +
          `✨ **الوقت والتوفر:** **متوفرة حالياً 24/7!**\n` +
          `فواكه الروبوكس الدائمة متواجدة دائماً في المتجر ويمكنك شؤاؤها في أي وقت دون الانتظار!`
        )
        .setFooter({ text: 'Aura Bot • Blox Fruits Perm Shop', iconURL: interaction.client.user.displayAvatarURL() })
        .setTimestamp();

      return await interaction.reply({ embeds: [embed] });
    }
  }
};