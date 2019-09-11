exports.run = (client, message, args) => {
	const fs = require('fs');
	var descriptions = require("../descriptions.json");
	
	var id = message.author.id;
	var desc = args.join(" ");
	descriptions[id] = desc;
	fs.writeFile('./descriptions.json', JSON.stringify(descriptions, null, 2), "utf8", function(err) {
		if (err) return console.log(err);
	});
	message.channel.send("I updated your profile description!");

}