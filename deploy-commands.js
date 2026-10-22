const fs = require('node:fs');
const path = require('node:path');

const commandsPath = path.join(__dirname, 'commands');

function listLongDescriptionFiles() {
  if (!fs.existsSync(commandsPath)) {
    console.log('❌ مجلد commands غير موجود!');
    return;
  }

  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
  let longDescCount = 0;

  console.log(`🔍 جاري البحث عن الملفات التي يتجاوز وصفها 100 حرف...\n`);
  console.log('--------------------------------------------------');

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    try {
      delete require.cache[require.resolve(filePath)];
      const command = require(filePath);

      if ('data' in command) {
        const jsonCmd = command.data.toJSON();
        const desc = jsonCmd.description || '';

        // إذا كان الوصف أكثر من 100 حرف
        if (desc.length > 100) {
          longDescCount++;
          console.log(`📄 [الملف رقم ${longDescCount}]: ${file}`);
          console.log(`   - اسم الأمر: /${jsonCmd.name}`);
          console.log(`   - طول الوصف الحالي: ${desc.length} حرف (المسموح 100 فقط)`);
          console.log(`   - النص الحالي: "${desc}"`);
          console.log('--------------------------------------------------');
        }
      }
    } catch (err) {
      console.log(`❌ خطأ في قراءة الملف ${file}:`, err.message);
    }
  }

  if (longDescCount === 0) {
    console.log('✅ ممتاز! جميع الملفات أوصافها أقل من 100 حرف ولا يوجد أي ملف مخالف.');
  } else {
    console.log(`\n⚠️ إجمالي الملفات المخالفة المطلوبة للتعديل: [${longDescCount}] ملف.`);
    console.log('👉 افتح الملفات المذكورة أعلاه وقصّر الوصف فيها لأقل من 100 حرف ثم شغل كود الرفع.');
  }
}

listLongDescriptionFiles();