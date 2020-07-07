import icon from 'react-icons/lib/md/assignment'

// FIELDS
// - Select show / event
// - Download
// - Contact
// - Links

export default {
  name: 'brand',
  title: 'Brand',
  type: 'document',
  icon,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'text',
      title: 'Text',
      type: 'blockContent'
    },

    {
      name: 'show',
      title: 'Linked Show',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{ type: 'event' }]
      }],
      length: 1,
    },

    {
      name: 'downloads',
      title: 'Downloads',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'label',
            title: 'Label',
            type: 'string'
          },
          {
            name: 'link',
            title: 'Link',
            type: 'url',
            validation: Rule => Rule.uri({
              scheme: ['http', 'https', 'mailto', 'tel']
            })
          }
        ]
      }]
    },

    { 
      name: 'contacts',
      title: 'Contact',
      type: 'array',
      of: [{ 
        type: 'object',
        fields: [
          {
            name: 'label',
            title: 'Label',
            type: 'string'
          },
          {
            name: 'name',
            title: 'Name',
            type: 'string'
          },
          {
            name: 'email',
            title: 'Email',
            type: 'string',
          }
        ]
      }],
    },

    { 
      name: 'links', 
      title: 'Links',
      type: 'array', 
      of: [{
        type: 'object',
        fields: [
          {
            name: 'label',
            title: 'Label',
            type: 'string'
          },
          {
            name: 'link',
            title: 'Link',
            type: 'url',
            validation: Rule => Rule.uri({
              scheme: ['http', 'https', 'mailto', 'tel']
            })
          }
        ]
      }]
    },

    // {
    //   name: 'posts',
    //   title: 'Linked Posts',
    //   type: 'array',
    //   of: [{ type: 'post' }]
    // },
  ]
}
