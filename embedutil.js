const { RichEmbed } = require("discord.js");
const moment = require("moment-timezone");
const config = require("./config.json");

class EmbedUtil {
    
    constructor(user, type) {
        
        this.creator_avatar = user.avatarURL;
        this.creator = `${user.username}  (${user.id})`;
        this.embed = new RichEmbed();
        this.fields = [];
        this.etype = type;
        
    }

    addField(name, val) {
        this.fields.push({
            key: name,
            value: val
        });

        return this;
    }

    getBody() {
        let body = "";

        this.fields.forEach((index, value) => {
            body += `**${index.key}:** ${index.value}\n`
        });

        return body;
    }

    construct() {
        return new RichEmbed()
                    .setAuthor(this.creator, this.creator_avatar)
                    .setDescription(this.getBody())
                    .setTimestamp(new Date().toISOString())
                    .setColor(config.log_colors[this.etype]);
    }
}

module.exports = EmbedUtil;