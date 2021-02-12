module.exports = {
	name: "greet",
	description: "`$greet`\nAnna says hello!",
	execute(message, cfg, args) {
		message.channel.send("Hi! I'm Anna, friendly shopkeep of the Deeprealm!  Whenever you're ready, let me know what you'd like.  Learn what I've got in stock with `$help`.").catch(console.error);
	}
}