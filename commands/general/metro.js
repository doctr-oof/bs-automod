const { RichEmbed } = require("discord.js");
const commando = require("discord.js-commando");
const config = require("../../config.json");
const perms = require("../../permissions.js");
const rp = require('request-promise');
const cheerio = require('cheerio');



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
            uri: `https://www.roblox.com/games/1938317957/Operation-Metro-CLOSED-TESTING#!/about`,
            transform: function (body) {
                return cheerio.load(body);
            }
        };

        rp(options)
            .then(($) => {
                var embed = new RichEmbed()
                    .setTitle("\\ Operation Metro")
                    .setDescription("Live Stats for Operation Metro")
                    .setColor(0xFFFFFF)
                    

                $('li.game-stat').each((i, elem) => {
                    var t = $(elem);
                    var lType = t.find('.text-label').text().trim()
                    var lValue = t.find('.text-lead').text().trim()
                    
                    

                    switch(lType) {
                        case "Playing":
                           embed.addField("Players Online", lValue || "error"); 
                           break;
                        case "Visits":
                            embed.addField("Plays", lValue || "error"); 
                            break;
                        case "Updated":
                            embed.addField("Last Updated", lValue || "error");
                            break;
                        default:
                            break;
                    }
                });

                message.channel.send({embed: embed});
            })
            .catch((err) => {
                console.log(err);
            });


        // message.channel.send("https://www.roblox.com/games/1938317957/Operation-Metro-CLOSED-TESTING");
    }
}
