const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const { rankMap, cosmeticRoles } = require('../helpers/helpers.js');

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
		cosmRoles = cosmeticRoles(guild);
		//console.log(cosmeticRoles);
		command = interaction.options.getSubcommand();
		if (command == "join") {
			factionName = interaction.options.getString("faction");
			roleName = factionName.charAt(0).toUpperCase() + factionName.slice(1);
			let role = cosmRoles.find(x => x.name == roleName);
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
			// add new cosmetic
			interaction.member.roles.set(Array.from(ranked.keys()).concat([role]))
			interaction.reply(`Boop! You're now a proud member of ${roleName}!`);
			return;
		} else if (command == "colors") {
			colorRoles = Array.from(cosmRoles.values());
			console.log(`Current number of colors: ${colorRoles.length}`);
			let colorMessage = "**Available colors:\n**";
			for (var i = 0; i<colorRoles.length; i++) {
				colorMessage += (colorRoles[i].name + ": " + colorRoles[i].hexColor + "\n");
			}
			interaction.reply({content: colorMessage, ephemeral: true});
			return;
		} else if (command == "traitor") {
			// find pares down to one -- should not be more than one faction at a time
			colorRole = interaction.member.roles.cache.find(function(role) {
				if (!rankMap.has(role.id) && role.name != "@everyone") {
					return role;
				}
			});
			if (!cosmRoles.has(colorRole.id)) {
				interaction.reply("Wait a minute, you don't belong to a faction.  Whom are you betraying?")
			} else {
				interaction.member.roles.remove(colorRole);
				interaction.reply(`Oh, so it's treachery, is it?  Fine.  You've betrayed ${colorRole.name} and your reputation suffers accordingly.`);
			}
			return;
		} else if (command == "sample") {
			factionName = interaction.options.getString("name");
			roleName = factionName.charAt(0).toUpperCase() + factionName.slice(1);
			let role = cosmRoles.find(x => x.name == roleName);
			if (!role) {
				interaction.reply({ content: "I couldn't find that one.  Is it spelled correctly?", ephemeral: true});
				return;
			}
			let embedMsg = new MessageEmbed()
				.setTitle(roleName)
				.setDescription(`This is a sample message for ${roleName}`)
				.setThumbnail(interaction.member.displayAvatarURL())
				.setColor(role.hexColor);
			interaction.reply({ embeds: [embedMsg], ephemeral: true})
		} else if (command == "found") {
			// interaction.deferReply();
			factionName = interaction.options.getString("name")
			roleName = factionName.charAt(0).toUpperCase() + factionName.slice(1);
			let existingRole = cosmRoles.find(x => x.name == roleName);
			if (existingRole) {
				interaction.reply({content: `We already have ${roleName}. Its color is ${existingRole.hexColor}`, ephemeral: true});
				return;
			}
			color = interaction.options.getString("color")
			interaction.guild.roles.create({
				name: roleName,
				color: color,
				position: 5
			}).then((newRole) => {
				// preserve ranking roles but eliminate cosmetic ones
				ranked = interaction.member.roles.cache.filter(function(role) {
					if (rankMap.has(role.id)) {
						return role
					}
				})
				interaction.member.roles.set(Array.from(ranked.keys()).concat([newRole.id]))
				interaction.reply(`You are the proud founder of a new faction, ${roleName}!  Let people everywhere be awed by its glory!`)
			}).catch(console.error);
		} else {
			interaction.reply({content: `You gave me a subcommand (${command}), but I don't understand it`, ephemeral: true});
		}
	}
}