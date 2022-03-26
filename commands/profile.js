const { SlashCommandBuilder } = require('@discordjs/builders');
const { Discord } = require('discord.js');
const helpers = require('./helpers/helpers.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName("profile")
		.setDescription("Retrieve your personal profile saved in this server. See also /setclass /setdescription and /faction"),
	async execute(interaction) {
		var member = interaction.member;
		var name = member.displayName;
		console.log(`Received user info: ${name}`);
		var descriptions = require("../descriptions.json");
		var id = member.id;
		var desc;

		if (descriptions.hasOwnProperty(id)) {
			desc = descriptions[id];
		} else {
			desc = `It's you, ${name}!  If you want to change this, use the /setDesciption command!`;
		}
		var memClass;
		var classes = require("../classes.json");
		if (classes.hasOwnProperty(id)) {
			memClass = classes[id];
		} else {
			memClass = "This user has no class.";
		}
		
		var memberRank = helpers.rank(member);
		let embedMsg = new Discord.MessageEmbed()
			.setTitle(name)
			.setThumbnail(user.displayAvatarURL())
			.setDescription(desc)
			.setColor(member.displayHexColor)
			.addField("Faction and Rank", `${member.roles.color.name} ${memberRank}`)
			.addField("Class", `${memClass}`)
			.addField("Member Since", `${member.joinedAt}`)
		message.channel.send({ embeds: [embedMsg ]}).catch(console.error);
		return;
	}
}