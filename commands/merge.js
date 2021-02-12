module.exports = {
	name: "merge",
	description: "`$merge [command]`\nMerges source from dev file to main command file",
	hidden: true,
	execute(message, cfg, args) {
		const fs = require('fs');
		if(message.author.id !== cfg.ownerID) {
			message.channel.send("Uh-uh-uh!  You can't use that one.");
			return;
		}
		if (args.length == 0) {
			message.channel.send("Merge what?");
			return;
		}
		var devFile = require(`./dev/${args[0]}.js`);
		fs.writeFile(`./${args[0]}.js`, devFile, "utf8", function(err) {
			if (err) return console.log(err);
		});
	}
}