const { MessageEmbed } = require("discord.js");
const { Colors } = require("../../../utils/configs/settings");
const client = require("nekos.life");
const neko = new client();

module.exports = {
    config: {
        name: "kiss",
        aliases: [""],
        category: "sfw",
        description: "Gives you a kiss!",
        usage: "[mention]",
        example: "@hnxtasia",
        accessableby: "Members"
    },
    run: async (client, message) => {
        let mention = message.mentions.users.first();

        const roleColor = message.guild.me.roles.highest.hexColor;

        if (mention && mention !== message.author) {
            neko.sfw.kiss().then(kiss => {
                const embed = new MessageEmbed()
                    .setColor(roleColor === "#000000" ? Colors.CUSTOM : roleColor)
                    .setDescription(`${message.author} just kissed ${mention}.`)
                    .setImage(kiss.url)
                    .setFooter(`Requested by ${message.author.tag} | Powered by nekos.life`, message.author.avatarURL({ dynamic: true }))
                    .setTimestamp();
    
                message.channel.send(embed);
            });
        } else {
            neko.sfw.kiss().then(kiss => {
                const embed = new MessageEmbed()
                    .setColor(roleColor === "#000000" ? Colors.CUSTOM : roleColor)
                    .setDescription(`${message.author} just kissed himself.`)
                    .setImage(kiss.url)
                    .setFooter(`Requested by ${message.author.tag} | Powered by nekos.life`, message.author.avatarURL({ dynamic: true }))
                    .setTimestamp();
    
                message.channel.send(embed);
            });
        }
    }
};