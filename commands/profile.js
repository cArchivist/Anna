exports.run = (client, message, args) => {
	const Discord = require("discord.js");
	function rank(member) {
		if (member.roles.has("224816232732426240")) { return "Grandmaster"; }
		else if (member.roles.has("225089000086568960")) { return "Lodestar";}
		else if (member.roles.has("224946686407999499")) { return "Villager"; }
		else {
			return "Unranked";
		}
	}
		var roles = message.guild.roles.filter(function(role) {
		if (role.name !== "Grandmaster") {
			if (role.name !== "@everyone") {
				if (role.name !== "Ambassador to the Outside") {
					if (role.name !== "Villager") {
						if (role.name !== "Lodestar") {
							if (role.name !== "Merchant") {
								return role;
							}
						}
					}
				}
			}
		}
		//var factionRole = roles.first();
	});
	var name = (message.member.nickname != null) ? message.member.nickname : message.member.user.username;
	var descriptions = require("../descriptions.json");
	var id = message.author.id;
	var desc;

	if (descriptions.hasOwnProperty(id)) {
		desc = descriptions[id];
	} else {
		desc = `It's you, ${name}!  If you want to change this, use the $setDesciption command!`;
	}
	var memClass;
	var classes = require("../classes.json");
	if (classes.hasOwnProperty(id)) {
		memClass = classes[id];
	} else {
		memClass = "This user has no class.";
	}
	
	var memberRank = rank(message.member);
	let embedMsg = new Discord.RichEmbed()
		.setTitle(name)
		.setThumbnail(message.member.user.displayAvatarURL)
		.setDescription(desc)
		.setColor(message.member.colorRole.hexColor)
		.addField("Faction and Rank", `${message.member.colorRole.name} ${memberRank}`)
		.addField("Class", `${memClass}`)
		.addField("Member Since", `${message.member.joinedAt}`)
	  message.channel.send(embedMsg).catch(console.error);
	  return;
};