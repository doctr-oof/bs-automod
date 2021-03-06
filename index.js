// Ballistic Studios AutoMod (node.js variant)
// Written by doctr_oof

// Constants
const commando = require("discord.js-commando");
const fs = require("fs");
const config = require("./config.json");
const token = require("./token.json");
const util = require("./utils.js");
const embed = require("./embedutil.js");
const client = new commando.Client({
    owner: config.owner_ids, commandPrefix: config.default_prefix,
    disableEveryone: true, disabledEvents: [ "TYPING_START" ], unknownCommandResponse: false
});

// Variables
var channels;
var guild;

// Initialize Events and setPresence Interval
function initBotEvents() {
    console.log("Hooking all guild events...");

    client.on("messageDelete", message => {
        if (message.author.bot || message.member.roles.find("name", "Ballistic Studios") || message.content.startsWith(config.default_prefix)) return;

        let log = new embed(message.author, "general")
                    .addField("Action", "Messaged Deleted")
                    .addField("Channel", message.channel)
                    .addField("Content", message.cleanContent || "<media-content>")
                    .construct();

        channels.logging.send({embed: log});
    });

    client.on("guildMemberAdd", member => {
        let defaultRoles = [ ];
        let log = new embed(member.user, "general")
                    .addField("Note", "User has joined the server")
                    .construct();

        defaultRoles.push(guild.roles.get(config.default_role_id));
        defaultRoles.push(guild.roles.get(config.notify_role_id));
        member.addRoles(defaultRoles).catch(console.error);
        channels.logging.send({embed: log});
        channels.lounge.send(`**SWOOP SWOOP!** We have a new member of the server! Everyone give a warm welcome to ${member.user}!\nBe sure to read <#453768693139111936> before you do ANYTHING!`)
            .then(messageObject => messageObject.delete(60000))
            .catch(console.error);
    });

    client.on("guildBanAdd", (guild, user) => {
        channels.lounge.send(`**${user.username}** has been permanently banned from the server! Good riddance. :)`);
    });

    client.on("guildMemberRemove", member => {
        let log = new embed(member.user, "general")
                    .addField("Note", "User has left the server")
                    .construct();

        channels.logging.send({embed: log});
    });
}

// Wait for ready state, then set up client
client.once("ready", () => {
    console.log("Got bot 'ready' state!");

    guild = client.guilds.get(config.guild);
    channels = {
        lounge: guild.channels.get(config.lounge_channel),
        logging: guild.channels.get(config.logging_channel)
    };

    client.registry
        .registerDefaultTypes()
        .registerDefaultGroups()
        .registerDefaultCommands({ ping: false, prefix: false, groups: false, load: false, unload: false, disable: false, enable: false, reload: false  })
        .registerGroups([ [ "admin", "Admin" ], [ "fun", "Fun" ], [ "roles", "Roles" ], ["general", "General"] ])
        .registerCommandsIn(__dirname + "/commands");

    initBotEvents();

    guild.members.get(client.user.id).setNickname(`AutoMod v${config.version}`);
    setInterval(() => {
        guild.members.get(client.user.id).setNickname(`AutoMod v${config.version}`);
        client.user.setPresence({ game: { name: config.default_messages[Math.floor(Math.random() * config.default_messages.length)] } })
    }, 20000);

    let log = util.embed(config.log_color, "Bot Start!", `I'm awake! v${config.version}`);
    channels.logging.send({embed: log});

    console.log("Fully initialized the bot!");
});

/*process.on("uncaughtException", error => {
    try {
        fs.writeFileSync(`C:\AUTOMOD ERROR ${Date.now() / 1000}.txt`, error);
        client.destroy();
        exec('C:\\discord-bots\\bs-automod\\run.bat', (err) => {
            if (err) console.error(err);
        });
    } catch (error) {
        console.error("FAILED TO RECOVER FROM CRITICAL ERROR");
        process.exit(2);
    }
});*/

client.on("error", error => channels.logging.send(error));
client.login(token.default_token);
