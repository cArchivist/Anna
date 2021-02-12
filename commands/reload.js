module.exports = {
	name: "reload",
	description: "`$reload {function}`\nUsed to dynamically reload a command while Anna is running.",
	execute(message, cfg, args) {
		if(message.author.id !== cfg.ownerID) {
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
	}
}