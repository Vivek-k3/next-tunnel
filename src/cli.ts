#!/usr/bin/env node
import { Command } from 'commander';
import { init } from './commands/init.js';
import { dev } from './commands/dev.js';
import { stop } from './commands/stop.js';
import { getPackageJson } from './lib/get-package-json.js';
import { preCommandChecks } from './lib/pre-command-checks.js';
const packageJson = getPackageJson();
const version = packageJson?.version || '0.0.1';

const program = new Command()
  .name('next-tunnel')
  .version(version, '-v, --version', 'display the version number')
  .description('Test your dev Next.js app with a tunnel on all your devices LIVE!!.');

program.name('loader').action(async () => {
  await preCommandChecks();
});
program.addCommand(init).addCommand(dev).addCommand(stop);

program.parse(process.argv);
