const {SlashCommandBuilder} = require('@discordjs/builders');
const config = require('../config.json')

module.exports = {
	data: new SlashCommandBuilder()
		.setName("apologize")
		.setDescription("Anna apologizes for what you tell her to.")
	.addStringOption(option =>
		option.setName("reason")
			.setDescription("What Anna apologizes for")
			.setRequired(true)),
	async execute(interaction) {
		if(interaction.member.id !== config.ownerID) {
			interaction.reply("Uh-uh-uh!  You can't use that one.");
			return;
		}
		interaction.reply(`I'm sorry ${interaction.options.getString("reason")}.`);
	}
}