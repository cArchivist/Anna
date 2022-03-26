const { SlashCommandBuilder } = require('@discordjs/builders');
const { Discord } = require("discord.js");
const { cosmeticRoles } = require('../helpers/helpers.js');
const helpers = require("./helpers/helpers.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("faction")
		.setDescription("If you're a Villager rank or above, you can join a faction, which changes your nickname color.")
		.addStringOption(option =>
			option.setName("factionName")
				.setDescription("The name of the faction (cosmetic role) you wish to join"))
		.addSubcommand(subcommand =>
			subcommand.setName("colors")
				.setDescription("Show available roles w/ colors"))
		.addSubcommand(subcommand => 
			subcommand.setName("traitor")
				.setDescription("Betray your current faction"))
		.addSubcommand(subcommand =>
			subcommand.setName("sample")
				.setDescription("See a sample message with the faction selected")),
	async execute(interaction) {
		guild = interaction.guild;
		cosmeticRoles = helpers.cosmeticRoles(guild);
		if (interaction.options.getSubcommand() == "colors") {
			colorRoles = cosmeticRoles.array();
			var opt = args[0].charAt(0).toUpperCase() + args[0].slice(1);
			let colorMessage = "**Available colors:\n**";
			for (var i = 0; i<colorRoles.length; i++) {
				colorMessage += (colorRoles[i].name + ": " + colorRoles[i].hexColor + "\n");
			}
			interaction.channel.send(colorMessage);
			return;
		} else if (interaction.options.getSubcommand() == "traitor") {
			interaction.channel.send("Oh, so it's treachery, is it?");
			colorRole = interaction.member.roles.color;
			if (helpers.rankMap.has(colorRole)) {
				interaction.channel.send("Wait a minute, you don't belong to a faction.  Whom are you betraying?")
			} else {
				interaction.member.roles.remove(colorRole);
			}
			return;
		} else if (interaction.options.getSubcommand() == "sample") {
			if (!interaction.options.getString("factionName")) {
				interaction.reply("I need a faction name to change your allegiance.");
				return;
			} else {
				factionName = interaction.options.getString("factionName");
				roleName = factionName.charAt(0).toUpperCase() + factionName.slice(1);
				let role = cosmeticRoles.find(x => x.name == roleName);
				if (!role) {
					interaction.reply({ content: "I couldn't find that one.  Is it spelled correctly?", ephemeral: true});
					return;
				}
				let embedMsg = new Discord.MessageEmbed()
					.setTitle(roleName)
					.setDescription("This is a sample message for this faction")
					.setThumbnail(interaction.member.user.displayAvatarURL)
					.setColor(role.hexColor);
				interaction.channel.reply({ embeds: [embedMsg], ephemeral: true})
			}
		}
		if (!interaction.options.getString("factionName")) {
			interaction.reply("I need a faction name to change your allegiance.");
			return;
		} else {
			factionName = interaction.options.getString("factionName");
			roleName = factionName.charAt(0).toUpperCase() + factionName.slice(1);
			let role = cosmeticRoles.find(x => x.name == roleName);
			if (!role) {
				interaction.reply({ content: "I couldn't find that one.  Is it spelled correctly?", ephemeral: true});
				return;
			}
			interaction.member.roles.add(role);
			interaction.reply(`Boop! You're now a proud member of ${roleName}!`);
		}
	}
}