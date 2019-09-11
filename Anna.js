const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");

const config = require("./config.json");

fs.stat('foo.txt', function(err, stat) {
    if(err == null) {
        console.log('File exists');
    } else if(err.code == 'ENOENT') {
        // file does not exist
        fs.writeFile('log.txt', 'Some log\n');
    } else {
        console.log('Some other error: ', err.code);
    }
});

// This loop reads the /events/ folder and attaches each event file to the appropriate event.
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });
});

client.on("message", message => {
  if (message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;

  // This is the best way to define args. Trust me.
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // The list of if/else is replaced with those simple 2 lines:
  try {
	let commandPath = `./commands/${command}.js`;
	fs.access(commandPath, (err) => {
		if (err) {
			console.log("Cannot access, likely not a command");
			return;
		}
		// If outside of the two special channels and not the 'crit' command, just return
		if ((message.channel.name !== "secret_shop") && (message.channel.name !== "project_debug") && command !== "crit") {
			message.channel.send("Hey, not here!  Come find me in my shop (#secret_shop)!")
			return;
		}
		let commandFile = require(commandPath);
		commandFile.run(client, message, args);
	});

  } catch (err) {
	message.channel.send(`Something broke: ${err}`)
    console.error(err);
  }
});

client.login(config.token);