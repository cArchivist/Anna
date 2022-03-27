const {SlashCommandBuilder} = require('@discordjs/builders');
const fs = require('fs');
descriptions = require('../descriptions.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("description")
		.setDescription("Set a personalized description for your server profile (`/profile`")
		.addStringOption(option =>
			option.setName("description")
				.setDescription("A description for yourself")
				.setRequired(true)),
	async execute(interaction) {		
		var user = interaction.member.id;
		var desc = interaction.options.getString("description");
		descriptions[user] = desc;
		fs.writeFile('./descriptions.json', JSON.stringify(descriptions, null, 2), "utf8", function(err) {
			if (err) return console.log(err);
		});
		interaction.reply("I updated your profile description!");
	}
}