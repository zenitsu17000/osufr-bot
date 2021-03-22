const Discord = require("discord.js");
const { moveMessagePortToContext } = require("worker_threads");

const Client = new Discord.Client;

const prefix = "+";

var lockall = false
var antilink = false

Client.on("ready", () => {
    console.log("bot opérationel");

    Client.guilds.cache.find(guild => guild.id === "798920360196046868").channels.cache.find(channel => channel.id === "813117801257762846").messages.fetch("816663540059471893").then(message => {
        console.log("message ajouté à la mémoire : " + message.content)
    }).catch(err => {
        console.log("impossible d'ajouter le message à la mémoire : " + err)
    })
});

let lock = ['salons : ']
let ownerlist = ['owners : ', 738033402422362185, 698942865174429726]
let whitelist = ['whitelisted : ', 738033402422362185, 698942865174429726]

Client.on("ready", async () =>{
    Client.user.setActivity("le sanctuaire");
})

Client.on("messageReactionAdd", (reaction, user) => {

});
Client.on("message", message => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return;

    if(!message.member.hasPermission("ADMINISTRATOR")){
        for(var i = 0 ; i <lock.length ; i++){
            if(lock[i] == message.channel.id){
                message.delete()
            }
        }
    }
    if(!message.member.hasPermission("ADMINISTRATOR")){
        if(lockall == true){
            message.delete()
        }
    }
    if(antilink == true){
        for(var i = 0 ; i <ownerlist.length ; i++){
            var isowner = true
        }
        if(isowner == false){
            if(message.content("https"))
            message.delete();
            message.channel.reply("les liens ne sont pas autorisés !")
        }
        if(message.content("discord.gg"))
        message.delete();
    }
    

if(message.content.startsWith(prefix + "clear")){
    if(message.member.hasPermission("MANAGE_MESSAGES")){
        
        let args = message.content.trim().split(/ +/g);

        if(args[1]){
            if(!isNaN(args[1]) && args[1] >= 1 && args[1] <= 99){

                message.delete();
                message.channel.bulkDelete(args[1]);
                message.channel.send(new Discord.MessageEmbed()
                .setColor("#53AE46")
                .setDescription("✅ **succès :** Les messages ont été supprimés avec succès !"));

            }
        }
    }
}

    if(message.member.hasPermission("ADMINISTRATOR")){

        if(message.content.startsWith(prefix + "reactest")){
            message.channel.send(new Discord.MessageEmbed()
            .setDescription("test de réaction !"))
            message.react(("😂"))
        }

        if(message.content.startsWith(prefix + "test")){
            if(message.author.id == 698942865174429726){
                let mention = message.mentions.members.first()
                message.delete();
                mention.roles.add("813122099300270184")
            }
        }
        if(message.content.startsWith(prefix + "untest")){
            if(message.author.id == 698942865174429726){
                let mention = message.mentions.members.first()
                message.delete();
                mention.roles.remove("813122099300270184")
            }
        }
        
        if(message.content.startsWith(prefix + "lock")){
        var ispresent = false
        for(var i = 0 ; i <lock.length ; i++){
            if(lock[i] == message.channel.id){
                var ispresent = true
            }}
            if(ispresent == false){
                lock.push(message.channel.id)
                message.channel.send(new Discord.MessageEmbed()
                .setColor("#53AE46")
                .setDescription("✅ **succès :** Le salon a été verrouillé avec succès !"));
                return
            }
            else if(ispresent == true){
                message.channel.send(new Discord.MessageEmbed()
                .setColor("#FF0000")
                .setDescription("❌**erreur:** Ce salon est déja bloqué."))
                var ispresent = false
                return
            }
        }
        if(message.content.startsWith(prefix + "unlock")){
            var ispresent = false
            for(var i = 0 ; i <lock.length ; i++){
                if(lock[i] == message.channel.id){
                    var ispresent = true
                }}
                if(ispresent == false){
                    message.channel.send(new Discord.MessageEmbed()
                    .setColor("#FF0000")
                    .setDescription("❌**erreur:** Ce salon n'est pas bloqué !"))
                }
                else {
                    for(var i = 0 ; i <lock.length ; i++){
                        if(lock[i] == message.channel.id){
                            lock.splice(i,1)
                            message.channel.send(new Discord.MessageEmbed()
                            .setColor("#53AE46")
                            .setDescription("✅ **succès :** Le salon a été deverrouillé avec succès !"));
                        }
                    }
                }
        }
        if(message.content.startsWith(prefix + "all lock on")){
            if(lockall == false){
                var lockall = true
                message.channel.send(new Discord.MessageEmbed()
                    .setDescription("✅ **succès :** tous les salons sont maintenant bloqués."))
            }
            else {
                message.channel.send(new Discord.MessageEmbed()
                    .setColor("#FF0000")
                    .setDescription("❌**erreur:** Les salons sont déja bloqués !"))
  
            }
        }
        if(message.content.startsWith(prefix + "all lock off")){
            if(lockall == true){
                var lockall = false
                message.channel.send(new Discord.MessageEmbed()
                .setDescription("✅ **succès :** tous les salons ne sont maintenant plus bloqués."))
            }
            else {
                message.channel.send(new Discord.MessageEmbed()
                    .setColor("#FF0000")
                    .setDescription("❌**erreur:** Les salons ne sont pas bloqués !"))
            }
        }

        if(message.content.startsWith(prefix + "owner add")){
            var isowner = false
            for(var i = 0 ; i <ownerlist.length ; i++){
                if(ownerlist[i] == message.member.id){
                    var isowner = true
                }
            }
            if(isowner == true){
                let mention = message.mentions.members.first()
                if(mention == undefined){
                    message.channel.send(new Discord.MessageEmbed()
                    .setColor("#FF0000")
                    .setDescription("❌**erreur:** Membre inconnu ou mal mentionné."))
                }
                else {
                    ownerlist.push(mention.id)
                    ownernames.push(mention.displayName)
                    message.channel.send(new Discord.MessageEmbed()
                        .setColor("#17BB00")
                        .setDescription("✅ **succès :** " + mention.displayName + " a été ajouté avec succès à la ownerlist !"))
                }
            }
            else if(isowner == false){
                message.channel.send(new Discord.MessageEmbed()
                .setColor("#FF0000")
                .setDescription("❌**erreur:** Vous n'êtes pas dans la ownerlist !"))
            }
        }

        if(message.content.startsWith(prefix + "owner remove")){
            for(i = 0 ; i <ownerlist.length ; i++){
                if(ownerlist[i] == message.member.id){
                    let mention = message.mentions.members.first()
                    for(i = 0 ; i <ownerlist.length ; i++){
                        if(mention == undefined){
                            message.channel.send(new Discord.MessageEmbed()
                                .addField("erreur", "membre inconnu ou mal mentionné"))
                        }
                        else if(ownerlist[i] == mention.id){
                            if(message.member.id == 698942865174429726){
                                ownerlist.splice[i,1]
                                message.channel.send(new Discord.MessageEmbed()
                                    .setColor("#17BB00")
                                    .addField("✅ **succès**", mention.displayName + " a été retiré de la ownerlist.", true))
                            }
                        }
                    }
                }
            }
        }
        if(message.content.startsWith(prefix + "owner list")){
            message.channel.send(ownerlist)
        }
        if(message.content.startsWith(prefix + "wl add")){
            var isowner = false
            var iswl = false
            for(var i = 0 ; i <ownerlist.length ; i++){
                if(ownerlist[i] == message.member.id){
                    var isowner = true
                }
            }
            if(isowner == true){
                let mention = message.mentions.members.first()
                if(mention == undefined){
                    message.channel.send(new Discord.MessageEmbed()
                    .setColor("#FF0000")
                    .setDescription("❌ **erreur:** Membre inconnu ou mal mentionné."))
                }
                else {
                    for(var i = 0 ; i <whitelist.length ; i++){
                        if(whitelist[i] == mention.id){
                            var iswl = true
                        }
                    }
                    if(iswl == false){
                        whitelist.push(mention.id)
                        message.channel.send(new Discord.MessageEmbed()
                            .setColor("#17BB00")
                            .setDescription("✅ **succès :** " + mention.displayName + " a été ajouté avec succès à la whitelist !"))
                            return
                    }
                    else if(iswl == true){
                        message.channel.send(new Discord.MessageEmbed()
                            .setColor("#FF0000")
                            .setDescription("❌ **erreur:** La mention est déja dans la whitelist."))
                            return
                    }
                    whitelist.push(mention.id)
                    message.channel.send(new Discord.MessageEmbed()
                        .setColor("#17BB00")
                        .setDescription("✅ **succès :** " + mention.displayName + " a été ajouté avec succès à la whitelist !"))
                }
            }
            else if(isowner == false){
                message.channel.send(new Discord.MessageEmbed()
                .setColor("#FF0000")
                .setDescription("❌ **erreur:** Vous n'êtes pas dans la ownerlist !"))
            }
        }
        if(message.content.startsWith(prefix + "wl remove")){
            for(i = 0 ; i <ownerlist.length ; i++){
                if(ownerlist[i] == message.member.id){
                    let mention = message.mentions.members.first()
                    for(i = 0 ; i <ownerlist.length ; i++){
                        if(mention == undefined){
                            message.channel.send(new Discord.MessageEmbed()
                                .addField("erreur", "membre inconnu ou mal mentionné"))
                        }
                        else if(ownerlist[i] == mention.id){
                            for(var i = 0 ; i <whitelist.length ; i++){
                                if(whitelist[i] == mention.id){
                                    var iswl = true
                                }
                            }
                            if(iswl == false){
                                message.channel.send(new Discord.MessageEmbed()
                                        .setColor("#FF0000")
                                        .setDescription("❌ **erreur:** La mention n'est pas dans la white list !"))
                            }
                            else if(iswl == true){
                                if(whitelist[i] == message.member.id){
                                    whitelist.splice[i,1]
                                    message.channel.send(new Discord.MessageEmbed()
                                        .setColor("#17BB00")
                                        .addField("✅ **succès**", mention.displayName + " a été retiré de la whitelist.", true))
                                }
                                else {
                                    message.channel.send(new Discord.MessageEmbed()
                                        .setColor("#FF0000")
                                        .setDescription("❌ **erreur:** Vous n'êtes pas dans la ownerlist !"))
                                }
                                
                            }
                        }
                    }
                }
            }
        }

        if(message.content.startsWith(prefix + "wl list")){
            message.channel.send(whitelist)
        }


        if(message.content.startsWith(prefix + "userinfo")){
            message.channel.send(new Discord.MessageEmbed()
                .addField('Membre', member, true)
                .addField('Tag', member.user.tag, true)
            )
        }
        if(message.content.startsWith(prefix + "antilink on")){
            for(i = 0 ; i <ownerlist.length ; i++){
                if(ownerlist[i] == message.member.id){
                    var isowner = true
                }
            }
            if(isowner == true){
                if(antilink == true){
                    message.channel.send(new Discord.MessageEmbed()
                        .setColor("#FF0000")
                        .setDescription("❌ **erreur:** Les liens sont déja bloqué."))
                }
                else {
                    var antilink = true
                    message.channel.send(new Discord.MessageEmbed()
                    .setColor("#53AE46")
                    .setDescription("✅ **succès :** les liens sont maintenant bloqués !"))
                }
            }
            else {
                message.channel.send(new Discord.MessageEmbed()
                    .setColor("#FF0000")
                    .setDescription("❌ **erreur:** Vous n'êtes pas dans la ownerlist !"))
            }
        }
        if(message.content.startsWith(prefix + "antilink off")){
            for(i = 0 ; i <ownerlist.length ; i++){
                if(ownerlist[i] == message.member.id){
                    var isowner = true
                }
            }
            if(isowner == true){
                if(antilink == true){
                    var antilink = false
                    message.channel.send(new Discord.MessageEmbed()
                    .setColor("#53AE46")
                    .setDescription("✅ **succès :** les liens sont maintenant débloqués !"))
                }
                var antilink = true
                message.channel.send(new Discord.MessageEmbed()
                .setColor("#53AE46")
                .setDescription("✅ **succès :** les liens sont maintenant bloqués !"))
            }
            else {
                message.channel.send(new Discord.MessageEmbed()
                .setColor("#FF0000")
                .setDescription("❌ **erreur:** les liens ne sont pas bloqués !"))
            }
        }

        if(message.content.startsWith(prefix + "mute")){
            let mention = message.mentions.members.first();
            if(mention == undefined){
                message.channel.send(new Discord.MessageEmbed()
                .setColor("#FF0000")
                .setDescription("❌ **erreur:** Membre inconnu ou mal mentionné."))
            }
            else {
                if(mention.bannable){
                    mention.roles.add("813810959138947072");
                    message.channel.send(new Discord.MessageEmbed()
                    .setColor("#53AE46")
                    .setDescription("✅ **succès :** " + mention.displayName + " a été mute avec succès !"));
                }
                else {
                    message.channel.send(new Discord.MessageEmbed()
                    .setColor("#FF0000")
                    .setDescription("❌**erreur:** Vous ne pouvez pas mute ce membre !"))
                }
            }
        }

        if(message.content.startsWith(prefix + "unmute")){
            let mention = message.mentions.members.first();
            if(mention == undefined){
                message.channel.send(new Discord.MessageEmbed()
                .setColor("#FF0000")
                .setDescription("❌**erreur:** Membre inconnu ou mal mentionné."))
            }
            else {
                mention.roles.remove("813810959138947072");
                message.channel.send(new Discord.MessageEmbed()
                .setColor("#53AE46")
                .setDescription("✅ **succès :** " + mention.displayName + " a été unmute avec succès !"));
            }
        }

        if(message.content.startsWith(prefix + "tempmute")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.channel.send(new Discord.MessageEmbed()
                    .setColor("#FF0000")
                    .setDescription("*❌erreur:** membre inconnu ou mal mentionné."))
            }
            else {
                if(mention.bannable){
                    let args = message.content.split (" ");
                    mention.roles.add("813810959138947072");
                    message.channel.send("<@" + mention.id + ">" + " est temporairement mute.")
                    setTimeout(function() {
                        mention.roles.remove("813810959138947072");
                        message.channel.send("<@" + mention.id + ">" + " ton mute est terminé. Tu peut de nouveau parler.");
                    }, args[2] * 1000);
                }
            }
        }

        if(message.content.startsWith(prefix + "kick")){
            let mention = message.mentions.members.first();
            if(mention == undefined){
                message.channel.send(new Discord.MessageEmbed()
                .setColor("#FF0000")
                .setDescription("❌**erreur:** Membre inconnu ou mal mentionné."))
            }
            else {
               if(mention.kickable){
                    mention.kick();
                    message.channel.send(new Discord.MessageEmbed()
                    .setColor("#53AE46")
                    .setDescription("✅ **succès :** " + mention.displayName + " a été expulsé avec succès !"));
                }
                else {
                    message.channel.send(new Discord.MessageEmbed()
                    .setColor("#FF0000")
                    .setDescription("❌**erreur:** Vous ne pouvez pas expulser ce membre !"))
                }
            }
        }
        
        if(message.content.startsWith(prefix + "ban")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.channel.send(new Discord.MessageEmbed()
                .setColor("#FF0000")
                .setDescription("❌**erreur:** Membre inconnu ou mal mentionné."))
            }
            else {
                if(mention.bannable){
                    mention.ban();
                    message.channel.send(new Discord.MessageEmbed()
                    .setColor("#53AE46")
                    .setDescription("✅ **succès :** " + mention.displayName + " a été banni avec succès !"));
                }
                else {
                    message.channel.send(new Discord.MessageEmbed()
                    .setColor("#FF0000")
                    .setDescription("❌**erreur:** Vous ne pouvez pas bannir ce membre !"))
                }
            }
        }
        var embed = new Discord.MessageEmbed()
            .setColor("#53AE46")
            .setTitle("HELP")
            .addField("toutes les commandes sont à utiliser avec le préfixe " + prefix, "\u200b")
            .addField("\u200b", "\u200b", false)
            .addField("kick + mention", "exclue la personne mentionnée.")
            .addField("ban + mention ", "bannie la personne mentionnée")
            .addField("mute + mention", "rend la personne mentionnée muette")
            .addField("unmute + mention", "demute la personne mentionnée")
            .addField("tempmute + mention + temps (en sec)", "mute temporairement la personne mentionnée")
            .addField("clear + nombre de messages (entre 0 et 99)", "supprime le nombre de messages indiqué")
            .addField("lock", "bloque le salon dans lequel le message est envoyé")
            .addField("unlock", "débloque le salon dans lequel le message est envoyé")
            .addField("all lock", "bloque tous les salons")
            .addField("owner add", "ajoute un membre à la ownerlist. Seul zenitsu le bg et arka le best ont accès à cette commande.")
            .addField("owner remove", "retire un membre à la ownerlist. Seul zenitsu le bg et arka le best ont accès à cette commande.")
            .addField("wl add", "ajoute la mention à la whitelist.")
            .addField("wl remove", "enlève la mention de la whitelist.")
            .addField("wl list", "donne la liste des identifiants de la whitelist.")
    }
    if(message.content.startsWith(prefix + "help")){
        message.channel.send(embed)
    }
});

Client.login("ODEzMDEyNDA3ODkwMjE0OTcy.YDJGzw.n6UWp2rH6P92aGeZ7bKmmgPszx4");

