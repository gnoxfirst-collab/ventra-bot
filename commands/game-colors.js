const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

// قائمة ضخمة وشاملة لأغلب الألوان والتدرجات الصعبة
const allColorsList = [
  { name: "عنبري", url: "https://www.thecolorapi.com/id?format=svg&hex=FFBF00" },
  { name: "خردلي", url: "https://www.thecolorapi.com/id?format=svg&hex=FFDB58" },
  { name: "مشمشي", url: "https://www.thecolorapi.com/id?format=svg&hex=FBCEB1" },
  { name: "عسلي", url: "https://www.thecolorapi.com/id?format=svg&hex=D4AF37" },
  { name: "ذهبي", url: "https://www.thecolorapi.com/id?format=svg&hex=FFD700" },
  { name: "فيروزي", url: "https://www.thecolorapi.com/id?format=svg&hex=40E0D0" },
  { name: "قرمزي", url: "https://www.thecolorapi.com/id?format=svg&hex=DC143C" },
  { name: "بنفسجي", url: "https://www.thecolorapi.com/id?format=svg&hex=8A2BE2" },
  { name: "أرجواني", url: "https://www.thecolorapi.com/id?format=svg&hex=C71585" },
  { name: "زمردي", url: "https://www.thecolorapi.com/id?format=svg&hex=50C878" },
  { name: "ياقوتي", url: "https://www.thecolorapi.com/id?format=svg&hex=E0115F" },
  { name: "نيلي", url: "https://www.thecolorapi.com/id?format=svg&hex=4B0082" },
  { name: "كستنائي", url: "https://www.thecolorapi.com/id?format=svg&hex=954535" },
  { name: "سماوي", url: "https://www.thecolorapi.com/id?format=svg&hex=87CEEB" },
  { name: "زيتوني", url: "https://www.thecolorapi.com/id?format=svg&hex=808000" },
  { name: "مرجاني", url: "https://www.thecolorapi.com/id?format=svg&hex=FF7F50" },
  { name: "خزامي", url: "https://www.thecolorapi.com/id?format=svg&hex=E6E6FA" },
  { name: "فستقي", url: "https://www.thecolorapi.com/id?format=svg&hex=93C572" },
  { name: "وردي فاتح", url: "https://www.thecolorapi.com/id?format=svg&hex=FFB6C1" },
  { name: "ليموني", url: "https://www.thecolorapi.com/id?format=svg&hex=FFF700" },
  { name: "عنابي", url: "https://www.thecolorapi.com/id?format=svg&hex=800020" },
  { name: "لازوردي", url: "https://www.thecolorapi.com/id?format=svg&hex=007FFF" },
  { name: "برونزي", url: "https://www.thecolorapi.com/id?format=svg&hex=CD7F32" },
  { name: "رمادي داكن", url: "https://www.thecolorapi.com/id?format=svg&hex=A9A9A9" },
  { name: "رمادي فاتح", url: "https://www.thecolorapi.com/id?format=svg&hex=D3D3D3" },
  { name: "فحمي", url: "https://www.thecolorapi.com/id?format=svg&hex=36454F" },
  { name: "خاكي", url: "https://www.thecolorapi.com/id?format=svg&hex=C3B091" },
  { name: "أوف وايت", url: "https://www.thecolorapi.com/id?format=svg&hex=F8F8FF" },
  { name: "كريمي", url: "https://www.thecolorapi.com/id?format=svg&hex=FFFDD0" },
  { name: "طوبي", url: "https://www.thecolorapi.com/id?format=svg&hex=B22222" }
];

