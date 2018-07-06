const discord = require("discord.js");

exports.newEmbed = function(color, title, message) {
    return new discord.RichEmbed()
        .setTitle(title)
        .setDescription(message)
        .setColor(color)
        .setFooter(new Date());
}
