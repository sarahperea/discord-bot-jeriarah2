const ytdl = require('ytdl-core');
let youtubeHelper = require('../helpers/youtubeHelper.js')

function playURL(url) {
  const streamOptions = { seek: 0, volume: 5 };
  const stream = ytdl(url, { filter : 'audioonly' });
  const dispatcher = connection_copy.playStream(stream, streamOptions);
  message_copy.channel.send(`**Playing ${url}**`);
}

function getURL (res) {
  if (res.items && res.items[0].id && res.items[0].id.videoId) {
    let videoId = res.items[0].id.videoId;

    playURL(`https://www.youtube.com/watch?v=${videoId}`, connection_copy, message_copy)
  }
}

module.exports.run = async(client, message, args) => {
  message_copy = message
  let url_regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  let channel = message.member.voiceChannel;

  if (args.length === 0) {
    message.reply("Sorry, this command requires a youtube video url to play. :P")
  } else {
	  if (channel) {
    	channel.join()
      .then(connection => { // Connection is an instance of VoiceConnection
        connection_copy = connection
        if (args.length === 1 && args[0].match(url_regex)) {
          playURL(args[0])
        } else {
          let queries = args.join(',')
          youtubeHelper.searchByQueries(queries, getURL, message);
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
