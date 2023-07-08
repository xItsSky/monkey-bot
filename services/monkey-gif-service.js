import {EmbedBuilder} from "discord.js";

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
        //'© Powered by Giphy', { files: [{ attachment: String(gifUrl) }] }
        .then(channel => channel?.send({
          embeds: [
            {
              color:  0x0099ff,
              title: 'Monkey GIF of the day !',
              url: String(gifUrl),
              author: {
                name: 'Monkey bot',
                icon_url: process.env.USER_ICON_URL,
                url: process.env.USER_URL
              },
              description: 'Hooooou Hooooou Haaaaa Haaaa, it is time to send my Monkey GIF !',
              image: {
                url: String(gifUrl)
              },
              footer: {
                text: 'Powered by GIPHY',
                icon_url: process.env.FOOTER_URL
              }
            }
          ]
        }));

    });
  });
}
