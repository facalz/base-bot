const { Client, Collection, Intents } = require('discord.js');

module.exports = class extends Client {
	constructor(config) {
		super({
			intents: 1647,
			disableMentions: 'everyone'
		});

		this.commands = new Collection();

		this.cooldowns = new Collection();

		this.config = config;
	}
};