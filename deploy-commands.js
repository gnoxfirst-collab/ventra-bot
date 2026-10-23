require('dotenv').config();
const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

const bots = [
    { name: 'البوت الأول', token: process.env.TOKEN_BOT1, clientId: process.env.CLIENT_ID },
    { name: 'البوت الثاني', token: process.env.TOKEN_BOT2, clientId: process.env.CLIENT_ID2 }
];

(async () => {
    for (const bot of bots) {
        if (!bot.token || !bot.clientId) continue;

        console.log(`\n🚀 فحص ورفع الأوامر لـ ${bot.name}...`);
        const rest = new REST({ version: '10' }).setToken(bot.token);

        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            try {
                delete require.cache[require.resolve(filePath)];
                const command = require(filePath);


                const commandData = command.data.toJSON();

                // محاولة رفع كل أمر لوحده لمعرفة اسم الملف المقصر
                await rest.post(
                    Routes.applicationCommands(bot.clientId),
                    { body: commandData },
                );
                console.log(`✅ تم رفع: ${file}`);
            } catch (error) {
                console.log(`\n❌ حريقة في الملف ده ➔ [ ${file} ]`);
                if (error.rawError && error.rawError.errors) {
                    console.log('📌 التفاصيل:', JSON.stringify(error.rawError.errors, null, 2));
                } else {
                    console.log('📌 الخطأ:', error.message);
                }
                console.log('-------------------------------------------');
            }
        }
    }
    console.log('\n🎉 انتهى الفحص!');
})();