const {SlashCommandBuilder} = require('@discordjs/builders');
const fs = require('fs');
const crits = require("../crits.json");
cachedQuotes = null;
cacheExpiry = Date.now();
const expiryLength = 600;

/*

	**$crit** [option]\nI say a critical line!  Which one I say depends on what you put as the option:\
	**$crit** -- a random line from your personal collection created with **$addCrit**.\
	**$crit** list -- show the user's current list of quotes.\
	**$crit** [number] -- say the quote with the number index.  The first one in your list is located at 0.\
	**$crit** random -- say a quote randomly picked from all users' quotes.`"

*/

module.exports = {
	data: new SlashCommandBuilder()
		.setName("crit")
		.setDescription("Create and use critical hit quotes in chat!")
		.addSubcommand(subcommand =>
			subcommand.setName("list")
				.setDescription("List your personalized critical quote repository"))
		.addSubcommand(subcommand =>
			subcommand.setName("random")
				.setDescription("Use a quote from the entire server's pool of quotes"))
		.addSubcommand(subcommand =>
			subcommand.setName("add")
				.setDescription("Add a critical quote to your list")
				.addStringOption(option =>
					option.setName("quote")
						.setDescription("A new quote to add to your list")
						.setRequired(true)))
		.addSubcommand(subcommand =>
			subcommand.setName("delete")
				.setDescription("Delete a quote from your list")
				.addIntegerOption(option =>
					option.setName("number")
						.setDescription("Use a crit quote from your list by index")
						.setRequired(true)))
		.addSubcommand(subcommand =>
			subcommand.setName("quote")
				.setDescription("I'll say one of your quotes!")
				.addIntegerOption(option =>
					option.setName("number")
						.setDescription("Index of quote from your list (check with /crit list)"))),
	
	async execute(interaction) {
		user = interaction.member.id;
		command = interaction.options.getSubcommand()
		if (command == "random") {
			if (!cachedQuotes || Date.now() > cacheExpiry + expiryLength) {
				var critList = [];
				const userLists = Object.values(crits);
				userLists.forEach(function(v) {
					critList.concat(v);
				})
				cachedQuotes = critList;
				cacheExpiry = Date.now();
			}
			let quoteIdx = Math.floor(Math.random() * cachedQuotes.length);
			interaction.reply(cachedQuotes[quoteIdx]);
			return;
		} else if (command == "list") {
			if (crits.hasOwnProperty(user)) {
				quotes = crits[user];
				quoteList = []
				for (i=0; i<quotes.length; i++) {
					quoteList.push(`${i}) ${quotes[i]}`)
				}
				interaction.reply({content: `Here's your list:\n${quoteList.join("\n")}`, ephemeral: true});
			} else {
				interaction.reply("I don't have a list for you yet.  You can start one by using `/crit add`");
			}
			return;
		} else if (command == "add") {
			quote = interaction.options.getString("quote");
			if (crits.hasOwnProperty(user)) {
				critList = crits[user];
				critList.push(quote);
			} else {
				crits[user] = [];
				crits[user].push(quote);
			}
			numCrits = crits[user].length;
			fs.writeFile('./crits.json', JSON.stringify(crits, null, 2), "utf8", function(err) {
				if (err) return console.log(err);
			});
			interaction.reply(`I added your quote!  Now you have ${numCrits}`);
			return;
		} else if (command == "delete") {
			idx = interaction.options.getInteger("number");
			critList = crits[user];
			critList = critList.splice(idx, 1);
			numCrits = crits[user].length;
			interaction.reply(`I deleted that quote.  Now you have ${numCrits}`);
			if (numCrits == 0) {
				delete crits[user];
				interaction.followUp("That's the last one.  Don't you like me?")
			}
			fs.writeFile('./crits.json', JSON.stringify(crits, null, 2), "utf8", function(err) {
				if (err) return console.log(err);
			});
			return;
		} else if (command == "quote") {
			idx = interaction.options.getInteger("number")
			if (idx) {
				user = interaction.member.id;
				interaction.reply(crits[user][idx]);
				return;
			} else {
				idx = Math.floor(Math.random() * crits[user].length);
				interaction.reply(crits[user][idx]);
				return;
			}
		}
		return;
	}
}