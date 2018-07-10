const commando = require("discord.js-commando");
const perms = require("../../permissions.js");
const config = require("../../config.json");
const fs = require("fs");

let notifications = [];
let lastId = 0;

function updateNotifications() {
    fs.writeFileSync("C:\\wamp64\\www\\lootboxinteractive.com\\metro\\notification.json", JSON.stringify(notifications), function(err) {
        if (err) {
            return console.log(err);
        }
    });
}

function addNotification(target, data, delay) {
    let id = lastId + 1;
    lastId = id;

    let notificationObject = {
        target: target,
        message: data,
        id: id,
        timeout: delay
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
            name: "gamenotify",
            aliases: [ "gnotify" ],
            group: "admin",
            memberName: "gamenotify",
            description: "Message everyone or a targeted user in Operation Metro.",
            examples: [ "gamenotify 'refactor' 'stop cheatz' 10" ],
            guildOnly: true,
            userPermissions: [ "MANAGE_ROLES", "MUTE_MEMBERS" ],
            args: [
                {
                    key: "target",
                    prompt: "Who or what am I targeting?",
                    type: "string"
                },
                {
                    key: "notification",
                    prompt: "What am I notifying them?",
                    type: "string"
                },
                {
                    key: "delay",
                    prompt: "How long should the message appear.",
                    type: "integer"
                }
            ]
        });
    }

    hasPermission(message) {
        if (typeof perms[this.name] == "undefined" || perms[this.name].length == 0) return true;
        return perms[this.name].some(id => message.member.roles.has(id)) || "You don't have permission to use this command!";
    }

    async run(message, {target, notification, delay}) { 
        addNotification(target, notification, delay);
    }
}
