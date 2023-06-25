import {Client, Events, GatewayIntentBits, REST, Routes} from 'discord.js';
import {config} from "./config/configuration.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
  ]
});
const commands = [];

// Bot initialization
client.on(Events.ClientReady, () => {
  console.debug(`[Initialization] Bot is up and logged in as ${client.user.tag}`);

  initSavingSystem(() => {
    // register commands, listeners and schedulers
    registerCommands()
      .then(() => registerListeners()
        .then(() => registerSchedulers()));
  });
});

client.login(config.token);

function initSavingSystem(callback) {
  import('./services/saving-system.js').then(savingSystem =>
  savingSystem.createFileIfNotExist(callback))
}

/**
 * Register the commands that users can use to interact with the bot
 * @returns {Promise<void>}
 */
async function registerCommands() {
  await import('./commands/set-monkey-channel.command.js')
    .then(commandFile => commands.push(commandFile.cmd));
  console.debug(`[Commands] Starting registering ${commands.length} commands ...`);
  const rest = new REST({version: '10'}).setToken(config.token);
  await rest.put(Routes.applicationCommands(config.clientId), {body: commands.map(cmd => cmd.data.toJSON())})
    .then(data => {
      console.debug(`[Commands] Successfully registering ${data.length} commands`);
    });
}

/**
 * Register all the listener that the bot use
 * @returns {Promise<void>}
 */
async function registerListeners() {
  console.debug('[LISTENERS] Starting registering listeners ...');
  await import('./listeners/interactions.listener.js')
    .then(listener => listener.listenInteractions(client, commands));
  console.debug('[LISTENERS] Successfully registering listeners ...');
}

async function registerSchedulers() {
  console.debug('[LISTENERS] Starting registering schedulers ...');
  await import('./schedulers/monkey-gif-scheduler.js')
    .then(scheduler => scheduler.scheduleGiftPublication(client));
  console.debug('[LISTENERS] Successfully registering schedulers ...');
}
