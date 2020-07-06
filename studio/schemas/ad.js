import icon from 'react-icons/lib/md/assignment'

// FIELDS
// Title
// Link
// Vimeo or Image


export default {
  name: 'ad',
  title: 'Ad',
  type: 'document',
  icon,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Ad Title'
    },
    {
      name: 'text',
      title: 'Text',
      type: 'string',
      description: 'Ad Message'
    },
    {
      name: 'link',
      title: 'Link',
      type: 'string',
      description: 'Link to advertisment'
    },
    {
      name: 'media',
      title: 'Media',
      type: 'array',
      validation: Rule => Rule.required().max(1),
      of: [
        {
          name: 'image',
          title: 'Image',
          type: 'image',
          options: { hotspot: true },
        },
        {
          name: 'video',
          title: 'Vimeo Video',
          type: 'object',
          fields: [
            {
              name: 'vimeoUrl',
              title: 'Vimeo Video',
              type: 'url',
            },
          ]
        },
      ]
    },
  ]
}
