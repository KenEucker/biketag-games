import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

import { logo } from './plugins/logo/logo'
import schemas from './schemas/schema'

export default defineConfig({
  name: 'biketag-sanity',
  title: 'Biketag Sanity',
  projectId: 'x37ikhvs',
  dataset: 'production',
  plugins: [
    structureTool(),
    visionTool(),
    '@sanity/components',
    'intl-input',
    '@sanity/google-maps-input',
    'media'
  ],
  tools: (prev) => {
    if (import.meta.env.DEV) {
      return prev
    }
    return prev.filter((tool) => tool.name !== 'vision')
  },
  schema: {
    types: schemas,
  },
  studio: {
    components: {
      logo: logo
    }
  },
  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter((templateItem) => templateItem.templateId != 'settings')
      }
      return prev
    },
    actions: (prev, { schemaType }) => {
      if (schemaType === 'settings') {
        return prev.filter(({ action }) => !['unpublish', 'delete','duplicate'].includes(action))
      }
      return prev
    },
  },
})
