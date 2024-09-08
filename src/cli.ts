#!/usr/bin/env node
import { Command } from 'commander';
import { startTunnelForNext, stopTunnel, version } from './index.js';
import fs from 'fs';
import path from 'path';

const program = new Command();

program.version(version, '-v, --version').description('NextTunnel CLI');

// Command to start the local tunnel and Next.js app
program
  .command('dev')
  .description('Start the local tunnel and Next.js app')
  .option('-p, --port <port>', 'Port number', (value) => parseInt(value, 10), 3000) // Corrected the parser here
  .option('-s, --subdomain <subdomain>', 'Subdomain')
  .action(async (cmd) => {
    const port = cmd.port;
    await startTunnelForNext({
      port,
      subdomain: cmd.subdomain,
    });
  });

program
  .command('stop')
  .description('Stop the local tunnel')
  .action(async () => {
    await stopTunnel();
  });

// Command to initialize next-tunnel in the package.json
program
  .command('init')
  .description('Modify package.json to use next-tunnel')
  .action(() => {
    const packageJsonPath = path.resolve(process.cwd(), 'package.json');

    try {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

      if (packageJson.scripts && packageJson.scripts.dev) {
        packageJson.scripts.dev = 'next-tunnel dev';
      } else {
        packageJson.scripts = {
          ...packageJson.scripts,
          dev: 'next-tunnel dev',
        };
      }

      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

      console.log('✅ package.json updated: "dev" script changed to "next-tunnel dev"');
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('❌ Failed to update package.json:', error.message);
      } else {
        console.error('❌ Failed to update package.json: Unknown error');
      }
    }
  });

program.parse(process.argv);
