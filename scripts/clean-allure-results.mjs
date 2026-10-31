import { rm } from 'node:fs/promises';

await rm(new URL('../allure-results', import.meta.url), {
  recursive: true,
  force: true,
});
