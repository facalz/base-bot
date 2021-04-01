module.exports = {
    name: 'ping',
    aliases: [''],
    description: [''],
    usage: [''],
    example: [''],
    type: [''],
    memberPermissions: [''],
    botPermissions: [''],
    cooldown: 3,
    args: false,
    nsfw: false,
    onlyOwner: false,
    async execute(message, args, client) {

        message.inlineReply('pingando');

    }
}