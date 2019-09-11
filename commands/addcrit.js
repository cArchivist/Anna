exports.run = (client, message, args) => {
	var fs = require('fs');
	const config = require("../config.json");
	var crits = require("../crits.json");
	var id = message.author.id;
	// pattern for deletion: $setcrits delete ${id_to_delete}
	var critQuote = args.join(" ");
	// if there's already a list for that user, add a quote
	if (crits.hasOwnProperty(id)) {
		var critList = crits[id];
		critList.push(critQuote);
	} else {
		// if not, make a new array and add to that
		crits[id] = [];
		crits[id].push(critQuote);
	}

	
	var userCrits = crits[id].length;
	
	fs.writeFile('./crits.json', JSON.stringify(crits, null, 2), "utf8", function(err) {
		if (err) return console.log(err);
	});
	message.channel.send(`I added your quote!  Now you have ${userCrits}`);
	return;

};