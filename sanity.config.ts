import { structureTool } from "sanity/structure";
import { visionTool } from '@sanity/vision'
import { media } from 'sanity-plugin-media'
import { googleMapsInput } from '@sanity/google-maps-input'
import { documentInternationalization } from '@sanity/document-internationalization'

import { schema } from "./schemas/schema"
import SetSlugAndPublishAction from "./schemas/actions/setSlugAndPublishAction";

const name = process.env.NEXT_PUBLIC_SANITY_STUDIO_API_PROJECT_NAME as string
const title = process.env.NEXT_PUBLIC_SANITY_STUDIO_API_PROJECT_TITLE as string
const projectId = process.env.NEXT_PUBLIC_SANITY_STUDIO_API_PROJECT_ID as string
const dataset = process.env.NEXT_PUBLIC_SANITY_STUDIO_API_PROJECT_DATASET as string
const googleMapsInputApiKey = process.env.NEXT_PUBLIC_SANITY_STUDIO_API_PROJECT_GOOGLE_MAPS_INPUT as string
// const schemaTypes = schema.map((type: any) => type.name);
const schemaTypes = [
  "tag",
  "player",
  "game",
  "region",
  "ambassador",
  "setting",
  "achievement",
]

export const config = {
  name: name,
  title: title,
  projectId: projectId,
  dataset: dataset,
  plugins: [
    structureTool(),
    visionTool(),
    media(),
    googleMapsInput(JSON.parse(googleMapsInputApiKey)),
    documentInternationalization({
      // Required configuration
      supportedLanguages: [
        { id: 'en_GB', title: 'English (UK)' },
        { id: 'gm', title: 'German' },
        { id: 'no', title: 'Norwegian' },
        { id: 'es', title: 'Spanish' },
        { id: 'fr', title: 'French' },
      ],
      schemaTypes: schemaTypes,
    })
  ],
  document: {
    newDocumentOptions: (prev: any, { creationContext }: any) => {
      if (creationContext.type === 'global') {
        return prev.filter((templateItem: any) => templateItem.templateId != 'settings')
      }
      return prev
    },
    actions: (prev: any, props: any) => {
      return prev.map((Action: any) =>
        Action.name === 'publish' ? SetSlugAndPublishAction : Action
      )
    },
  },
  schema: {
    types: schema
  }
}
