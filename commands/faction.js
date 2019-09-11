exports.run = (client, message, args) => {
	const Discord = require("discord.js");
	var out_roles = [];
	var bases = ["224816232732426240", "224946686407999499", "225089000086568960"];
	var roles = message.guild.roles;
	
	for (var i = 0; i < bases.length; i++) {
		if (message.member.roles.has(bases[i])) {
			out_roles.push(bases[i]);
		}
	}
		
	
	var opt = args[0].charAt(0).toUpperCase() + args[0].slice(1);
	if (opt == "Colors") {
		roles = roles.filter(function(role) {
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
		});
		let colorRoles = roles.array();
		let colorMessage = "**Available colors:\n**";
		for (var i = 0; i<colorRoles.length; i++) {
			colorMessage += (colorRoles[i].name + ": " + colorRoles[i].hexColor + "\n");
		}
		message.channel.send(colorMessage);
		return;
	} else if (opt == "Traitor") {
		message.channel.send("Oh, so it's treachery, is it?");
		message.member.setRoles([out_roles]);
		return;
	} else if (opt == "Sample") {
		if (args.length > 1) {
			var roleToCheck = args[1].charAt(0).toUpperCase() + args[1].slice(1);
			let role = roles.exists("name", roleToCheck) ? roles.find("name", `${roleToCheck}`) : false;
			if (!role) {
				message.channel.send("I couldn't find that one.  Did you spell it correctly?");
				return;
			} else {
				//message.channel.send(`${role.name}`);
				var name = role.name;
				var color = role.hexColor;
				let embedMsg = new Discord.RichEmbed()
					.setTitle(name)
					.setDescription("This is a sample for this faction.")
					.setThumbnail(message.member.user.displayAvatarURL)
					.setColor(color)
				message.channel.send(embedMsg).catch(console.error);
				return;
			}
		}
	}
	let role = roles.exists("name", opt) ? roles.find("name", `${opt}`) : false;
	if (!role) {
		let commandFile = require(`../commands/help.js`);
		commandFile.run(client, message, ["faction"]);
		return;
	}
	out_roles.push(role)
	if (out_roles.includes(role)) {
		message.member.setRoles(out_roles);
		message.channel.send("Changed faction to **" + role.name + "**.");
	} else {
		message.channel.send("Something went wrong when I tried to change your faction");
	}
};