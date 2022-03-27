module.exports = {
	name: "ready",
	once: true,
	execute(client) {
		console.log(`Shop's ready!  I'm open for business!`);
		const config = require("../package.json");
		client.channels.fetch("375096265408774144").then(channel => {
			channel.send(`Hii!  I'm open for business!  Welcome to Anna's Secret Shop version ${config.version}!`);
		});
	}
}