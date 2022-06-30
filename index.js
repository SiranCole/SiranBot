const Discord = require("discord.js")
require("dotenv").config()

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES"
    ]
})

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)
})

var phrases = ["Calla mierda.", "Eres el camarón del grupo.", "Tkm.", "Feliz día pala.", "No hay comprensión.", "Es que tú no entiendes wn"]

client.on("messageCreate", (message) => {
    if(message.content == "camaron"){
        var phrase = phrases[Math.floor(Math.random()*phrases.length)];
        message.reply(phrase)
    }
})

client.login(process.env.TOKEN)