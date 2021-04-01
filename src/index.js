require('./struct/inlineReply');
const { Collection } = require('discord.js');
const Client = require('./struct/Client');
const client = new Client();

module.exports = client;

client.config = require('../config');

client.login(client.config.bot.token);

['aliases', 'commands'].forEach(x => client[x] = new Collection());
['command', 'event'].forEach(x => require(`./handlers/${x}`)(client));

