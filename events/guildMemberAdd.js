module.exports = {
	name: "guildMemberAdd",
	once: false,
	execute(client, member) {
		const channel = member.guild.channels.find('name', 'the_barracks');
		if (!channel) return;
		channel.send(`Hiya ${member.user.username}, how's it going?  Welcome!`);
		return;
	}
}