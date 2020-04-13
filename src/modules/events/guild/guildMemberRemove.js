const { MessageEmbed } = require("discord.js");
const { Action, Colors } = require("../../../utils/configs/settings");

module.exports = async (bot, member) => {
    let sendChannel = member.guild.channels.cache.find(x => x.name === `${Action.LEAVE}`);

    let embed = new MessageEmbed()
        .setAuthor("Member Left", member.user.avatarURL())
        .setDescription(`${member} ${member.user.tag}`)
        .setThumbnail(member.user.avatarURL())
        .setColor(Colors.RED)
        .setFooter(`ID: ${member.user.id}`)
        .setTimestamp();

    sendChannel.send(embed);
};