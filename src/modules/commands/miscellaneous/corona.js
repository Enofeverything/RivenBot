const { MessageEmbed } = require("discord.js");
const { Colors } = require("../../../utils/configs/settings");
const { formatNumber } = require("../../../utils/functions/general");
const api = require("novelcovid");
const moment = require("moment");

module.exports = {
    config: {
        name: "corona",
        aliases: ["covid"],
        category: "miscellaneous",
        description: "Shows some information about COVID-19!",
        usage: "[country]",
        example: "China",
        accessableby: "Members"
    },
    run: async (client, message, args) => {
        const country = args.join(" ");
        const roleColor = message.guild.me.roles.highest.hexColor;

        if (country) {
            let corona = await api.countries({country: `${country}`});
            
            const coronaEmbed = new MessageEmbed()
                .setColor(roleColor === "#000000" ? Colors.CUSTOM : roleColor)
                .setTitle(`${corona.country} Cases`)
                .setDescription("Sometimes cases number may differ from small amount.")
                .addField("Cases", formatNumber(corona.cases), true)
                .addField("Deaths", formatNumber(corona.deaths), true)
                .addField("Recovered", formatNumber(corona.recovered), true)
                .addField("Today's Cases", formatNumber(corona.todayCases), true)
                .addField("Today's Deaths", formatNumber(corona.todayDeaths), true)
                .addField("Active Cases", formatNumber(corona.active), true)
                .addField("Last Updated", `${moment(corona.updated).format("ddd, DD MMMM YYYY HH:mm [GMT]Z")} (Server Time)`, false)
                .setFooter("Data provided by Johns Hopkins University")
                .setTimestamp();
            
            return message.channel.send(coronaEmbed);
        } else {
            let corona = await api.all();
            
            const coronaEmbed = new MessageEmbed()
                .setColor(roleColor === "#000000" ? Colors.CUSTOM : roleColor)
                .setTitle("Global Cases")
                .setDescription("Sometimes cases number may differ from small amount.")
                .addField("Cases", formatNumber(corona.cases), true)
                .addField("Deaths", formatNumber(corona.deaths), true)
                .addField("Recovered", formatNumber(corona.recovered), true)
                .addField("Today's Cases", formatNumber(corona.todayCases), true)
                .addField("Today's Deaths", formatNumber(corona.todayDeaths), true)
                .addField("Active Cases", formatNumber(corona.active), true)
                .addField("Affected Countries", formatNumber(corona.affectedCountries), false)
                .addField("Last Updated", `${moment(corona.updated).format("ddd, DD MMMM YYYY HH:mm [GMT]Z")} (Server Time)`, false)
                .setFooter("Data provided by Johns Hopkins University")
                .setTimestamp();
            
            return message.channel.send(coronaEmbed);
        }
    }
};
