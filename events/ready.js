exports.run = (client) => {
	console.log(`Ready to serve!`);
	const config = require("../config.json");
	const fs = require('fs');
	var guild = client.guilds.get("224815180582748160");
	var channel = guild.channels.get("375096265408774144");
	if (config.lastUpdate != config.version) {
		config.lastUpdate = config.version;
		fs.writeFile('../config.json', JSON.stringify(config, null, 2), "utf8", function(err) {
		if (err) return console.log(err);
		channel.send(`Boop!  I've improved the shop!  Welcome to Anna's Secret Shop version ${config.version}!`);
	});
	}
	
}