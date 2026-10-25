const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('giveaway')
        .setDescription('أوامر إدارة مسابقات السحب (Giveaways)')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        
        // 1. أمر بدء مسابقة جديدة
        .addSubcommand(subcommand =>
            subcommand
                .setName('start')
                .setDescription('بدء مسابقة جديدة')
                .addStringOption(option => 
                    option.setName('prize').setDescription('الجوائز أو الهدايا المقدمة').setRequired(true))
                .addStringOption(option => 
                    option.setName('time').setDescription('مدة المسابقة (مثال: 1h أو 1d)').setRequired(true)))
        
        // 2. أمر إعادة اختيار فائز (Reroll)
        .addSubcommand(subcommand =>
            subcommand
                .setName('reroll')
                .setDescription('إعادة اختيار فائز عشوائي للمسابقة')
                .addStringOption(option => 
                    option.setName('message-id').setDescription('معرف (ID) رسالة المسابقة').setRequired(true))),

    async execute(interaction) {
        const subCommand = interaction.options.getSubcommand();

        if (subCommand === 'start') {
            const prize = interaction.options.getString('prize');
            const time = interaction.options.getString('time');

            const embed = new EmbedBuilder()
                .setTitle('🎉 مسابقة جديدة! (Giveaway)')
                .setDescription(`**الجائزة:** ${prize}\n**المدة:** ${time}\n\nاضغط على التفاعل أدناه 🎁 للمشاركة!`)
                .setColor('Gold')
                .setTimestamp();

            const message = await interaction.reply({ embeds: [embed], fetchReply: true });
            await message.react('🎁');
        } 
        
        else if (subCommand === 'reroll') {
            const messageId = interaction.options.getString('message-id');
            return interaction.reply({ content: `🔄 جاري إعادة اختيار فائز عشوائي للرسالة ذات المعرف: \`${messageId}\`...`, ephemeral: true });
        }
    },
};