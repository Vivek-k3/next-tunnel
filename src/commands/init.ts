import { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import { logger } from '../lib/logger';
import { getPackageJson } from '../lib/get-package-json';
import { handleError } from '../lib/error-handler';
import { preCommandChecks } from '../lib/pre-command-checks';

export const init = new Command()
  .command('init')
  .description('Modify package.json to use next-tunnel')
  .action(async () => {
    const packageJson = getPackageJson();
    const packageJsonPath = path.join(process.cwd(), 'package.json');

    await preCommandChecks();

    try {
      packageJson.scripts = {
        ...packageJson.scripts,
        dev: 'next-tunnel dev',
        'dev:lan': 'next-tunnel dev --lan',
        'dev:secure': 'next-tunnel dev --secure',
      };

      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

      logger.success('✔ next-tunnel scripts added to package.json');
    } catch (error: unknown) {
      handleError(error);
    }
  });
