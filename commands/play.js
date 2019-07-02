const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const axios = require('axios');
const apiKey = process.env.YOUTUBE_DATA_API_KEY_JERIARAH2;
let ytSearch = require('../helpers/youtube-search.js')

function playURL(url, connection) {
  const streamOptions = { seek: 0, volume: 5 };
  const stream = ytdl(url, { filter : 'audioonly' });
  const dispatcher = connection.playStream(stream, streamOptions);
}

function getURL (res, connection) {
  if (res.data && res.data.items && res.data.items[0].id && res.data.items[0].id.videoId) {
    let videoId = res.data.items[0].id.videoId;

    playURL(`https://www.youtube.com/watch?v=${videoId}`, connection)
  }
}

module.exports.run = async(client, message, args) => {
  let url_regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  let channel = message.member.voiceChannel;

  if (args.length === 0) {
    console.log("Sorry, this command requires a youtube video url to play. :P")
  } else {
	if (channel) {
      	channel.join()
        .then(connection => { // Connection is an instance of VoiceConnection

          if (args.length === 1 && args[0].match(url_regex)) {
            playURL(args[0], connection)
          } else {
            let queries = args.join(',')
            ytSearch.searchByQueries(queries, getURL, connection);
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
