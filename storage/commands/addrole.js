const Discord = require("discord.js");

module.exports.run = async (bot, message, arg) => {
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("Oof. Insufficient permissions. Please have the `MANAGE_MEMBERS` permission.");
    let roleUser = message.guild.member(message.mentions.users.first()||message.guild.member.get(arg[0]));
    if(!roleUser) return message.reply("Couldn't find specified user: `" +  roleUser + "`");
    let roleAssign = arg.join(" ").splice(22);
    if(!roleAssign) return message.reply("Please assign a role!");
    let getRole =  message.guild.roles.find("name", role);
    if(!getRole) return message.reply("Couldn't find specified role" + roleAssign);

    if(roleUser.roles.has(getRole.id));
    await(roleUser.addRole(getRole.id));

    try {
        roleUser.send("Congrats! You have been given the role:" + getRole.name);
    } catch(e) {
        roleUser.send(`Congrats! You have been given the role: ${getRole.name}. Please unlock your DM's for these messages` );
    }
    console.log(module.exports.help.name + ".js run");
}

module.exports.help = {
    name: "addrole"
}