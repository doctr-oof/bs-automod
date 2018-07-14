const { RichEmbed } = require('discord.js');
const commando = require("discord.js-commando");
const perms = require("../../permissions.js");

class ShadesOfGrayCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "lmgtfy",
            group: "fun",
            memberName: "lmgtfy",
            description: "When people can't use google cause they're lazy, hit them with this...",
            examples: [ "lmgtfy @refactor quantum physics for dummies" ],
            args: [
                {
                    key: 'user',
                    prompt: 'Who!',
                    type: 'user'
                },
                {
                    key: 'query',
                    prompt: 'What we googlin`',
                    type: 'string'
                }
            ]
        });
    }

    hasPermission(message) {
        if (typeof perms[this.name] == "undefined" || perms[this.name].length == 0) return true;
        return perms[this.name].some(id => message.member.roles.has(id)) || "You don't have permission to use this command!";
    }

    async run(message, {user, query}) { 
        message.channel.send(`<@${user.id}> ... really? http://lmgtfy.com/?q=${query.split(" ").join("+")}`);
    }
}

module.exports = ShadesOfGrayCommand;