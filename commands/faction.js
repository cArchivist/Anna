const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const { rankMap } = require('../helpers/helpers.js');
const helpers = require("../helpers/helpers.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("faction")
		.setDescription("If you're a Villager rank or above, you can join a faction, which changes your nickname color.")
		.addSubcommand(subcommand =>
			subcommand.setName("join")
				.setDescription("Join a faction (cosmetic role) (leaves prior faction)")
				.addStringOption(option => 
					option.setName("faction")
						.setDescription("The faction you wish to join")
						.setRequired(true)))
		.addSubcommand(subcommand =>
			subcommand.setName("colors")
				.setDescription("Show available roles w/ colors"))
		.addSubcommand(subcommand => 
			subcommand.setName("traitor")
				.setDescription("Betray your current faction"))
		.addSubcommand(subcommand =>
			subcommand.setName("sample")
				.setDescription("See a sample message with the faction selected")
				.addStringOption(option =>
					option.setName("name")
						.setDescription("The name of the faction to sample")
						.setRequired(true)))
		.addSubcommand(subcommand =>
			subcommand.setName("found")
				.setDescription("Found a new faction (cosmetic role), and join it immediately!")
				.addStringOption(option =>
					option.setName("name")
						.setDescription("The name of the new faction")
						.setRequired(true))
				.addStringOption(option =>
					option.setName("color")
						.setDescription("The color of your banner (role color, in hex)")
						.setRequired(true))),
	async execute(interaction) {
		guild = interaction.guild;
		cosmeticRoles = helpers.cosmeticRoles(guild);
		//console.log(cosmeticRoles);
		command = interaction.options.getSubcommand();
		if (command == "join") {
			factionName = interaction.options.getString("faction");
			roleName = factionName.charAt(0).toUpperCase() + factionName.slice(1);
			let role = cosmeticRoles.find(x => x.name == roleName);
			if (!role) {
				interaction.reply({ content: "I couldn't find that one.  Is it spelled correctly?", ephemeral: true});
				return;
			}
			// preserve ranking roles but eliminate cosmetic ones
			ranked = interaction.member.roles.cache.filter(function(role) {
				if (rankMap.has(role.id)) {
					return role
				}
			})
			interaction.member.roles.set(ranked)
			// add new cosmetic
			interaction.member.roles.add(role);
			interaction.reply(`Boop! You're now a proud member of ${roleName}!`);
			return;
		} else if (command == "colors") {
			colorRoles = cosmeticRoles.values();
			let colorMessage = "**Available colors:\n**";
			for (var i = 0; i<colorRoles.length; i++) {
				colorMessage += (colorRoles[i].name + ": " + colorRoles[i].hexColor + "\n");
			}
			interaction.reply(colorMessage);
			return;
		} else if (command == "traitor") {
			interaction.reply("Oh, so it's treachery, is it?");
			colorRole = interaction.member.roles.color;
			if (helpers.rankMap.has(colorRole)) {
				interaction.followUp("Wait a minute, you don't belong to a faction.  Whom are you betraying?")
			} else {
				interaction.member.roles.remove(colorRole);
			}
			return;
		} else if (command == "sample") {
			factionName = interaction.options.getString("name");
			roleName = factionName.charAt(0).toUpperCase() + factionName.slice(1);
			let role = cosmeticRoles.find(x => x.name == roleName);
			if (!role) {
				interaction.reply({ content: "I couldn't find that one.  Is it spelled correctly?", ephemeral: true});
				return;
			}
			let embedMsg = new MessageEmbed()
				.setTitle(roleName)
				.setDescription("This is a sample message for this faction")
				.setThumbnail(interaction.member.user.displayAvatarURL)
				.setColor(role.hexColor);
			interaction.reply({ embeds: [embedMsg], ephemeral: true})
		} else if (command == "found") {
			factionName = interaction.options.getString("name")
			color = interaction.options.getString("color")
			interaction.guild.roles.create({
				name: factionName,
				color: color
			}).then(() => {
				// preserve ranking roles but eliminate cosmetic ones
				ranked = interaction.member.roles.cache.filter(function(role) {
					if (rankMap.has(role.id)) {
						return role
					}
				})
				interaction.member.roles.set(ranked)
				// add new cosmetic
				interaction.member.roles.add(role);
			}).catch(console.error);
		} else {
			interaction.reply({content: `You gave me a subcommand (${command}), but I don't understand it`, ephemeral: true});
		}
	}
}