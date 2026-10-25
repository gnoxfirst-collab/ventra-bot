const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

// مصفوفة بسيطة لحفظ القناة المخصصة للاقتراحات لكل سيرفر (أو ممكن تربطها بقاعدة بيانات لاحقاً)
const suggestionChannels = new Map();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('suggestion')
        .setDescription('نظام الاقتراحات الاحترافي للسيرفر')
        
        // 1. أمر تحديد روم (قناة) الاقتراحات الخاصة بالسيرفر (للمشرفين)
        .addSubcommand(subcommand =>
            subcommand
                .setName('setup')
                .setDescription('تحديد الروم التي ستصل فيها اقتراحات الأعضاء')
                .addChannelOption(option => 
                    option.setName('channel').setDescription('اختر الروم المخصصة للاقتراحات').setRequired(true))
                .setDefaultMemberPermissions(PermissionFlagsBits.Administrator))
        
        // 2. أمر إرسال اقتراح جديد (متاح للجميع)
        .addSubcommand(subcommand =>
            subcommand
                .setName('send')
                .setDescription('إرسال اقتراح جديد لتطوير السيرفر')
                .addStringOption(option => 
                    option.setName('idea').setDescription('اكتب اقتراحك بالتفصيل').setRequired(true))),

    async execute(interaction) {
        const subCommand = interaction.options.getSubcommand();
        const guildId = interaction.guild.id;

        if (subCommand === 'setup') {
            const targetChannel = interaction.options.getChannel('channel');
            
            // حفظ القناة الخاصة بالسيرفر ده
            suggestionChannels.set(guildId, targetChannel.id);

            return interaction.reply({ 
                content: `✅ **تم بنجاح تعيين قناة الاقتراحات إلى:** ${targetChannel}`, 
                ephemeral: true 
            });
        } 
        
        else if (subCommand === 'send') {
            const idea = interaction.options.getString('idea');
            
            // التأكد إذا كانت الإدارة حددت روم للاقتراحات ولا لأ
            const channelId = suggestionChannels.get(guildId);
            if (!channelId) {
                return interaction.reply({ 
                    content: '❌ **عذراً، لم تقم الإدارة بتحديد روم الاقتراحات بعد!**\nيرجى من المشرفين استخدام أمر `/suggestion setup` أولاً.', 
                    ephemeral: true 
                });
            }

            const targetChannel = interaction.guild.channels.cache.get(channelId);
            if (!targetChannel) {
                return interaction.reply({ 
                    content: '❌ **لم يتم العثور على قناة الاقتراحات المحددة، قد تكون حذفت!** يرجى إعدادها مجدداً.', 
                    ephemeral: true 
                });
            }

            // بناء الإمبد الفخم للاقتراح
            const embed = new EmbedBuilder()
                .setAuthor({ 
                    name: `اقتراح جديد من: ${interaction.user.tag}`, 
                    iconURL: interaction.user.displayAvatarURL({ dynamic: true }) 
                })
                .setTitle('💡 | اقتراح جديد للتطوير')
                .setDescription(`> ${idea}`)
                .setColor('#FEE75C') // لون أصفر فخم
                .setFooter({ text: 'Soluxy Suggestion System', iconURL: interaction.client.user.displayAvatarURL() })
                .setTimestamp();

            // إرسال رسالة نجاح للي كتب الاقتراح (رد مخفي)
            await interaction.reply({ 
                content: `✅ **تم إرسال اقتراحك بنجاح إلى روم ${targetChannel}!**`, 
                ephemeral: true 
            });
            
            // إرسال الإمبد في الروم اللي الإدارة حددتها وتفعيل التفاعلات تلقائياً
            const suggestionMessage = await targetChannel.send({ embeds: [embed] });
            await suggestionMessage.react('👍');
            await suggestionMessage.react('👎');
        }
    },
};