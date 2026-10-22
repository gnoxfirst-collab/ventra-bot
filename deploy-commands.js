require('dotenv').config();
const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

console.log('🔍 جاري تجهيز جميع الأوامر...');

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    try {
        delete require.cache[require.resolve(filePath)];
        const command = require(filePath);
        
        if ('data' in command && 'execute' in command) {
            let slashCommand = command.data;
            if (slashCommand.description && slashCommand.description.length > 100) {
                slashCommand.setDescription(slashCommand.description.substring(0, 97) + '...');
            }
            commands.push(slashCommand.toJSON());
        }
    } catch (error) {
        console.log(`❌ خطأ في قراءة الملف [${file}]:`, error.message);
    }
}

// إعدادات البوتين
const bots = [
    {
        name: 'البوت الأول',
        token: process.env.TOKEN_BOT1,
        clientId: process.env.CLIENT_ID_BOT1 || process.env.CLIENT_ID
    },
    {
        name: 'البوت الثاني',
        token: process.env.TOKEN_BOT2,
        clientId: process.env.CLIENT_ID_BOT2
    }
];

(async () => {
    for (const bot of bots) {
        if (!bot.token || !bot.clientId) {
            console.log(`⚠️ تم تخطي ${bot.name} لعدم وجود التوكين أو الـ Client ID الخاص به.`);
            continue;
        }

        const rest = new REST().setToken(bot.token);
        try {
            console.log(`\n🚀 جاري رفع [${commands.length}] أمر لـ ${bot.name}...`);
            const data = await rest.put(
                Routes.applicationCommands(bot.clientId),
                { body: commands },
            );
            console.log(`✅ تم رفع [${data.length}] أمر بنجاح لـ ${bot.name}!`);
        } catch (error) {
            console.error(`❌ فشل الرفع لـ ${bot.name}:`, error.message);
        }
    }
    console.log('\n🎉 اكتملت عملية الرفع للبوتين بنجاح!');
})();