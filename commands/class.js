const {SlashCommandBuilder} = require('@discordjs/builders');
const fs = require('fs');
classes = require("../classes.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("class")
		.setDescription("Set your own custom class (for your server profile) here")
		.addStringOption(option =>
			option.setName("class")
				.setDescription("Your class of choice")
				.setRequired(true)),
	async execute(interaction) {
		var user = interaction.member.id;
		var memberClass = interaction.options.getString("class");
		classes[user] = memberClass;
		fs.writeFile('./classes.json', JSON.stringify(classes, null, 2), "utf8", function(err) {
			if (err) return console.log(err);
		});
		interaction.reply(`I updated your class to ${memberClass}!`);
	}
}