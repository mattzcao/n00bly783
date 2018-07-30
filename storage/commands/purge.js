const Discord = require("discord.js");

module.exports.run = async (bot, message, arg) => {
    async function purge() {
        message.delete();
        if(!message.member.hasPermission("MANAGE_MESSAGES")) {
            message.reply('Please make sure that you have the `MANAGE_MESSAGES` permission to use this command');
            return;
        }

        if(isNaN(arg[0])) {
            message.channel.send('Please use a number as your argument. \nUsage: ' + `${botConfig.prefix}purge <amount>`);
            return;
        }

        const fetched = await message.channel.fetchMessages({limit: arg[0]});
        console.log(fetched.size + ' messages found, deleting...');

        message.channel.bulkDelete(fetched)
        .catch(error => message.channel.send(`Error: ${error}`));
    }
    purge();
}

module.exports.help = {
    name: "purge"
}