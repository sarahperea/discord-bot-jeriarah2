const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const axios = require('axios');
const apiKey = process.env.YOUTUBE_DATA_API_KEY_JERIARAH2;

module.exports.run = async(client, message, args) => {
  let url_regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  let channel = message.member.voiceChannel;
  let urlToPlay = '';

  if (args.length === 0) {
    console.log("Sorry, this command requires a youtube video url to play. :P")
  } else {
	if (channel) {
      	channel.join()
        .then(connection => { // Connection is an instance of VoiceConnection

          if (args.length === 1 && args[0].match(regex)) {
            urlToPlay = args[0];
            const streamOptions = { seek: 0, volume: 5 };
            const stream = ytdl(urlToPlay, { filter : 'audioonly' });
            const dispatcher = connection.playStream(stream, streamOptions);
          } else {
            let queries = args.join(',')
            axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${queries}&maxResults=1&key=${apiKey}`, {
            }).then(res => {
              if (res.data && res.data.items && res.data.items[0].id && res.data.items[0].id.videoId) {
                let videoId = res.data.items[0].id.videoId;
                urlToPlay = `https://www.youtube.com/watch?v=${videoId}`

                const streamOptions = { seek: 0, volume: 5 };
                const stream = ytdl(urlToPlay, { filter : 'audioonly' });
                const dispatcher = connection.playStream(stream, streamOptions);
              }
            }).catch((err)=>{
              console.log(err)
            })
          }
        })
        .catch((err)=>{
          console.log(err)
        });
    } else {
      message.reply('You need to join a voice channel first!');
    }
  }
}

module.exports.help = {
	name: 'play'
}
