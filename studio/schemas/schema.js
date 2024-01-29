import richText from './objects/richText'
import openGraph from './objects/openGraph'
import captionImage from './objects/captionImage'

import player from './documents/player'
import tag from './documents/tag'
import game from './documents/game'
import region from './documents/region'
import ambassador from './documents/ambassador'
import setting from './documents/setting'
import achievement from './documents/achievement'

import { translateFields } from './fieldTranslation'

export default [
  // Any base object you've defined,
  // or document type that should not have
  // field-level validations
  richText,
  openGraph,
  captionImage,
  // Include documents with field translation support.
  // This changes their structure, transforming
  // simple fields like 'string' into 'object'
  // with multiple string properties, one per
  // language.
  //
  // Any document definition that does
  // not set localize: true on root level, or
  // set localize: true on any field level will
  // not be changed.
  translateFields([
    tag,
    player,
    game,
    region,
    ambassador,
    setting,
    achievement,
  ])
]
