const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("greet")
		.setDescription("Anna says hello!"),
	async execute(interaction) {
		interaction.reply("Hi! I'm Anna, friendly shopkeep of the Deeprealm!  Whenever you're ready, let me know what you'd like.  Learn what I've got in stock with `/help`.").catch(console.error);
	}
}