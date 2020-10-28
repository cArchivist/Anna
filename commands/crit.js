module.exports = {
	name: "crit",
	description: "`**$crit** [option]\nI say a critical line!  Which one I say depends on what you put as the option:\
	**$crit** -- a random line from your personal collection created with **$addCrit**.\
	**$crit** list -- show the user's current list of quotes.\
	**$crit** [number] -- say the quote with the number index.  The first one in your list is located at 0.\
	**$crit** random -- say a quote randomly picked from all users' quotes.`",
	execute(message, cfg, args) {
		var fs = require('fs');
		var crits = require("../crits.json");
		var id = message.author.id;
		
		/* Patterns:
			1) crit => pull a quote from the user
			2) crit random => pull a quote from a random user
		*/
		if (args[0] == "random") {
			// Load random
			const keys = Object.keys(crits);
			const index = Math.floor(Math.random() * keys.length);
			const key = keys[index];
			const quotes = crits[key];
			var quote = Math.floor(Math.random() * quotes.length);
			message.channel.send(quotes[quote]);
			return;
		} else if (args[0] == "list") {
			if (message.channel.name !== "secret_shop" && message.channel.name !== "project_debug") {
				message.channel.send("Hey, your list could be really large.  How about we keep this in the back? (#secret_shop)");
				return;
			}
			var outString = ""
			var quotes = crits[id];
				crit_length = quotes.length
				list_ = []
				for (i=0; i<crit_length; i++) {
					list_.push(`${i}) ${quotes[i]}`)
				}
			message.channel.send(`Here's your list:\n${list_.join("\n")}`);
			return;
		} else {
			// Load from the user
			if (crits.hasOwnProperty(id)) {
				if (isNaN(args[0])) {
					var quotes = crits[id];
					var index = Math.floor(Math.random() * quotes.length);
					message.channel.send(quotes[index]);
					return;
				} else {
					var quotes = crits[id];
					index = parseInt(args[0]);
					message.channel.send(`${quotes[index]}`);
				}
			} else {
				message.channel.send("I don't have any quotes for you.");
				return;
			}
		}
		return;
	}
}