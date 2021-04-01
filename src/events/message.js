const client = require('../index');
const { Collection } = require('discord.js');
const { permission } = require('../handlers/functions');
const cooldown1 = new Set();
const cooldown2 = new Set();

client.on('message', async message => {

    if (message.author.bot || message.channel.type === "dm" || !message.guild) return;

    const prefix = client.config.bot.prefix

    //! RESPONDENDO APENAS A MENÇÃO DO BOT
    if (message.content == (`<@!${client.user.id}>`) || message.content == (`<@${client.user.id}>`)) {
        if (cooldown1.has(message.author.id)) return;

        message.inlineReply(`Meu prefixo é \`${prefix}\`, para mais detalhes digite \`${prefix}ajuda\`.`);

        cooldown1.add(message.author.id);
        return setTimeout(() => cooldown1.delete(message.author.id), 6000);
    };

    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();
    if (commandName.length === 0) return;
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;

    //! VERIFICAÇÃO DE DONO
    if (command.onlyOwner) if (!client.config.bot.ownerId.includes(message.author.id)) return;

    //! COOLDOWN DOS COMANDOS
    if (!client.cooldowns.has(command.name)) client.cooldowns.set(command.name, new Collection());

    const now = Date.now();
    const timestamps = client.cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            if (cooldown2.has(message.author.id)) return;

            const timeLeft = (expirationTime - now) / 1000;

            message.inlineReply(`Aguarde **${Math.floor(timeLeft)} segundos** antes de executar outro comando!`);

            cooldown2.add(message.author.id);
            return setTimeout(() => cooldown2.delete(message.author.id), 5000);
        };
    };

    //! SE NÃO FOR DONO ADICIONA COOLDOWN
    if (!client.config.bot.ownerId.includes(message.author.id)) {
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    };

    //! VERIFICAR PERMISSÕES DO MEMBRO
    if (command.memberPermissions != '') {

        if (!client.config.bot.ownerId.includes(message.author.id)) {
            const neededPermissions = [];

            command.memberPermissions.forEach((perm) => {
                if (!message.channel.permissionsFor(message.member).has(perm)) neededPermissions.push(perm);
            });

            if (neededPermissions.length > 0) {
                if (neededPermissions.includes('SEND_MESSAGES')) return message.author.send(`Sem permissão`).catch(O_o => { });

                return message.inlineReply(`Sem permissão`).catch(O_o => { })
            };
        };
    };

    //! VERIFICAR SE O BOT TEM PERMISSÕES
    if (command.botPermissions != '') {

        const neededPermissions = [];

        command.botPermissions.forEach((perm) => {
            if (!message.channel.permissionsFor(message.guild.me).has(perm)) neededPermissions.push(perm);
        });

        if (neededPermissions.length > 0) {
            if (neededPermissions.includes('SEND_MESSAGES')) return message.author.send(`Não possuo permissão para executar este comando!\n - Permissões faltando: **${permission(neededPermissions)}**`).catch(O_o => { });

            return message.inlineReply(`Não possuo permissão para executar este comando!\n - Permissões faltando: **${permission(neededPermissions)}**`).catch(O_o => { });
        };
    };

    //! VERIFICAR SE O COMANDO PRECISA DE ARGUMENTOS
    if (command.args && !args.length) {
        return message.inlineReply('Falta argumento').catch(O_o => { });
    };

    //! EXECUÇÃO DO COMANDO
    if (command) return command.execute(message, args, client);

});