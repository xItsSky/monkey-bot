import {Events} from 'discord.js';

/**
 * Listen interactions
 * @param client: the discord client
 * @param commands: the commands to listen on
 */
export function listenInteractions(client, commands) {
  client.on(Events.InteractionCreate, async interaction => {
    if(!interaction.isChatInputCommand()) {
      return;
    }

    const command = commands.find(cmd => cmd.data.name === interaction.commandName);
    if(!command) {
      await interaction.reply(`Invalid command ${interaction.commandName}.`)
    }

    try {
      await command.run(client, interaction);
    } catch (err) {
      console.error(err);
    }
  });
}
