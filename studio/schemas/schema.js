// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Objects & Arrays
import blockContent from './parts/blockContent'
// import seo from './parts/seo'
// import intro from './parts/intro'
// import posterImage from './parts/posterImage'

// Docuemnts
import singeltonOptions from './singeltonOptions'
import post from './post'
import brand from './brand'
import event from './event'
import ad from './ad'


// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',

  types: schemaTypes.concat([
    // The following are document types which will appear in the studio.
    singeltonOptions,
    post,
    brand,
    event,
    ad,
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    // seo,
    // intro,
    // posterImage,
    blockContent
  ])
})
