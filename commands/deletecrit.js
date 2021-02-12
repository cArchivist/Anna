module.exports = {
	name: "deletecrit",
	description: "`$deletecrit [number]`\nDeletes a quote from your crit list at the given index.",
	execute(message, cfg, args) {
		var fs = require('fs');
		var crits = require("../crits.json");
		var id = message.author.id;
		// pattern for deletion: $setcrits delete ${id_to_delete}
		var deleteId = parseInt(args[0]);
		var userList = crits[id]
		userList = userList.splice(deleteId, 1)
		var userCrits = crits[id].length;
		message.channel.send(`I deleted that quote.  Now you have ${userCrits}`);
		if (userList.length == 0) {
			delete crits[id]
			message.channel.send("That's the last one.  Don't you like me?")
		}
		fs.writeFile('./crits.json', JSON.stringify(crits, null, 2), "utf8", function(err) {
			if (err) return console.log(err);
		});
		message.channel.send(`I added your quote!  Now you have ${userCrits}`);
		return;

	}
}