const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roles')
        .setDescription('أوامر إدارة وإعطاء الرتب للأعضاء')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
        
        // 1. أمر إعطاء رتبة لعضو
        .addSubcommand(subcommand =>
            subcommand
                .setName('give')
                .setDescription('إعطاء رتبة معينة لعضو')
                .addUserOption(option => option.setName('user').setDescription('العضو المستهدف').setRequired(true))
                .addRoleOption(option => option.setName('role').setDescription('الرتبة المراد إعطاؤها').setRequired(true)))
        
        // 2. أمر إزالة رتبة من عضو
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription('إزالة رتبة معينة من عضو')
                .addUserOption(option => option.setName('user').setDescription('العضو المستهدف').setRequired(true))
                .addRoleOption(option => option.setName('role').setDescription('الرتبة المراد إزالتها').setRequired(true))),

    async execute(interaction) {
        const subCommand = interaction.options.getSubcommand();
        const user = interaction.options.getUser('user');
        const role = interaction.options.getRole('role');
        const member = await interaction.guild.members.fetch(user.id).catch(() => null);

        if (!member) {
            return interaction.reply({ content: '❌ لم يتم العثور على العضو في السيرفر.', ephemeral: true });
        }

        if (subCommand === 'give') {
            if (member.roles.cache.has(role.id)) {
                return interaction.reply({ content: `⚠️ العضو يمتلك رتبة ${role.name} بالفعل!`, ephemeral: true });
            }

            await member.roles.add(role);
            return interaction.reply({ content: `✅ تم إعطاء رتبة **${role.name}** للعضو ${user.tag} بنجاح.` });
        } 
        
        else if (subCommand === 'remove') {
            if (!member.roles.cache.has(role.id)) {
                return interaction.reply({ content: `⚠️ العضو لا يمتلك رتبة ${role.name} أساساً!`, ephemeral: true });
            }

            await member.roles.remove(role);
            return interaction.reply({ content: `✅ تم إزالة رتبة **${role.name}** من العضو ${user.tag} بنجاح.` });
        }
    },
};