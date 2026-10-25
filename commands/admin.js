const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('admin')
        .setDescription('أوامر الإدارة والتحكم في السيرفر')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        
        // 1. أمر الحظر
        .addSubcommand(subcommand =>
            subcommand
                .setName('ban')
                .setDescription('حظر عضو من السيرفر')
                .addUserOption(option => option.setName('user').setDescription('العضو المراد حظره').setRequired(true))
                .addStringOption(option => option.setName('reason').setDescription('سبب الحظر')))
        
        // 2. أمر الطرد
        .addSubcommand(subcommand =>
            subcommand
                .setName('kick')
                .setDescription('طرد عضو من السيرفر')
                .addUserOption(option => option.setName('user').setDescription('العضو المراد طرده').setRequired(true))
                .addStringOption(option => option.setName('reason').setDescription('سبب الطرد')))
        
        // 3. أمر الكتم المؤقت
        .addSubcommand(subcommand =>
            subcommand
                .setName('timeout')
                .setDescription('كتم عضو لفترة محدودة')
                .addUserOption(option => option.setName('user').setDescription('العضو المراد كتمه').setRequired(true))
                .addIntegerOption(option => option.setName('minutes').setDescription('المدة بالدقائق').setRequired(true)))
        
        // 4. أمر مسح الرسائل
        .addSubcommand(subcommand =>
            subcommand
                .setName('clear')
                .setDescription('مسح عدد معين من الرسائل')
                .addIntegerOption(option => option.setName('amount').setDescription('عدد الرسائل (1-100)').setRequired(true)))

        // 5. أمر تغيير لقب العضو
        .addSubcommand(subcommand =>
            subcommand
                .setName('nickname')
                .setDescription('تغيير لقب عضو في السيرفر')
                .addUserOption(option => option.setName('user').setDescription('العضو المراد تغيير لقبه').setRequired(true))
                .addStringOption(option => option.setName('name').setDescription('اللقب الجديد').setRequired(true))),

    async execute(interaction) {
        const subCommand = interaction.options.getSubcommand();
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') || 'لم يتم ذكر سبب';

        if (subCommand === 'ban') {
            const member = await interaction.guild.members.fetch(user.id).catch(() => null);
            if (!member) return interaction.reply({ content: '❌ لم يتم العثور على العضو.', ephemeral: true });
            await member.ban({ reason });
            return interaction.reply(`🔨 تم حظر ${user.tag} | السبب: ${reason}`);
        } 
        
        else if (subCommand === 'kick') {
            const member = await interaction.guild.members.fetch(user.id).catch(() => null);
            if (!member) return interaction.reply({ content: '❌ لم يتم العثور على العضو.', ephemeral: true });
            await member.kick(reason);
            return interaction.reply(`👢 تم طرد ${user.tag} | السبب: ${reason}`);
        } 
        
        else if (subCommand === 'timeout') {
            const minutes = interaction.options.getInteger('minutes');
            const member = await interaction.guild.members.fetch(user.id).catch(() => null);
            if (!member) return interaction.reply({ content: '❌ لم يتم العثور على العضو.', ephemeral: true });
            await member.timeout(minutes * 60 * 1000, reason);
            return interaction.reply(`🔇 تم كتم ${user.tag} لمدة ${minutes} دقيقة.`);
        } 
        
        else if (subCommand === 'clear') {
            const amount = interaction.options.getInteger('amount');
            if (amount < 1 || amount > 100) return interaction.reply({ content: '❌ اختر رقماً بين 1 و 100.', ephemeral: true });
            await interaction.channel.bulkDelete(amount, true);
            return interaction.reply({ content: `🧹 تم مسح ${amount} رسالة بنجاح.`, ephemeral: true });
        }

        else if (subCommand === 'nickname') {
            const newName = interaction.options.getString('name');
            const member = await interaction.guild.members.fetch(user.id).catch(() => null);
            if (!member) return interaction.reply({ content: '❌ لم يتم العثور على العضو.', ephemeral: true });
            await member.setNickname(newName);
            return interaction.reply(`✏️ تم تغيير لقب ${user.tag} إلى **${newName}** بنجاح.`);
        }
    },
};