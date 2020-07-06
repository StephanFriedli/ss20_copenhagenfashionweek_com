import icon from 'react-icons/lib/md/assignment'

// FIELDS
// Category - Show or Event
// Publish date
// Release data(blurred or not blurred)
// Thumbnail
//   - Image
//   - Vimeo
// Media
//   - Image
//   - Vimeo
//   - Gallery
// Text
// Link(Buy)

export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  icon,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
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
      name: 'releaseDate',
      title: 'Release Date',
      type: 'datetime'
    },
    
    {
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'array',
      validation: Rule => Rule.required().max(1),
      of: [
        {
          name: 'image',
          title: 'Image',
          type: 'image',
          options: { hotspot: true },
        },
        // {
        //   name: 'video',
        //   title: 'Video',
        //   type: 'file',
        //   accept: 'mp4'
        // }
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

    {
      name: 'media',
      title: 'Media',
      type: 'array',
      validation: Rule => Rule.required().max(1),
      // options: {
      //   layout: 'grid'
      // },
      of: [
        {
          name: 'image',
          title: 'Image',
          type: 'image',
          options: { hotspot: true },
        },
        // {
        //   name: 'video',
        //   title: 'Video',
        //   type: 'file',
        //   accept: 'mp4'
        // },
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
        {
          name: 'gallery',
          title: 'Image Gallery',
          type: 'object',
          fields: [
            {
              name: 'images',
              title: 'Images',
              type: 'array',
              of: [
                {
                  name: 'slide',
                  title: 'Slide',
                  type: 'image',
                  options: { hotspot: true },
                }
              ]
            }
          ]
        },
      ]
    },
    {
      name: 'text',
      title: 'Text',
      type: 'blockContent',
    },
    {
      name: 'link',
      title: 'Link',
      type: 'url',
      validation: Rule => Rule.uri({
        scheme: ['http', 'https', 'mailto', 'tel']
      })
    }
  ],
  // preview: {
  //   select: {
  //     name: 'title'
  //   },
  //   prepare(selection) {
  //     const { name, orderTotal, licenseType } = selection
  //     return {
  //       title: `Purchased by: ${name} for €${orderTotal}`,
  //       subtitle: licenseType
  //     }
  //   }
  // }
}
