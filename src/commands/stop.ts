import { Command } from 'commander';
import { stopTunnel } from '../lib/utils';

export const stop = new Command()
  .command('stop')
  .description('Stop the local tunnel')
  .action(async () => {
    await stopTunnel();
  });
