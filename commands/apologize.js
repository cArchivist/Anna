module.exports = {
	name: "apologize",
	description: "`$apologize [reason]`\nAnna apologizes for what you tell her to.",
	execute(message, cfg, args) {
		if(message.author.id !== cfg.ownerID) {
			message.channel.send("Uh-uh-uh!  You can't use that one.");
			return;
		}
		args = args.join(" ");
		message.channel.send(`I'm sorry ${args}.`);
	}
}