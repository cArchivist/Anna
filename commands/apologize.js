exports.run = (client, message, args) => {
	const config = require("../config.json");
	if(message.author.id !== config.ownerID) {
		message.channel.send("Uh-uh-uh!  You can't use that one.");
		return;
	}
	args = args.join(" ");
	message.channel.send(`I'm sorry ${args}.`);
}