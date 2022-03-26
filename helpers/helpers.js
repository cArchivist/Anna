const rankMap = {
    "224816232732426240": "Grandmaster",
    "225089000086568960": "Lodestar",
    "224946686407999499": "Villager",
    "373702190444969987": "Merchant"
}

module.exports = {  
    rank(member) {
        var rankRole = member.hoist; 
        if (!rankRole || !rankMap.has(rankRole.id)) {
            return "Unranked";
        }
        return rankMap[rankRole.id];
    },
    cosmeticRoles(guild) {
        roles = guild.roles.cache;
        cosmetic = roles.filter(function(role) {
            if (!rankMap.has(role.id)) {
                return role;
            }
        })
        return cosmetic;
    },
    rankMap
}