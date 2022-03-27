const {SlashCommandBuilder} = require('@discordjs/builders');
const config = require("../config.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("reload")
		.setDescription("Reload an existing command")
		.addStringOption(option =>
			option.setName("command")
				.setDescription("The command to reload")
				.setRequired(true)),
	async execute(interaction) {
		if(interaction.member.id !== config.ownerID) {
			interaction.reply({content: "Uh-uh-uh!  You can't use that one.", ephemeral: true});
			return;
		}
		
		var command = interaction.options.getString("command");
		console.log(`Requested reload of ${command}`);
		delete require.cache[require.resolve(`./${command}.js`)];
		try {
			const newCommand = require(`./${command}.js`);
			interaction.client.commands.set(newCommand.name, newCommand);
			interaction.reply(`Heehee!  I've got a new version of ${command} to use!`);
		} catch (error) {
			console.error(error);
			interaction.reply({content: `There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``, ephemeral: true});
		}
	}
}