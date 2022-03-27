const { Client, Intents, Collection } = require('discord.js');
const config = require('./config.json')
const fs = require('fs');

const client = new Client({ intents: [Intents.FLAGS.GUILDS]});

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`)
  client.commands.set(command.data.name, command)
}

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    errLogEntry = {
      "caller": interaction.member.nickname,
      "time": Date.now(),
      "command": interaction.commandName,
      "options": interaction.options,
      "error": error
    }
    console.log(errLogEntry);
    await interaction.reply({ content: "Hoo boy, better fix something in the back.", ephemeral: true});
  }
});

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.login(config.token);