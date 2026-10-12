const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

// قائمة ضخمة وعملاقة تضم مئات الكلمات المجهزة للعبة
const GIANT_WORDS_POOL = [
  // كلمات تكنولوجيا وبرمجة
  "كمبيوتر", "برمجة", "تطوير", "فنترا", "ديسكورد", "حاسوب", "شاشة", "لوحة", "سماعة", "هاتف", 
  "بطارية", "سيرفر", "معالج", "شبكة", "إنترنت", "بيانات", "موقع", "تطبيق", "ذاكرة", "قرص",
  // كلمات عامة وأدوات
  "مفتاح", "ممحاة", "صاروخ", "نافذة", "محطة", "مدرسة", "مكتبة", "سيارة", "طائرة", "قطار", 
  "سفينة", "دراجة", "قلم", "كتاب", "دفتر", "طاولة", "كرسي", "حقيبة", "مصباح", "ساعة",
  // عناصر وطبيعة وفضاء
  "قمر", "شمس", "كوكب", "مجرة", "فضاء", "عاصفة", "محيط", "بحيرة", "بركان", "صحراء", 
  "غابة", "شلال", "شجرة", "زهور", "ينابيع", "سحاب", "مطر", "ثلج", "ضباب", "كوارث",
  // مدن ودول
  "كابل", "القاهرة", "الرياض", "دبي", "بغداد", "دمشق", "عمان", "القدس", "بيروت", "تونس", 
  "الجزائر", "الرباط", "الخرطوم", "مكة", "المدينة", "الدوحة", "الكويت", "المنامة", "مسقط", "صنعاء",
  // صفات وأفعال وكلمات متنوعة
  "سرعة", "تحدي", "انتصار", "بطولة", "تركيز", "ذكاء", "حكمة", "شجاعة", "طاقة", "حماس", 
  "ابتكار", "إبداع", "عبقري", "أسطورة", "مغامرة", "سباق", "مواجهة", "تكتيك", "مهارة", "احتراف"
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('game-faster')
    .setDescription('لعبة أسرع كتابة التفاعلية'),

  async execute(interaction) {
    const guildIcon = interaction.guild?.iconURL({ dynamic: true }) || interaction.client.user.displayAvatarURL();

    // رسالة الواجهة الأولية للانضمام
    const embed = new EmbedBuilder()
      .setColor('#2b2d31')
      .setTitle('⭐ لعبة أسرع كتابة')
      .setDescription(
        '**كيفية اللعب**\n' +
        'اضغط على زر "دخول للعبة" للمشاركة\n' +
        'ستظهر كلمة ويجب عليك كتابتها بأسرع ما يمكن في الشات للحصول على نقطة\n\n' +
        '⏱️ لديك **30 ثانية** للانضمام\n\n' +
        '**اللاعبين (0)**\n' +
        'لا يوجد أحد بعد'
      )
      .setThumbnail(guildIcon);

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('join_game')
        .setLabel('دخول للعبة')
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
        .setCustomId('leave_game')
        .setLabel('خروج من اللعبة')
        .setStyle(ButtonStyle.Danger)
    );

    const message = await interaction.reply({ embeds: [embed], components: [row], fetchReply: true });

    const players = new Set();
    const collector = message.createMessageComponentCollector({ time: 30000 });

    collector.on('collect', async i => {
      if (i.customId === 'join_game') {
        players.add(i.user.id);
      } else if (i.customId === 'leave_game') {
        players.delete(i.user.id);
      }

      const playerListText = players.size > 0 
        ? Array.from(players).map(id => `<@${id}>`).join('\n') 
        : 'لا يوجد أحد بعد';

      const updatedEmbed = new EmbedBuilder()
        .setColor('#2b2d31')
        .setTitle('⭐ لعبة أسرع كتابة')
        .setDescription(
          '**كيفية اللعب**\n' +
          'اضغط على زر "دخول للعبة" للمشاركة\n' +
          'ستظهر كلمة ويجب عليك كتابتها بأسرع ما يمكن في الشات للحصول على نقطة\n\n' +
          '⏱️ لديك **30 ثانية** للانضمام\n\n' +
          `**اللاعبين (${players.size})**\n` +
          playerListText
        )
        .setThumbnail(guildIcon);

      await i.update({ embeds: [updatedEmbed] }).catch(() => {});
    });

    collector.on('end', async () => {
      // فحص عدد اللاعبين (ألا يقل عن 2)
      if (players.size < 2) {
        const cancelEmbed = new EmbedBuilder()
          .setColor('#ED4245')
          .setDescription('❌ تم إلغاء اللعبة لعدم اكتمال العدد (مطلوب لاعبين على الأقل)');
        return interaction.editReply({ embeds: [cancelEmbed], components: [] }).catch(() => {});
      }

      await interaction.editReply({ components: [] }).catch(() => {});

      // خلط القائمة الضخمة عشوائياً لضمان عدم تكرار الكلمات
      const shuffledWords = [...GIANT_WORDS_POOL].sort(() => Math.random() - 0.5);

      const scores = {};
      for (const id of players) {
        scores[id] = 0;
      }

      for (let round = 1; round <= 15; round++) {
        const randomWord = shuffledWords[(round - 1) % shuffledWords.length];

        // تصميم الإمبيد المطابق للصور
        const roundEmbed = new EmbedBuilder()
          .setColor('#2b2d31')
          .setThumbnail(guildIcon)
          .setDescription(
            `\n# ${randomWord}\n\n` +
            `اكتب الكلمة الموضحة أعلاه بأسرع ما يمكن`
          );

        await interaction.channel.send({ 
          content: `🎮 **الجولة [${round} من 15]**`,
          embeds: [roundEmbed] 
        });

        const filter = response => players.has(response.author.id) && response.content.trim() === randomWord;

        try {
          const collected = await interaction.channel.awaitMessages({ filter, max: 1, time: 10000, errors: ['time'] });
          const winnerMsg = collected.first();
          const winnerId = winnerMsg.author.id;
          scores[winnerId] = (scores[winnerId] || 0) + 1;

          await interaction.channel.send(`🎉 كفو <@${winnerId}>! سبقت الجميع وحصلت على نقطة.`);
        } catch (err) {
          await interaction.channel.send(`⏰ انتهى الوقت! الكلمة الصحيحة كانت: **${randomWord}**`);
        }

        await new Promise(resolve => setTimeout(resolve, 3000));
      }

      // عرض النتائج النهائية
      const sortedPlayers = Object.entries(scores).sort((a, b) => b[1] - a[1]);
      let resultsText = '';
      
      sortedPlayers.forEach(([id, score], index) => {
        let medal = '🏅';
        if (index === 0) medal = '🥇';
        else if (index === 1) medal = '🥈';
        else if (index === 2) medal = '🥉';
        resultsText += `${medal} <@${id}> — **${score}** نقطة\n`;
      });

      const finalEmbed = new EmbedBuilder()
        .setColor('#57F287')
        .setTitle('🏆 انتهت لعبة أسرع كتابة - النتائج النهائية')
        .setDescription(resultsText)
        .setTimestamp();

      await interaction.channel.send({ embeds: [finalEmbed] });
    });
  },
};