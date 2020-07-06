import icon from 'react-icons/lib/md/home'

export default {
  name: 'options',
  title: 'Site Options',
  type: 'document',
  icon,
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
  fields: [
    {
      name: 'seo',
      title: 'Meta data',
      type: 'object',
      fields: [
        {
          name: 'siteTitle',
          title: 'Site Title',
          type: 'string'
        },
        {
          name: 'siteDescription',
          title: 'Site Description',
          type: 'text',
          rows: 4,
        }
      ]
    },

    {
      name: 'videoLinks',
      title: 'Vimeo Links',
      type: 'object',
      description: 'Before, during & after the site plays videos & livestreams from Vimeo',
      fields: [
        {
          name: 'vimeoBefore',
          title: 'Vimeo Before',
          type: 'url'
        },
        {
          name: 'vimeoFirstDay',
          title: 'Vimeo Day 1',
          type: 'url'
        },
        {
          name: 'vimeoSecondDay',
          title: 'Vimeo Day 2',
          type: 'url'
        },
        {
          name: 'vimeoThirdDay',
          title: 'Vimeo Day 3',
          type: 'url'
        },
        {
          name: 'vimeoAfter',
          title: 'Vimeo After',
          type: 'url'
        },
      ]
    },
  ],
  preview: {
    select: { title: 'seo.siteTitle', subtitle: 'seo.siteDescription' }
  }
}
