import { Command } from 'commander';
import { getTunnelStatus } from '../lib/utils';
import { logger } from '../lib/logger';

export const status = new Command()
  .command('status')
  .description('Check the status of the current tunnel')
  .action(async () => {
    try {
      const status = await getTunnelStatus();
      logger.info('Tunnel Status:');
      logger.info(`Uptime: ${status.uptime}`);
      logger.info(`Connections: ${status.connections}`);
      logger.info(`Data Usage: ${status.dataUsage}`);
    } catch (error) {
      logger.error('Failed to retrieve tunnel status:', error);
    }
  });

