/**
 * Sanity CLI Configuration
 * This file configures the Sanity CLI tool with project-specific settings
 * and customizes the Vite bundler configuration.
 * Learn more: https://www.sanity.io/docs/cli
 */

import {defineCliConfig} from 'sanity/cli'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'rmirl1zi'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  studioHost: process.env.SANITY_STUDIO_STUDIO_HOST || '', // Visit https://www.sanity.io/docs/environment-variables to learn more about using environment variables for local & production.
  deployment: {
    autoUpdates: true,
    appId: 'hb3cd2oo8wyxf6ui0y5bnwx0',
  },
  typegen: {
    path: '../nextjs-app/sanity/**/*.{ts,tsx,js,jsx}',
    schema: './schema.json',
    generates: '../nextjs-app/sanity.types.ts',
    overloadClientMethods: true,
  },
})
