// Ballistic Studios AutoMod (node.js variant)
// Written by doctr_oof

// Constants
const commando = require("discord.js-commando");
const config = require("./config.json");
const token = require("./token.json");
const util = require("./utils.js");
const client = new commando.Client({
    owner: [ "114432227378593792", "434334173973708801", "126518371066839041" ],
    commandPrefix: config.default_prefix,
    disableEveryone: true,
    disabledEvents: [ "TYPING_START" ],
    unknownCommandResponse: false
});

// Variables
var channels;
var guild;

// Initialize Events and setPresence Interval
function initBot() {
    client.on("messageDelete", message => {
        //if (message.author.bot || message.member.roles.find("name", "Ballistic Studios") || message.content.startsWith(config.default_prefix)) return;
        //channels.logging.send(`[${util.timestamp()}] **MESSAGE DELETED** - <@${message.author.id}> - <#${message.channel.id}> - ${message.cleanContent || "<media content>"}`);
        let log = util.embed(0xffffff, "Message Deleted", "")
                    .addField("Author", message.author, true)
                    .addField("Channel", message.channel, true)
                    .addField("Content", message.cleanContent || "<media-content>", true)
        
        channels.logging.send({ embed: log });
    });

    client.on("guildMemberAdd", member => {
        let defaultRoles = [ ];

        defaultRoles.push(guild.roles.find("name", config.default_role));
        defaultRoles.push(guild.roles.find("name", config.notify_role_id));
        member.addRoles(defaultRoles).catch(console.error);

        channels.logging.send(`[${util.timestamp()}] **MEMBER JOINED** - <@${member.id}>`);
        channels.lounge.send(`**SWOOP SWOOP!** We have a new member of the server! Everyone give a warm welcome to <@${member.id}>!\nBe sure to read <#453768693139111936> before you do ANYTHING!`)
            .then(messageObject => messageObject.delete(30000))
            .catch(console.error);
    });

    client.on("guildMemberRemove", member => {
        channels.logging.send(`[${util.timestamp()}] **MEMBER LEFT** - ${member.user.username}`);
        channels.lounge.send(`:wave: Adios **${member.user.username}**. You might be missed... (probably not)`)
            .then(messageObject => messageObject.delete(30000))
            .catch(console.error);
    });

    setInterval(() => client.user.setPresence({ game: { name: config.default_messages[Math.floor(Math.random() * config.default_messages.length)] } }), 20000);
}

// Wait for ready state, then set up client
client.once("ready", () => {
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

    initBot();

    guild.members.get(client.user.id).setNickname(`AutoMod v${config.version}`);
    channels.logging.send(`[${util.timestamp()}] **BOT START** - I'm awake! You're using Ballistic Studios AutoMod v${config.version}`);
});

process.on("promiseRejection", console.error);
client.on("error", console.error);
client.login(token.default_token);
