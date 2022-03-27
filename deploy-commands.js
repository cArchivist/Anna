const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const config = require('./config.json');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({version: '10'}).setToken(config.token);

console.log("Refreshing Anna's / commands");
rest.put(
    Routes.applicationCommands(config.clientId), 
    { body: commands },
).then(() => console.log("Successfully refreshed Anna's / commands"))
.catch(console.error);
