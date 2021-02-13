module.exports = {
	name: "profile",
	description: "`$profile`\n retrieve your personal profile information that you saved in this server.  This can be modified by using `$setclass`, `$setdescription`, or `$faction`.",
 	execute(message, cfg, args) {
	const Discord = require("discord.js");
	function rank(member) {
		var roleCache = member.roles.cache; 
		if (roleCache.has("224816232732426240")) { return "Grandmaster"; }
		else if (roleCache.has("225089000086568960")) { return "Lodestar";}
		else if (roleCache.has("224946686407999499")) { return "Villager"; }
		else {
			return "Unranked";
		}
	}
	var user = message.author;
	var member = message.guild.member(user);
	var name = member.displayName;
	console.log(`Received user info: ${name}`);
	var descriptions = require("../descriptions.json");
	var id = user.id;
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
	
	var memberRank = rank(member);
	let embedMsg = new Discord.MessageEmbed()
		.setTitle(name)
		.setThumbnail(user.displayAvatarURL())
		.setDescription(desc)
		.setColor(member.displayHexColor)
		.addField("Faction and Rank", `${member.roles.color.name} ${memberRank}`)
		.addField("Class", `${memClass}`)
		.addField("Member Since", `${member.joinedAt}`)
	  message.channel.send(embedMsg).catch(console.error);
	  return;
	}
}