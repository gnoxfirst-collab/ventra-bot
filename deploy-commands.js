const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config();

const commandsPath = path.join(process.cwd(), 'commands');

function getAllCommandFiles(dir) {
  let filesList = [];
  if (!fs.existsSync(dir)) return filesList;
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      filesList = filesList.concat(getAllCommandFiles(fullPath));
    } else if (item.endsWith('.js')) {
      filesList.push(fullPath);
    }
  }
  return filesList;
}

async function checkCommands() {
  const token = process.env.TOKEN_BOT1 || process.env.TOKEN;
  const clientId = process.env.CLIENT_ID_1 || process.env.CLIENT_ID;

  if (!token || !clientId) {
    console.log(`❌ بيانات التوكين أو Client ID غير موجودة في .env`);
    return;
  }

  const rest = new REST({ version: '10' }).setToken(token);
  const commandFiles = getAllCommandFiles(commandsPath);

  console.log(`🔍 جاري فحص الـ [${commandFiles.length}] ملف محلياً لاكتشاف الملف المعطوب...\n`);

  let badFilesCount = 0;

  for (const filePath of commandFiles) {
    const fileName = path.basename(filePath);
    try {
      delete require.cache[require.resolve(filePath)];
      const command = require(filePath);

      if (!command || !command.data || typeof command.data.toJSON !== 'function') {
        console.log(`❌ [ملف تالف/غير مكتمل]: ${fileName}`);
        badFilesCount++;
        continue;
      }

      const jsonCmd = command.data.toJSON();

      // فحص القواعد محلياً بدون إثقال ديسكورد
      if (!jsonCmd.name || jsonCmd.name.length > 32 || !/^[a-z0-9-_]+$/.test(jsonCmd.name)) {
        console.log(`❌ [اسم غير مرخص]: ${fileName} (الاسم: ${jsonCmd.name})`);
        badFilesCount++;
      } else if (jsonCmd.description && jsonCmd.description.length > 100) {
        console.log(`❌ [وصف طويل جداً]: ${fileName}`);
        badFilesCount++;
      }

    } catch (err) {
      console.log(`❌ [خطأ برمجي في الملف]: ${fileName}`);
      badFilesCount++;
    }
  }

  console.log(`\n----------------------------------------`);
  if (badFilesCount === 0) {
    console.log(`✅ جميع الملفات سليمة 100% برمجياً!`);
  } else {
    console.log(`⚠️ تم رصد [${badFilesCount}] ملف مخالف بالشروط أعلاه.`);
  }
}

checkCommands();