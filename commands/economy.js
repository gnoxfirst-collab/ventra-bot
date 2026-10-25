const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

// قاعدة بيانات مؤقتة في الذاكرة (لتجربة النظام، ويمكن ربطها بـ MongoDB لاحقاً)
const balances = new Map();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('economy')
        .setDescription('أوامر نظام الاقتصاد والأموال')
        
        // 1. أمر معرفة رصيدك أو رصيد شخص آخر (Balance)
        .addSubcommand(subcommand =>
            subcommand
                .setName('balance')
                .setDescription('معرفة رصيدك الحالي من الأموال')
                .addUserOption(option => 
                    option.setName('user').setDescription('العضو المراد فحص رصيده (اختياري)').setRequired(false)))

        // 2. أمر الراتب اليومي (Daily)
        .addSubcommand(subcommand =>
            subcommand
                .setName('daily')
                .setDescription('استلام مكافأتك اليومية من النقود'))),

    async execute(interaction) {
        const subCommand = interaction.options.getSubcommand();
        const user = interaction.options.getUser('user') || interaction.user;
        const userId = user.id;

        if (subCommand === 'balance') {
            const userBalance = balances.get(userId) || 0;

            const embed = new EmbedBuilder()
                .setTitle('💰 | رصيد الحساب')
                .setDescription(`> رصيد العضو ${user} هو: \`${userBalance} عملة\` 🪙`)
                .setColor('#FEE75C')
                .setThumbnail(user.displayAvatarURL({ dynamic: true }))
                .setTimestamp();

            return interaction.reply({ embeds: [embed] });
        } 
        
        else if (subCommand === 'daily') {
            const currentBalance = balances.get(interaction.user.id) || 0;
            const reward = 500; // قيمة الراتب اليومي
            
            balances.set(interaction.user.id, currentBalance + reward);

            const embed = new EmbedBuilder()
                .setTitle('🎁 | مكافأة الراتب اليومي')
                .setDescription(`> مبروك يا ${interaction.user}!\n> لقد استلمت راتبك اليومي بنجاح: \`+${reward} عملة\` 🪙\n> رصيدك الحالي أصبح: \`${currentBalance + reward} عملة\``)
                .setColor('#57F287')
                .setTimestamp();

            return interaction.reply({ embeds: [embed] });
        }
    },
};