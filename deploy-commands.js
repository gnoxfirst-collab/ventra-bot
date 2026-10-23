require('dotenv').config();
const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

const allCommands = [];

console.log('🔍 جاري قراءة وفحص ملفات الأوامر...');

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    try {
        delete require.cache[require.resolve(filePath)];
        const command = require(filePath);

        if ('data' in command && 'execute' in command) {
            let commandData = command.data.toJSON();

            // معالجة الوصف وضمان عدم وجود قيم فارغة (null/undefined)
            if (!commandData.description) {
                commandData.description = 'لا يوجد وصف متاح';
            } else if (typeof commandData.description === 'string' && commandData.description.length > 100) {
                commandData.description = commandData.description.substring(0, 97) + '...';
            }

            // فحص الخيارات الفرعية معالجة الأوصاف
            if (commandData.options && Array.isArray(commandData.options)) {
                commandData.options.forEach(opt => {
                    if (!opt.description) {
                        opt.description = 'وصف خيار أوتوماتيكي';
                    } else if (typeof opt.description === 'string' && opt.description.length > 100) {
                        opt.description = opt.description.substring(0, 97) + '...';
                    }
                });
            }

            allCommands.push(commandData);
        }
    } catch (err) {
        console.log(`⚠️ تم تخطي الملف (${file}) لوجود خطأ فيه:`, err.message);
    }
}

console.log(`📦 إجمالي الأوامر السليمة والمجهزة: (${allCommands.length}) أمر.`);

// تقسيم الأوامر للبوتين لمنع الرفض
const bot1Commands = allCommands.slice(0, 100);
const bot2Commands = allCommands.slice(100, 200);

const bots = [
    { name: 'البوت الأول', token: process.env.TOKEN_BOT1, clientId: process.env.CLIENT_ID, commands: bot1Commands },
    { name: 'البوت الثاني', token: process.env.TOKEN_BOT2, clientId: process.env.CLIENT_ID2, commands: bot2Commands }
];

(async () => {
    for (const bot of bots) {
        if (!bot.token || !bot.clientId) continue;
        if (bot.commands.length === 0) continue;

        const rest = new REST({ version: '10' }).setToken(bot.token);
        try {
            console.log(`🚀 جاري رفع (${bot.commands.length}) أمر لـ ${bot.name}...`);
            const data = await rest.put(
                Routes.applicationCommands(bot.clientId),
                { body: bot.commands }
            );
            console.log(`✅ تم الرفع بنجاح لـ ${bot.name}! الأوامر النشطة: (${data.length}).`);
        } catch (error) {
            console.error(`❌ خطأ في الرفع لـ ${bot.name}:`, error.message);
        }
    }
    console.log('\n🎉 اكتملت العملية بنجاح!');
})();