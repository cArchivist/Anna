exports.run = (client, message, args) => {
	var command;
	var response;
	var roles = message.guild.roles;
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
		//return (role.name !== /Grandmaster/|/Villager/|/Merchant/|/Lodestar/);
	});
	var roleNames = roles.map(guildRole => guildRole.name);
	if (args.length > 0) {
		command = args[0].toLowerCase();
	} else {
		command = "default";
	}
	switch(command) {
		case "ping":
			response = "**$ping**\nEasy!  You say `$ping`, and I say pong.  Use this to test connectivity and latency.";
			break;
		case "faction":
			response = 
			`**$faction** [faction name]
If you're a Villager rank or above, you can join a faction, which changes your nickname color. Available factions:
>` + roleNames.join(", ");
			break;
		case "profile":
			response = "**$profile**\nShows your server profile, including join date and current faction and rank.\n";
			break;
		case "setdescription":
			response = "**$setDescription** [description]\nMakes a blurb that shows up in your profile.  Keep it short and sweet!";
			break;
		case "setclass":
			response = "**$setClass** [class]\nSets a class in your profile.  Not restricted to FE classes.";
			break;
		case "addcrit":
			response = "**$addCrit** [quote]\nAdds a crit quote to your user id that can be called with **$crit**."
			break;
		case "deletecrit":
			response = "**$deleteCrit** [number]\nDeletes a quote from your crit list at the given index."
			break;
		case "crit":
			response = `**$crit** [option]\nI say a critical line!  Which one I say depends on what you put as the option:
			**$crit** -- a random line from your personal collection created with **$addCrit**.
			**$crit** list -- show the user's current list of quotes.
			**$crit** [number] -- say the quote with the number index.  The first one in your list is located at 0.
			**$crit** random -- say a quote randomly picked from all users' quotes.`
			break;
		case "convert":
			response = `**$convert** [value]\nConverts the *value* you give me into another unit.\nExample:\n'$convert 32F' will get 0C.\nRight now I can handle:\n>Temperature (F/C)`
			break;
		default:
			response = "Hiya!  Here's what I have in stock:\n\n**Commands**\n>$ping\n>$profile\n>$faction [faction name]\n>$setDescription [description]\n>$setClass [class]\n>$addCrit [quote]\n>$deleteCrit [quote]\n>$crit [option]\n\nTry one or say `$help [command]` to learn more!";
			break;
	}
	message.channel.send(response);
};