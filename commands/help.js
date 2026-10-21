const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('عرض الدليل الشامل وقائمة جميع أوامر بوتات VENTRA & Fire Community'),

  async execute(interaction) {
    const helpEmbed = new EmbedBuilder()
      .setColor('#2b2d31')
      .setTitle('🛡️ الدليل الشامل لأوامر البوت (Dyno Style System)')
      .setDescription('مرحباً بك في النظام المركزي للبوتات! إليك قائمة الأوامر المتاحة مقسمة حسب الفئات لتسهيل إدارتها والتحكم الكامل بالسيرفر:')
      .addFields(
        { 
          name: '🛠️ 1. أوامر الإدارة والحماية (Moderation & Security)', 
          value: '`• /go-out` : إخراج البوت من سيرفر معين مع رسالة اختيارية (مخصص للمالك).\n`• /ban` : حظر أي عضو مخالف من السيرفر مع ذكر السبب.\n`• /kick` : طرد عضو من السيرفر.\n`• /timeout` & `/untimeout` : إسكات أو رفع الإسكات عن العضو.\n`• /lock` & `/unlock` : قفل أو فتح القنوات الكتابية لمنع الشغب.\n`• /clear` : مسح وحذف الرسائل بسرعة فائقة.\n`• /warn` : إرسال تحذير رسمي للعضو المخالف.', 
          inline: false 
        },
        { 
          name: '📊 2. أوامر معلومات السيرفر والأعضاء (Server & User Info)', 
          value: '`• /serverinfo` : عرض تفاصيل وإحصائيات السيرفر كاملة.\n`• /serverchannels` & `/serverroleslist` : عرض قنوات ورتب السيرفر.\n`• /servericon` & `/serverbanner` : إظهار شعار وبانر السيرفر.\n`• /userinfo` & `/useravatar` : جلب معلومات وأفاتار أي عضو.\n`• /membercount` : معرفة عدد أعضاء السيرفر بدقة.\n`• /botinfo` & `/uptime` : معرفة حالة تشغيل البوت والبنك.', 
          inline: false 
        },
        { 
          name: '🎮 3. أوامر الترفيه والألعاب (Fun & Mini-Games)', 
          value: '`• /game-colors` & `/game-faster` : ألعاب تفاعلية وسريعة لتسلية أعضاء السيرفر.\n`• /coinflip` : لعبة العملة المعدنية (كتابة أو وجه).\n`• /roll` : رمي النرد بأرقام عشوائية.\n`• /ascii` : تحويل النصوص إلى أشكال رسومية بارزة.\n`• /hug` & `/slap` : أوامر تفاعلية لطيفة بين الأعضاء.', 
          inline: false 
        },
        { 
          name: '⚙️ 4. أدوات المساعدة والخيارات العشوائية (Utilities & Tools)', 
          value: '`• /calc` : آلة حاسبة ذكية داخل البوت.\n`• /poll` : إنشاء تصويت رسمي في الشات.\n`• /suggest` : إرسال اقتراحات تطوير السيرفر.\n`• /randomnumber` & `/randomquote` : توليد أرقام وحكم عشوائية.', 
          inline: false 
        }
      )
      .setTimestamp()
      .setFooter({ text: 'VENTRA & Fire Community Bot Systems • جميع الحقوق محفوظة', iconURL: interaction.client.user.displayAvatarURL() });

    await interaction.reply({ embeds: [helpEmbed], ephemeral: true });
  },
};