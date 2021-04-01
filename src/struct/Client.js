const { Client, Collection } = require('discord.js');

module.exports = class extends Client {
	constructor(config) {
		super({
			disableMentions: 'everyone',
			partials: ['MESSAGE', 'REACTION', 'USER'],
			ws: { intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_PRESENCES', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS'] }
		});

		this.commands = new Collection();

		this.cooldowns = new Collection();

		this.config = config;
	}
};