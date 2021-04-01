const { readdirSync } = require('fs');

module.exports = async client => {
    readdirSync('./src/commands/').forEach(dir => {
        const cmd = readdirSync(`./src/commands/${dir}/`).filter(file =>
            file.endsWith('.js')
        );

        for (let file of cmd) {
            let pull = require(`../commands/${dir}/${file}`);

            if (pull.name) {
                client.commands.set(pull.name, pull);
            } else {
                continue;
            }

            if (pull.aliases && Array.isArray(pull.aliases))
                pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
        };
    });
};