// تخزين الألوان المستخدمة لكل سيرفر لضمان عدم التكرار مطلقاً
const usedColorsCache = new Map();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('game-colors')
    .setDescription('لعبة تخمين الألوان الصعبة التفاعلية'),
  async execute(interaction) {
    const guildId = interaction.guild.id;

    if (!usedColorsCache.has(guildId)) {
      usedColorsCache.set(guildId, new Set());
    }
    const usedColors = usedColorsCache.get(guildId);

    // واجهة البدء
    const startEmbed = new EmbedBuilder()
      .setColor('#57F287')
      .setTitle('🎨 لعبة تخمين الألوان الصعبة')
      .setDescription(
        'ستبدأ اللعبة الآن تتكون اللعبة من **5 جولات**\n' +
        'انظر إلى لون الصورة المعروضة واختار اسم اللون الصحيح من الأزرار\n\n' +
        '⏱️ الاستعداد للجولة الأولى بعد قليل'
      );

    await interaction.reply({ embeds: [startEmbed] });
    await new Promise(resolve => setTimeout(resolve, 4000));

    const scores = {};

    for (let round = 1; round <= 5; round++) {
      // تصفية الألوان التي لم تُستخدم بعد في السيرفر
      let availableColors = allColorsList.filter(c => !usedColors.has(c.name));
      
      // إذا انتهت كافة الألوان المتاحة في السيرفر، يتم إعادة تدويرها تلقائياً
      if (availableColors.length === 0) {
        usedColors.clear();
        availableColors = [...allColorsList];
      }

      const targetColor = availableColors[Math.floor(Math.random() * availableColors.length)];
      usedColors.add(targetColor.name);

      // إنشاء 4 خيارات أزرار عشوائية تشمل الخيار الصحيح
      let options = [targetColor.name];
      while (options.length < 4) {
        const randomOpt = allColorsList[Math.floor(Math.random() * allColorsList.length)].name;
        if (!options.includes(randomOpt)) {
          options.push(randomOpt);
        }
      }
      options.sort(() => Math.random() - 0.5);

      const row = new ActionRowBuilder().addComponents(
        options.map(opt => 
          new ButtonBuilder()
            .setCustomId(`color_${opt}`)
            .setLabel(opt)
            .setStyle(ButtonStyle.Secondary)
        )
      );

      const roundEmbed = new EmbedBuilder()
        .setColor('#FEE75C')
        .setTitle(`⭐ تخمين اللون - الجولة [${round} من 5]`)
        .setDescription('ما هو اسم هذا اللون المعروض في الصورة أدناه؟\n\n⏱️ لديك 15 ثانية للإجابة!')
        .setImage(targetColor.url);

      const roundMsg = await interaction.channel.send({ embeds: [roundEmbed], components: [row] });

      const wrongUsersInRound = new Set();
      let answeredCorrectly = false;

      const collector = roundMsg.createMessageComponentCollector({ time: 15000 });

      collector.on('collect', async i => {
        const userId = i.user.id;
        const selectedOption = i.customId.replace('color_', '');

        if (wrongUsersInRound.has(userId)) {
          return await i.reply({ content: '❌ لقد شاركت بالفعل في هذه الجولة بأجوبة خاطئة', ephemeral: true });
        }

        if (selectedOption === targetColor.name && !answeredCorrectly) {
          answeredCorrectly = true;
          scores[userId] = (scores[userId] || 0) + 1;
          collector.stop();

          await i.update({ content: `✅ إجابة صحيحة من <@${userId}> اللون كان **${targetColor.name}** 🎉`, embeds: [], components: [] });
        } else {
          wrongUsersInRound.add(userId);
          await i.reply({ content: '❌ إجابة خاطئة! لقد تم استبعادك من المحاولات في هذه الجولة', ephemeral: true });
        }
      });

      collector.on('end', async collected => {
        if (!answeredCorrectly) {
          await roundMsg.edit({ content: `⏰ انتهى الوقت لم ينجح أحد في تخمين اللون\n🎨 اللون الصحيح كان ${targetColor.name}`, embeds: [], components: [] }).catch(() => {});
        }
      });

      await new Promise(resolve => setTimeout(resolve, 16000));
    }

    // عرض شاشة النتائج والمراكز النهائية
    const sortedPlayers = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    
    let resultsText = '';
    sortedPlayers.forEach(([id, score], index) => {
      let medal = '🏅';
      if (index === 0) medal = '🥇';
      else if (index === 1) medal = '🥈';
      else if (index === 2) medal = '🥉';

      resultsText += `${medal} <@${id}> — **${score}** نُقطة\n`;
    });

    if (resultsText === '') {
      resultsText = 'لم يسجل أي لاعب أي نقاط في هذه اللعبة.';
    }

    const finalEmbed = new EmbedBuilder()
      .setColor('#FFFF00')
      .setTitle('🏆 انتهت لعبةُ الألوان')
      .setDescription(`**النتائجُ النهائيّةُ للمُتسابقينَ** 🏆\n\n${resultsText}`);

    await interaction.channel.send({ embeds: [finalEmbed] });
  },
};