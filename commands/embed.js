const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embed')
        .setDescription('أوامر إنشاء وإرسال رسائل الـ Embed الفخمة')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        
        // الأمر الفرعي الفخم والكامل
        .addSubcommand(subcommand =>
            subcommand
                .setName('create')
                .setDescription('إنشاء وإرسال رسالة Embed فخمة ومخصصة بالكامل')
                .addStringOption(option => 
                    option.setName('title').setDescription('عنوان الإمبد البارز').setRequired(true))
                .addStringOption(option => 
                    option.setName('description').setDescription('محتوى الرسالة (يدعم التنسيق)').setRequired(true))
                .addStringOption(option => 
                    option.setName('color').setDescription('اختر لون الإمبد (مثال: #5865F2 أو Gold, Blue, Red)').setRequired(false))
                .addAttachmentOption(option => 
                    option.setName('image').setDescription('صورة كبيرة تظهر في أسفل الإمبد (اختياري)').setRequired(false))),

    async execute(interaction) {
        const subCommand = interaction.options.getSubcommand();

        if (subCommand === 'create') {
            const title = interaction.options.getString('title');
            const description = interaction.options.getString('description');
            
            // معالجة اللون (لو المستخدم كتب لون هيكس أو اسم، أو افتراضي فخم)
            let colorInput = interaction.options.getString('color') || '#2b2d31';
            
            // الحصول على الصورة المرفقة لو وجدت
            const imageAttachment = interaction.options.getAttachment('image');

            // بناء الإمبد الفخم الاحترافي
            const embed = new EmbedBuilder()
                .setAuthor({ 
                    name: interaction.guild.name, 
                    iconURL: interaction.guild.iconURL({ dynamic: true }) 
                })
                .setTitle(`✨ | ${title}`)
                .setDescription(description)
                .setColor(colorInput)
                .setFooter({ 
                    text: `Requested by ${interaction.user.tag}`, 
                    iconURL: interaction.user.displayAvatarURL({ dynamic: true }) 
                })
                .setTimestamp();

            // لو المستخدم رفع صورة، بنضيفها للإمبد عشان تخليه رهيب
            if (imageAttachment) {
                embed.setImage(imageAttachment.url);
            }

            // رد مخفي للمشرف إن الرسالة اتبعتت بنجاح، وإرسال الإمبد في الشات
            await interaction.reply({ content: '⚡ **تم إنشاء وإرسال الإمبد الفخم بنجاح!**', ephemeral: true });
            return interaction.channel.send({ embeds: [embed] });
        }
    },
};