const Discord = require('discord.js');
const ytdl = require('ytdl-core');

module.exports.run = async(client, message, args) => {
  let url_regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  let channel = message.member.voiceChannel;

  if (args.length === 0) {
    console.log("Sorry, this command requires a youtube video url to play. :P")
  } else {
	if (channel) {
      	channel.join()
        .then(connection => { // Connection is an instance of VoiceConnection
          const streamOptions = { seek: 0, volume: 5 };
  	      const stream = ytdl(args[0], { filter : 'audioonly' });
  	      const dispatcher = connection.playStream(stream, streamOptions);
          console.log('success connnect')

          if (args[0].match(regex)) {
            
          } else {
            
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
