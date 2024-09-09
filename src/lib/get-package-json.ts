import path from 'path';
import fs from 'fs';

export function getPackageJson() {
  const packageJsonPath = path.join(process.cwd(), 'package.json');

  try {
    const packageJson = fs.readFileSync(packageJsonPath, 'utf-8');
    return JSON.parse(packageJson);
  } catch (error: unknown) {
    console.error('❌ Failed to read package.json:', error instanceof Error ? error.message : 'Unknown error');
    return null;
  }
}
