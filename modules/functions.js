module.exports = (bot) => {

	bot.log = (type, msg, title) => {
		if (!title) title = "Log";
		console.log(`[${type}] [${title}]${msg}`);
	};
}