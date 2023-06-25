/**
 * Publish a gift
 * @param client: the discord client
 * @param channelId: the channel id on which publish the gift
 */
export function publishGift(client, channelId) {
  import("gif-search").then(gifSearch => {
    gifSearch.setAPIKey(process.env.GIF_TOKEN);
    gifSearch.random('monkey').then(gifUrl => {
      client.channels.fetch(channelId)
        .then(channel => channel?.send(String(gifUrl)));
    });
  });
}
