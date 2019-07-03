const axios = require('axios');
const apiKey = process.env.YOUTUBE_DATA_API_KEY_JERIARAH2;

module.exports.searchByQueries = (queries, callback, message) => {
	message.channel.send(`**Searching songs ... :mag_right:**`);
	axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${queries}&maxResults=5&key=${apiKey}`, {
    }).then(res => {
    	if (res.data) {
	    	callback(res.data);
    	}
    }).catch((err) => {
    	console.log(err)
    })
}