import fs from 'fs';
const filePath = './resources/saves/channel-configuration.txt'
const separator = ':';

/**
 * Save a channel for a specific server
 * @param server: the server id of the server
 * @param channel: the channel to save
 */
export function saveChannelForServer(server, channel) {
  if(getEntriesByServer(readFile(filePath), server).length > 0) {
    // replace the channelId in the appropriate place in the saved file
    const regex = new RegExp(`${server}:[0-9]*\\n{0,1}`);
    const save = server + separator + channel + '\n';
    const content = readFile(filePath).replace(regex, save);
    writeFile(filePath, save)
  } else {
    // Add the channelId at the end of the file
    const save = server + separator + channel + '\n';
    appendFile(filePath, save)
  }
}

/**
 * Get the list of channel ids
 * @returns {string[]}
 */
export function getChannelIds() {
  return  getEntriesAsChannelIds(readFile(filePath));
}

/**
 * Create a file if it doesn't exist
 * @param callback: the callback to do once the file is created
 */
export function createFileIfNotExist(callback) {
  fs.exists(filePath, exists => {
    if(!exists) {
      fs.writeFile(filePath, '', {flag: 'wx'}, callback);
    } else {
      callback();
    }
  });
}

/**
 * Read the content of the file
 * @param filePath: the file path
 */
function readFile(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

/**
 * Write the content to the file
 * @param filePath: the file path
 * @param content: the content
 */
function writeFile(filePath, content) {
  return fs.writeFileSync(filePath, content);
}

/**
 * Append the content to the file
 * @param filePath: the file path
 * @param content: the content
 */
function appendFile(filePath, content) {
  return fs.appendFileSync(filePath, content);
}

/**
 * Get the saved entries
 * @param data: the data from where get the entries
 * @returns {string[]}
 */
function getEntries(data) {
  return data.split('\n').filter(entry => entry !== '');
}

/**
 * Get the saved entries filtered by serverId
 * @param data: the data from where get the entries
 * @param serverId: the server id to filter on
 * @returns {string[]}
 */
function getEntriesByServer(data, serverId) {
  return getEntries(data)
    .filter(entry => entry.includes(serverId));
}

/**
 * Get the saved entries mapped as channel ids
 *
 * @param data: the data from where get the channel ids
 * @returns {string[]}
 */
function getEntriesAsChannelIds(data) {
  return getEntries(data)
    .map(entry => entry.split(separator)[1]);
}
