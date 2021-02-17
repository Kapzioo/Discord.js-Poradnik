const { MessageEmbed } = require('discord.js')
module.exports = {
    name : 'ping',
    category : 'info',
    description : 'Bot wysyła informacje o swoim pingu!',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run : async(client, message, args) => {
        const msg = await message.channel.send(`🏓 Obliczenie pingu!`)
        const embed = new MessageEmbed()
            .setTitle(`Ping: ${client.user.tag}`)
            .setThumbnail(client.user.displayAvatarURL())
            .setColor('RANDOM')
            .setFooter(`${message.author.tag}`)
            .setDescription(`Ping ogólny: ${client.ws.ping}MS\nPing opóźnienia wiadomość: ${Math.floor(msg.createdAt - message.createdAt)}MS!`)
            const ddd = await message.channel.send(embed)
            ddd.react('🏓')
            msg.delete()

    }
}