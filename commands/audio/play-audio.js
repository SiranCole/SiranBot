const { SlashCommandBuilder } = require('@discordjs/builders')
const { generateDependencyReport, AudioPlayerStatus, joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const { Interaction } = require('discord.js');
const fs = require("fs")

module.exports = {
    name: "audio",
    category: "audio",
    permissions: [],
    devOnly: false,
    run: async ({client, message, args}) => {
        const { voice } = message.member


        if (!voice.channelId) {
            message.reply({ content:'Tienes que estar en un voice channel.', ephemeral: true})
            return
        }

        const player = createAudioPlayer()

        player.on(AudioPlayerStatus.Playing, () => {
            console.log('The audio player has started playing')
        })

        player.on('error', error => {
            console.error(`Error: ${error.message} with resource`)
        })

        const files = fs.readdirSync(process.cwd() + "\\resources\\audios\\")
        
        if(args.length == 0)
            return
        
        
        if(isNaN(args[0]))
            return

        const audioNum = parseInt(args[0])
        if(audioNum <= 0 || audioNum > files.length)
            return
        const fnames = []

        const resource = createAudioResource(process.cwd() + "\\resources\\audios\\" + files[audioNum-1])
        player.play(resource);

        const connection = joinVoiceChannel({
            channelId: voice.channelId,
            guildId: voice.channel.guildId,
            adapterCreator: voice.channel.guild.voiceAdapterCreator,
        })

        message.reply({ content:"Created voice connection", ephemeral: true})
        const subscription = connection.subscribe(player);
        if(subscription){
            setTimeout(() => subscription.unsubscribe(), 15_000)
        }
        /*
        voice.channel.join().then((connection) => {
            connection.play(path.join(__dirname, 'Intro.m4a'))
        })
        */
    }
}