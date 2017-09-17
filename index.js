var SlackBot = require("slackbots")
var request = require("request")
var endpoint = "https://icanhazdadjoke.com/slack"

const envKey = process.env.JOKES_BOT_TOKEN

// create a bot
var bot = new SlackBot({
  token: envKey,
  name: "Jokes Bot"
})

bot.on("message", msg => {
  switch (msg.type) {
    case "message":
      // we only want to listen to direct messages that come from the user
      if (msg.channel[0] === "D" && msg.bot_id === undefined) {
        getRandomJoke(postMessage, msg.user)
      }
      break
  }
})

const postMessage = (message, user) => {
  bot.postMessage(user, message, { as_user: true })
}

const getRandomJoke = (callback, user) => {
  return request(endpoint, (error, response) => {
    if (error) {
      console.log("Error: ", error)
    } else {
      let jokeJSON = JSON.parse(response.body)
      let joke = jokeJSON.attachments[0].text
      return callback(joke, user)
    }
  })
}
