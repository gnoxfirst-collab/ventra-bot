const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('game-faster')
    .setDescription('لعبة أسرع كتابة التفاعلية'),
  async execute(interaction) {
    const guildIcon = interaction.guild.iconURL({ dynamic: true }) || interaction.client.user.displayAvatarURL();
    
    // رسالة الواجهة الأولية
    const embed = new EmbedBuilder()
      .setColor('#7289DA')
      .setTitle('⭐ لعبة أسرع كتابة')
      .setDescription(
        '**كيفية اللعب**\n' +
        'اضغط على زر دخول للمشاركة\n' +
        'ستظهر صورة تحتوي على كلمة ويجب عليك كتابتها بأسرع ما يمكن للحصول على نقطة\n\n' +
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
        await i.reply({ content: '✅ تم انضمامك للعبة بنجاح!', ephemeral: true });
      } else if (i.customId === 'leave_game') {
        players.delete(i.user.id);
        await i.reply({ content: '❌ لقد خرجت من اللعبة.', ephemeral: true });
      }

      const playerListText = players.size > 0 
        ? Array.from(players).map(id => `<@${id}>`).join('\n') 
        : 'لا يوجد أحد بعد';

      embed.setDescription(
        '**كيفية اللعب**\n' +
        'اضغط على زر دخول للمشاركة\n' +
        'ستظهر صورة تحتوي على كلمة ويجب عليك كتابتها بأسرع ما يمكن للحصول على نقطة\n\n' +
        '⏱️ لديك **30 ثانية** للانضمام\n\n' +
        `**اللاعبين (${players.size})**\n` +
        playerListText
      );

      await i.update({ embeds: [embed] }).catch(() => {});
    });

    collector.on('end', async () => {
      // فحص عدد اللاعبين (ألا يقل عن 2)
      if (players.size < 2) {
        const cancelEmbed = new EmbedBuilder()
          .setColor('#ED4245')
          .setDescription('تم إلغاء اللعبة لعدم اكتمال العدد (مطلوب لاعبين على الأقل)');
        return interaction.editReply({ embeds: [cancelEmbed], components: [] }).catch(() => {});
      }

      await interaction.editReply({ components: [] }).catch(() => {});

      // قائمة ضخمة ومتنوعة من الكلمات التي يتم اختيارها واختلاطها تلقائياً في كل مرة
      const dynamicWordsPool = [
        "بطارية", "ممحاة", "كمبيوتر", "برمجة", "تطوير",
        "سيارة", "طائرة", "مدرسة", "محطة", "نافذة",
        "شاشة", "لوحة", "سماعة", "مكتبة", "طبيعة",
        "صاروخ", "مفتاح", "هاتف", "قمر", "شمس",
        "رياضة", "تاريخ", "فضاء", "تحكم", "حاسوب"
      ];

      const scores = {};
      for (const id of players) {
        scores[id] = 0;
      }

      for (let round = 1; round <= 15; round++) {
        // خلط واختيار كلمة عشوائية متغيرة في كل جولة وكل استخدام للبوت
        const shuffledWords = dynamicWordsPool.sort(() => Math.random() - 0.5);
        const randomWord = shuffledWords[Math.floor(Math.random() * shuffledWords.length)];
        
        const roundEmbed = new EmbedBuilder()
          .setColor('#5865F2')
          .setTitle(`الجولة ${round}/15`)
          .setDescription('اكتب الكلمة الموضحة في الصورة بأسرع ما يمكن')
          .setThumbnail(guildIcon); // صورة السيرفر بدلاً من Ventra

        const roundMsg = await interaction.channel.send({ 
          content: `📷 **الكلمة المطلوبة هي:** \` ${randomWord} \` (اكتبها في الشات الآن!)`,
          embeds: [roundEmbed] 
        });

        const filter = response => players.has(response.author.id) && response.content.trim() === randomWord;
        
        try {
          const collected = await interaction.channel.awaitMessages({ filter, max: 1, time: 10000, errors: ['time'] });
          const winnerMsg = collected.first();
          const winnerId = winnerMsg.author.id;
          scores[winnerId] = (scores[winnerId] || 0) + 1;

          await interaction.channel.send(`إجابة صحيحة، حصل <@${winnerId}> على نقطة.`);
        } catch (err) {
          await interaction.channel.send(`انتهي وقت الجولة، الكلمة الصحيحة هي: ${randomWord}`);
        }

        await new Promise(resolve => setTimeout(resolve, 3000));
      }

      let finalResult = '🏆 **انتهت اللعبة! نتائج اللاعبين:**\n';
      for (const [id, score] of Object.entries(scores)) {
        finalResult += `- <@${id}>: ${score} نقاط\n`;
      }
      await interaction.channel.send(finalResult);
    });
  },
};