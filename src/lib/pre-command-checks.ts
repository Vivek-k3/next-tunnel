import fs from 'fs';
import path from 'path';
import { logger } from './logger';
import { getPackageJson } from './get-package-json';
import { handleError } from './error-handler';
import ora from 'ora';
import chalk from 'chalk';
import { getPackageManager } from './get-package-manager';

export const preCommandChecks = async () => {
  const spinner1 = ora({
    spinner: 'dots3',
    text: 'Verifying Environment...',
    color: 'gray',
  }).start();
  const spinner2 = ora({
    spinner: 'dots3',
    text: 'Verifying Framework...',
    color: 'gray',
  }).start();
  const spinner3 = ora({
    spinner: 'dots3',
    text: 'Verifying Next.js Configuration...',
    color: 'gray',
  }).start();
  const spinner4 = ora({
    spinner: 'dots3',
    text: 'Gathering package.json file...',
    color: 'gray',
  }).start();

  try {
    const environment = await getPackageManager(process.cwd());

    await new Promise((r) => setTimeout(r, 1000));
    spinner1.succeed('Verifying Environment. Detected ' + chalk.cyan(`${environment}`));

    const nextConfigPath = path.join(process.cwd(), 'next.config.mjs');
    if (fs.existsSync(nextConfigPath)) {
      spinner2.succeed('Verifying Framework. Detected ' + chalk.cyan('Next.js'));
    } else {
      spinner2.fail('Next.js framework not detected! Make sure next.config.mjs exists.');
      throw new Error('Next.js configuration not found');
    }
    const packageJson = getPackageJson();
    if (packageJson) {
      spinner4.succeed('Package.json file gathered successfully.');
    } else {
      spinner4.fail('Failed to gather package.json.');
      throw new Error('package.json not found or invalid');
    }

    const nextConfigExists = fs.existsSync(nextConfigPath);
    if (nextConfigExists) {
      spinner3.succeed('Verifying Next.js Configuration. ' + chalk.cyan('next.config.mjs found.'));
    } else {
      spinner3.fail('Next.js configuration file not found!');
      throw new Error('Next.js configuration not found');
    }
  } catch (error) {
    spinner1.fail('Environment verification failed.');
    spinner2.fail('Framework verification failed.');
    spinner3.fail('Next.js configuration verification failed.');
    spinner4.fail('Package.json gathering failed.');
    handleError(error);
  }
};
