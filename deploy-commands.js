const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const config = require('./config.json');
const fs = require('node:fs')

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
    try {
        commands.push(command.data.toJSON());
    } catch (error) {
        console.log(error);
    }
}

const rest = new REST({version: '10'}).setToken(config.token);

(async () => {
    try {
        console.log("Refreshing Anna's / commands");
        await rest.put(
            Routes.applicationCommands(config.clientId), 
            { body: commands },
        );

        console.log("Successfully refreshed Anna's / commands");
    } catch (error) {
        console.error(error);
    }
})();