module.exports = {

    permission: function (permission) {
        if (permission.length > 0) {
            const traduz = {

                //! PERMISSÕES GERAIS
                'ADMINISTRATOR': 'Administrador',
                'VIEW_AUDIT_LOG': 'Registro de auditoria',
                'VIEW_GUILD_INSIGHTS': 'Análises do servidor',
                'MANAGE_GUILD': 'Gerenciar servidor',
                'MANAGE_ROLES': 'Gerenciar cargos',
                'MANAGE_CHANNELS': 'Gerenciar canais',
                'KICK_MEMBERS': 'Expulsar membros',
                'BAN_MEMBERS': 'Banir membros',
                'CREATE_INSTANT_INVITE': 'Criar convites',
                'CHANGE_NICKNAME': 'Alterar apelido',
                'MANAGE_NICKNAMES': 'Gerenciar apelidos',
                'MANAGE_EMOJIS': 'Gerenciar emojis',
                'MANAGE_WEBHOOKS': 'Gerenciar webhooks',
                'VIEW_CHANNEL': 'Ler canais de texto e de voz',

                //! PERMISSÕES DE TEXTO
                'SEND_MESSAGES': 'Enviar mensagem',
                'SEND_TTS_MESSAGES': 'Enviar mensagem TTS',
                'MANAGE_MESSAGES': 'Gerenciar mensagens',
                'EMBED_LINKS': 'Inserir links',
                'ATTACH_FILES': 'Anexar arquivos',
                'READ_MESSAGE_HISTORY': 'Ver histórico de mensagens',
                'MENTION_EVERYONE': 'Mencionar @everyone, @here e todos os cargos',
                'USE_EXTERNAL_EMOJIS': 'Usar emojis externos',
                'ADD_REACTIONS': 'Adicionar reações',

                //! PERMISSÕES DE VOZ
                'CONNECT': 'Conectar',
                'SPEAK': 'Falar',
                'STREAM': 'Vídeo',
                'MUTE_MEMBERS': 'Silenciar membros',
                'DEAFEN_MEMBERS': 'Ensurdecer membros',
                'MOVE_MEMBERS': 'Mover membros',
                'USE_VAD': 'Usar detecção de voz',
                'PRIORITY_SPEAKER': 'Voz prioritária',
            };

            var perms = '';

            permission.forEach((p, index) => {
                perms += `\`${traduz[p]}\`${index != permission.length - 1 ? ', ' : ''}`
            });
        };
        return perms;
    }

}