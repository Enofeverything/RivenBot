module.exports = {
    getMember: function(message, toFind = "") {
        toFind = toFind.toLowerCase();

        let target = message.guild.members.cache.get(toFind);
        
        if (!target && message.mentions.members) { 
            target = message.mentions.members.first();
        };

        if (!target && toFind) {
            target = message.guild.members.cache.find((member) => {
                return member.displayName.toLowerCase().includes(toFind) || member.user.tag.toLowerCase().includes(toFind);
            });
        }
            
        if (!target) {
            target = message.member;
        };
            
        return target;
    },
    formatNumber: function(number) {
        return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }
};