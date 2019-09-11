exports.run = (client, message) => {
	message.channel.send("Hi! I'm still setting up, but I can say hello.").catch(console.error);
}