const Discord = require("discord.js")
require("dotenv").config()

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_VOICE_STATES"
    ]
})

var phrases = ["Calla mierda.", "Eres el camarón del grupo.", "Tkm.", "Feliz día pala.", "No hay comprensión.", "Es que tú no entiendes wn",
             "Hoy día pase cerca a la casa del individuo de Jorge buckley 185 dpto 12 quien tiene una llave en la maceta, no trabaja los viernes, tiene 2 gatos; uno naranja y uno negro,  tiene 2 cuartos 1 baño 1 cocina 1 sala y 1 piano que no toca, 2 monitores  y tambien tiene tres bicis"]

client.on("messageCreate", (message) => {
    if(message.content == "camaron"){
        var phrase = phrases[Math.floor(Math.random()*phrases.length)];
        message.reply(phrase)
    }
})

let bot = {
    client,
    prefix: "s.",
    owners: ["270438022837829642"]
}

client.commands = new Discord.Collection()
client.events = new Discord.Collection()

client.loadEvents = (bot, reload) => require("./handlers/events")(bot, reload)
client.loadCommands = (bot, reload) => require("./handlers/commands")(bot, reload)

client.loadEvents(bot, false)
client.loadCommands(bot, false)

module.exports = bot


client.login(process.env.TOKEN)