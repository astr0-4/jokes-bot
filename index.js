var SlackBot = require("slackbots")
var request = require("request")
var endpoint = "https://icanhazdadjoke.com/"

const envKey = process.env.JOKES_BOT_TOKEN

// create a bot
var bot = new SlackBot({
  token: envKey,
  name: "Jokes Bot"
})
postMessage = message => {
  return bot.postMessageToUser("alex", message, params)
}

getRandomJoke = callback => {
  return request("https://icanhazdadjoke.com/", (error, response) => {
    if (error) {
      console.log("Error: ", error)
    } else {
      const joke = JSON.parse(response.body)
      console.log(joke)
      return callback(joke)
    }
  })
}
bot.on("start", function() {
  // more information about additional params https://api.slack.com/methods/chat.postMessage
  var params = {
    icon_emoji: ":joy:"
  }
  getRandomJoke(postMessage)
})
