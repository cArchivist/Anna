const rankMap = new Map();
rankMap.set("224816232732426240", "Grandmaster");
rankMap.set("225089000086568960", "Lodestar");
rankMap.set("224946686407999499", "Villager");
rankMap.set("373702190444969987", "Merchant");


module.exports = {  
    rank(member) {
        var rankRole = member.roles.hoist; 
        if (!rankMap.has(rankRole.id)) {
            return "Unranked";
        }
        return rankMap.get(rankRole.id);
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