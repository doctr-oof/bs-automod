const { RichEmbed } = require("discord.js");
const commando = require("discord.js-commando");
const config = require("../../config.json");
const perms = require("../../permissions.js");
const rp = require('request-promise')
const cheerio = require('cheerio')



module.exports = class MetroCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "metro",
            group: "general",
            memberName: "metro",
            description: "Get Information about our upcoming game Operation Metro",
            examples: [ "metro" ],
            throttling: { usages: 1, duration: 600 },
            guildOnly: true,
            userPermissions: [ "SEND_MESSAGES" ]
        });
    }

    hasPermission(message) {
        if (typeof perms[this.name] == "undefined" || perms[this.name].length == 0) return true;
        return perms[this.name].some(id => message.member.roles.has(id)) || "You don't have permission to use this command!";
    }

    async run(message, {user}) {
        const options = {
            uri: `https://www.roblox.com/games/1938317957/Operation-Metro-CLOSED-TESTING`,
            transform: function (body) {
                return cheerio.load(body);
            }
        };

        console.log("TEST!!!!!!")

        var embed = new RichEmbed()
            .setTitle("Operation Metro")

        rp(options)
            .then(($) => {
                $('li[class="game-stat"]').each((p, element) => {
                    console.log("TEST " + $(this).next('p').Text);
                    var dir = $(this);
                    var dtype = dir.next('p');
                    embed.addField(dir.parent().children()[2].Text, "as")
                });
            })
            .catch((err) => {

            });

            message.reply({embed: embed});

        // message.channel.send("https://www.roblox.com/games/1938317957/Operation-Metro-CLOSED-TESTING");
    }
}
