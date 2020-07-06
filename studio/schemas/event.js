import icon from 'react-icons/lib/md/assignment'

// FIELDS
// - Title
// - Category / tag -> Current day
// - Brand
// - Byline(ex: invite only)
// - Date
// - Start + End Time
// - Category - Show | Event
// - Location - link


export default {
  name: 'event',
  title: 'Shows & Events',
  type: 'document',
  icon,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: ['Show', 'Event'],
        layout: 'radio'
      },
    },
    {
      name: 'startTime',
      title: 'Start time',
      type: 'datetime',
    },
    {
      name: 'endTime',
      title: 'End time',
      type: 'datetime',
    },
    {
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Example "Show", "Film", "Press conference"'
    },
    {
      name: 'location',
      title: 'Location',
      type: 'object',
      fields: [
        {
          name: 'label',
          title: 'Link Text',
          type: 'text',
          rows: 1,
        },
        {
          name: 'link',
          title: 'Link',
          type: 'url',
          validation: Rule => Rule.uri({
            scheme: ['http', 'https', 'mailto', 'tel']
          })
        },
      ]
    },
    {
      name: 'byline',
      title: 'Byline',
      type: 'string',
      description: 'Ex: "Invite only"'
    },
    {
      name: 'brand',
      title: 'Linked Brand',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{ type: 'brand' }]
      }],
    },
  ]
}
