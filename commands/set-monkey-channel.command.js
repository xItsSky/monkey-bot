import {PermissionFlagsBits, SlashCommandBuilder} from "discord.js";

/**
 * The command that allow to save a channel fo the monkey bot
 * @type {{data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">, run: ((function(*, *): Promise<void>)|*)}}
 */
export const cmd = {
  data: new SlashCommandBuilder()
    .setName('assignmonkeychannel')
    .setDescription('Define the channel used by the bot')
    .addChannelOption(option => option
      .setName('channel')
      .setDescription('The channel to define')
      .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  run: async (client, interaction) => {
    const channel = interaction.options.get('channel');
    import('../services/saving-system.js').then(configuration => {
        configuration.saveChannelForServer(channel.channel.guildId, channel.channel.id);
      });
    interaction.reply(`I will now publish my gif on '${channel.channel.name}'`);
  }
}
