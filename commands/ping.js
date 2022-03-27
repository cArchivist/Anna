const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription("Easy! You say ping, I say pong!"),
	async execute(interaction){
		return interaction.reply("Pong!");
	}
};