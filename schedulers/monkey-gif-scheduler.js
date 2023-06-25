import * as scheduler from 'node-cron';

/**
 * Schedule a gift publication
 * @param client: the discord client
 */
export function scheduleGiftPublication(client) {

  import('../config/configuration.js').then(configurationFile => {
    import('../services/saving-system.js').then(savingSystem => {

      const cron = configurationFile.config.cron;
      scheduler.schedule(cron, () => {
        console.debug('publishing gift on each channel persisted ... ');
        savingSystem.getChannelIds().forEach(id => {
          import("../services/monkey-gif-service.js").then(service =>
            service.publishGift(client, id));
        });
      });
    });
  });
}
