module.exports = {
	name: "ping",
	description: "`$ping`\nEasy! You say ping, I say pong!",
	execute(message, cfg, args){
		message.channel.send("Pong!").catch(console.error);
	}
}