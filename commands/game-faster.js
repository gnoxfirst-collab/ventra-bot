const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('game-faster')
    .setDescription('لعبة أسرع كتابة التفاعلية'),

  async execute(interaction) {
    const guildIcon = interaction.guild?.iconURL({ dynamic: true }) || interaction.client.user.displayAvatarURL();

    // رسالة الواجهة الأولية
    const embed = new EmbedBuilder()
      .setColor('#7289DA')
      .setTitle('⭐ لعبة أسرع كتابة')
      .setDescription(
        '**كيفية اللعب**\n' +
        'اضغط على زر دخول للمشاركة\n' +
        'ستظهر كلمة ويجب عليك كتابتها بأسرع ما يمكن للحصول على نقطة\n\n' +
        '⏱️ لديك **30 ثانية** للانضمام\n\n' +
        '**اللاعبين (0)**\n' +
        'لا يوجد أحد بعد'
      );

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
        .setColor('#7289DA')
        .setTitle('⭐ لعبة أسرع كتابة')
        .setDescription(
          '**كيفية اللعب**\n' +
          'اضغط على زر دخول للمشاركة\n' +
          'ستظهر كلمة ويجب عليك كتابتها بأسرع ما يمكن للحصول على نقطة\n\n' +
          '⏱️ لديك **30 ثانية** للانضمام\n\n' +
          `**اللاعبين (${players.size})**\n` +
          playerListText
        );

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

      // قائمة كلمات متنوعة بدون تكرار
      const dynamicWordsPool = [
        "بطارية", "ممحاة", "كمبيوتر", "برمجة", "تطوير",
        "سيارة", "طائرة", "مدرسة", "محطة", "نافذة",
        "شاشة", "لوحة", "سماعة", "مكتبة", "طبيعة",
        "صاروخ", "مفتاح", "هاتف", "قمر", "شمس",
        "رياضة", "تاريخ", "فضاء", "تحكم", "حاسوب",
        "مملكة", "محيط", "كوكب", "جامعة", "عاصفة"
      ];

      // خلط الكلمات عشوائياً واختيار 15 كلمة غير مكررة
      const shuffledWords = dynamicWordsPool.sort(() => Math.random() - 0.5);

      const scores = {};
      for (const id of players) {
        scores[id] = 0;
      }

      for (let round = 1; round <= 15; round++) {
        const randomWord = shuffledWords[round - 1];

        const roundEmbed = new EmbedBuilder()
          .setColor('#5865F2')
          .setTitle(`🎮 الجولة ${round}/15`)
          .setDescription(`اكتب الكلمة الموضحة أسفله بأسرع ما يمكن!`)
          .setThumbnail(guildIcon);

        await interaction.channel.send({ 
          content: `📷 **الكلمة المطلوبة هي:** \` ${randomWord} \` (اكتبها في الشات الآن!)`,
          embeds: [roundEmbed] 
        });

        const filter = response => players.has(response.author.id) && response.content.trim() === randomWord;

        try {
          const collected = await interaction.channel.awaitMessages({ filter, max: 1, time: 10000, errors: ['time'] });
          const winnerMsg = collected.first();
          const winnerId = winnerMsg.author.id;
          scores[winnerId] = (scores[winnerId] || 0) + 1;

          await interaction.channel.send(`🎉 إجابة صحيحة! حصل <@${winnerId}> على نقطة.`);
        } catch (err) {
          await interaction.channel.send(`⏰ انتهى وقت الجولة! الكلمة الصحيحة كانت: **${randomWord}**`);
        }

        await new Promise(resolve => setTimeout(resolve, 3000));
      }

      // حساب وعرض النتائج النهائية
      let finalResult = '🏆 **انتهت اللعبة! نتائج اللاعبين:**\n\n';
      for (const [id, score] of Object.entries(scores)) {
        finalResult += `<@${id}>: **${score}** نقاط\n`;
      }

      const resultEmbed = new EmbedBuilder()
        .setColor('#00FF7F')
        .setTitle('🏅 النتائج النهائية')
        .setDescription(finalResult)
        .setTimestamp();

      await interaction.channel.send({ embeds: [resultEmbed] });
    });
  },
};