exports.run = (client, message, args) => {
	const config = require("../config.json");
	if(message.author.id !== config.ownerID) {
		message.channel.send("Uh-uh-uh!  You can't use that one.");
		return;
	}
	if(!args || args.size < 1) {
		message.reply("Please, tell me a command name to reload.");
		return;
	} 
	
	var command = args[0].toLowerCase();
	delete require.cache[require.resolve(`./${command}.js`)];
	message.channel.send(`Heehee!  I've got a new version of ${args[0]} to use!`);
};