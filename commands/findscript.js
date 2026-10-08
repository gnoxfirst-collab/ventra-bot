const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = {
  data: new SlashCommandBuilder()
    .setName('findscript')
    .setDescription('البحث عن سكربت من موقع ScriptBlox مع تحديد خيار المفتاح')
    .addStringOption(option =>
      option.setName('name')
        .setDescription('اسم الماب أو السكربت المراد البحث عنه')
        .setRequired(true)
    )
    .addBooleanOption(option =>
      option.setName('key')
        .setDescription('هل تريد السكربت بمفتاح (true) أم بدون مفتاح (false)؟')
        .setRequired(true)
    ),
  async execute(interaction) {
    await interaction.deferReply();

    const query = interaction.options.getString('name');
    const needKey = interaction.options.getBoolean('key');

    try {
      const response = await fetch(`https://scriptblox.com/api/script/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();

      if (!data.result || !data.result.scripts || data.result.scripts.length === 0) {
        return interaction.editReply(`❌ لم يتم العثور على أي سكربت مطابق لـ: **${query}**`);
      }

      const filteredScripts = data.result.scripts.filter(script => script.key === needKey);

      if (filteredScripts.length === 0) {
        const keyStatusText = needKey ? 'بمفتاح' : 'بدون مفتاح';
        return interaction.editReply(`❌ تم العثور على نتائج لـ **${query}**، ولكن لا يوجد أي سكربت مطابق لخيار (${keyStatusText}).`);
      }

      const script = filteredScripts[0];
      
      let gameName = '{option.name}';
      if (typeof script.game === 'string') {
        gameName = script.game;
      } else if (script.game && script.game.name) {
        gameName = script.game.name;
      }

      let imageUrl = null;
      if (script.game && script.game.imageUrl) {
        imageUrl = script.game.imageUrl.startsWith('http') 
          ? script.game.imageUrl 
          : `https://scriptblox.com${script.game.imageUrl}`;
      }

      const scriptUrl = `https://scriptblox.com/script/${script.slug}`;
      const keyBadge = script.key ? '🔑 نعم (يطلب مفتاح)' : '🔓 لا (بدون مفتاح)';
      const scriptCode = `loadstring(game:HttpGet("https://scriptblox.com/raw/${script.slug}"))()`;

      const embed = new EmbedBuilder()
        .setColor(script.key ? '#ffcc00' : '#00ff66')
        .setTitle(`📜 ${script.title || 'بدون عنوان'}`)
        .setURL(scriptUrl)
        .setDescription(`**الماب:** ${gameName}`)
        .addFields(
          { name: '🔍 نظام المفتاح', value: keyBadge, inline: true },
          { name: '👀 المشاهدات', value: `\`${script.views || 0}\``, inline: true },
          { name: '📋 كود التشغيل (Loadstring)', value: `\`\`lua\n${scriptCode}\n\`\``, inline: false },
          { name: '👤 طلب بواسطة', value: `${interaction.user}`, inline: false }
        )
        .setTimestamp()
        .setFooter({ text: 'VENTRA Bot • ScriptBlox Engine', iconURL: interaction.client.user.displayAvatarURL() });

      if (imageUrl) {
        embed.setThumbnail(imageUrl);
      }

      await interaction.editReply({ embeds: [embed] });

    } catch (error) {
      console.error(error);
      await interaction.editReply('⚠️ حدث خطأ أثناء الاتصال بموقع ScriptBlox، يرجى المحاولة لاحقاً.');
    }
  }
};