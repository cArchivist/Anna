module.exports = {
	name: "setClass",
	description: "`$setclass {class}`\n Set your class in your personal server profile.",
	execute(message, cfg, args) {
		var fs = require('fs');
		var classes = require("../classes.json");
		var id = message.author.id;
		var memberClass = args.join(" ");
		classes[id] = memberClass;
		fs.writeFile('./classes.json', JSON.stringify(classes, null, 2), "utf8", function(err) {
			if (err) return console.log(err);
		});
		message.channel.send(`I updated your class to ${memberClass}!`);

	}
}