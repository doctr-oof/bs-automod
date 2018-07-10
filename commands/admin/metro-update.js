const commando = require("discord.js-commando");
const perms = require("../../permissions.js");
const config = require("../../config.json");
const fs = require("fs");

let notifications = [];
let lastId = 0;

function updateNotifications() {
    fs.writeFileSync("C:\\wamp64\\www\\lootboxinteractive.com\\metro\\update.json", JSON.stringify(notifications), function(err) {
        if (err) {
            return console.log(err);
        }
    });
}

function addNoupdateGame() {
    let id = lastId + 1;
    lastId = id;

    let updateObject = {
        message: "SERVER SHUTDOWN FOR UPDATE",
        id: id,
    }   

    notifications.push(notificationObject)

    setTimeout(function( ) {
        
        notifications = notifications.filter(function( obj ) {
            return obj.id !== id;
        });

        updateNotifications();
    }, 10000);

    updateNotifications();
}

module.exports = class GameNotifyCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "gameupdate",
            aliases: [ "gupdate" ],
            group: "admin",
            memberName: "gameupdate",
            description: "Notify & Shutdown all servers for update.",
            examples: [ "gupdate" ],
            guildOnly: true,
            userPermissions: [ "MANAGE_ROLES", "MUTE_MEMBERS" ],
        });
    }

    hasPermission(message) {
        if (typeof perms[this.name] == "undefined" || perms[this.name].length == 0) return true;
        return perms[this.name].some(id => message.member.roles.has(id)) || "You don't have permission to use this command!";
    }

    async run(message, {user}) { 
        updateGame();
    }
}
