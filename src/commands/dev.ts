import { Command } from 'commander';
import { startSecureTunnelForNext, startLocalTunnelForNext, startTunnelForNext } from '../lib/utils';
import { logger } from '../lib/logger';

export const dev = new Command()
  .command('dev')
  .description('Start the local tunnel and Next.js app')
  .option('-p, --port <port>', 'Port number', (value) => parseInt(value, 10), 3000)
  .option('-s, --subdomain <subdomain>', 'Subdomain')
  .option('--secure', 'Start the tunnel in secure mode 🔒')
  .option('--lan', 'Start the tunnel using Local Area Network Connection(i.e your internet router connected devices.) 🔌')
  .action(async (cmd) => {
    const port = cmd.port;
    const subdomain = cmd.subdomain;

    const isSecure = cmd.secure;
    const isLocal = cmd.lan;

    if (isSecure && isLocal) {
      logger.error('Error: You can only specify one of --secure  or --local, not both 😅. Exiting... 👋🏻');
      process.exit(1);
    }

    if (isSecure) {
      await startSecureTunnelForNext({
        port,
        subdomain,
      });
    } else if (isLocal) {
      await startLocalTunnelForNext({
        port,
      });
    } else {
      await startTunnelForNext({
        port,
        subdomain,
      });
    }
  });
