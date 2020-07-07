import icon from 'react-icons/lib/md/home'

export default {
  name: 'options',
  title: 'Site Options',
  type: 'document',
  icon,
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
  fields: [
    
    {
      name: 'eventDays',
      title: 'Event days',
      type: 'array',
      description: 'Add the days ...',
      of: [
        {
          name: 'date',
          title: 'Date',
          type: 'date',
        },
      ]
    },

    {
      name: 'before',
      title: 'Before CFW starts',
      type: 'object',
      description: 'Before the CFW starts',
      fields: [
        {
          name: 'vimeo',
          title: 'Vimeo URL',
          type: 'url',
          description: 'Videos automatically loop, without sound. Livestreams have sound'
        },
        {
          name: 'titleLowercase',
          title: 'Title Lowercase',
          type: 'string',
          description: 'Title shown above video player'
        },
        {
          name: 'titleUppercase',
          title: 'Title Uppercase',
          type: 'string',
          description: 'Title shown above video player'
        },
      ]
    },
    {
      name: 'day1',
      title: 'Day 1',
      type: 'object',
      description: 'Content for first day',
      fields: [
        {
          name: 'vimeo',
          title: 'Vimeo URL',
          type: 'url',
          description: 'Videos automatically loop, without sound. Livestreams have sound'
        },
        {
          name: 'titleLowercase',
          title: 'Title Lowercase',
          type: 'string',
          description: 'Title shown above video player'
        },
        {
          name: 'titleUppercase',
          title: 'Title Uppercase',
          type: 'string',
          description: 'Title shown above video player'
        },
      ]
    },
    {
      name: 'day2',
      title: 'Day 2',
      type: 'object',
      description: 'Content for second day',
      fields: [
        {
          name: 'vimeo',
          title: 'Vimeo URL',
          type: 'url',
          description: 'Videos automatically loop, without sound. Livestreams have sound'
        },
        {
          name: 'titleLowercase',
          title: 'Title Lowercase',
          type: 'string',
          description: 'Title shown above video player'
        },
        {
          name: 'titleUppercase',
          title: 'Title Uppercase',
          type: 'string',
          description: 'Title shown above video player'
        },
      ]
    },
    {
      name: 'day3',
      title: 'Day 3',
      type: 'object',
      description: 'Content for third day',
      fields: [
        {
          name: 'vimeo',
          title: 'Vimeo URL',
          type: 'url',
          description: 'Videos automatically loop, without sound. Livestreams have sound'
        },
        {
          name: 'titleLowercase',
          title: 'Title Lowercase',
          type: 'string',
        },
        {
          name: 'titleUppercase',
          title: 'Title Uppercase',
          type: 'string',
        },
      ]
    },
    {
      name: 'after',
      title: 'After CFW ends',
      type: 'object',
      description: 'After the show ends',
      fields: [
        {
          name: 'vimeo',
          title: 'Vimeo URL',
          type: 'url',
          description: 'Videos automatically loop, without sound. Livestreams have sound'
        },
        {
          name: 'titleLowercase',
          title: 'Title Lowercase',
          type: 'string',
          description: 'Title shown above video player'
        },
        {
          name: 'titleUppercase',
          title: 'Title Uppercase',
          type: 'string',
          description: 'Title shown above video player'
        },
      ]
    },

    {
      name: 'pdfs',
      title: 'PDF - Schedule, Accredation',
      type: 'array',

      of: [
        {
          name: 'pdf',
          type: 'object',
          fields: [
            {
              name: 'file',
              title: 'PDF Schedule',
              type: 'file',
              accept: '.pdf'
            },
            {
              name: 'title',
              title: 'Link Title',
              type: 'string',
              description: 'Ex: Download Schedule'
            },
          ]
        }
      ]
    },

    {
      name: 'partners',
      title: 'Partners',
      type: 'array',
      description: 'List of partner logos, shown in footer',
      of: [
        {
          name: 'partner',
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Image logo',
              type: 'image',
              options: { hotspot: true },
            },
            {
              name: 'link',
              title: 'Link',
              type: 'string',
              description: 'Open this link when user clicks on ad'
            },
          ]
        }
      ]
    },

    {
      name: 'seo',
      title: 'Meta data',
      type: 'object',
      fields: [
        {
          name: 'seoTitle',
          title: 'Seo Title',
          type: 'string'
        },
        {
          name: 'seoDescription',
          title: 'Seo Description',
          type: 'text',
          rows: 4,
        },
        {
          name: 'seoImage',
          title: 'Seo Image',
          type: 'image',
          description: 'Used when posting on social media',
          options: { hotspot: true },
        }
      ]
    },
  ],
  preview: {
    select: { title: 'seo.seoTitle', subtitle: 'seo.seoDescription' }
  }
}
