import sanityImage from '@sanity/image-url'
import sanityClient from '@sanity/client'

// import { formatDistance, subDays } from 'date-fns'

const options = {
  projectId: 'gpkdh0zg', // process.env.SANITY_PROJECT_ID
  dataset: 'production',
  useCdn: process.env.NODE_ENV === 'production',
  // useCdn == true gives fast, cheap responses using a globally distributed cache.
  // Set this to false if your application require the freshest possible
  // data always (potentially slightly slower and a bit more expensive).
}

// Read client
export const client = sanityClient(options)

// Preview client
export const previewClient = sanityClient({
  ...options,
  useCdn: false,
  // token: process.env.SANITY_API_PREVIEW_TOKEN,
  token: process.env.SANITY_API_TOKEN,
  
})

const getClient = preview => (preview ? previewClient : client)

export const imageBuilder = sanityImage(client)


export async function getSiteOptions(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "options"] | order(date desc, _updatedAt desc){
      _id,
      eventDays,
      before,
      day1,
      day2,
      day3,
      after,
      'pdfs': pdfs[]{
        'title': title,
        'file': file.asset->url,
      },
      'seo': {
        'title': seo.seoTitle,
        'description': seo.seoDescription,
        'imageUrl': seo.seoImage.asset->url,
      },
    }`)  
      
  return results[0]
}

export async function getEvents(preview) {
  const results = await getClient(preview)
    .fetch(`* [_type == "event"] | order(startTime asc) {
      _id,
      title,
      category,
      startTime,
      endTime,
      label,
      location,
      byline,
      'brand': brand[0]->{title}
    }`)

  return results
}

export async function getPosts(preview) {

  const post = `
    _id,
    title,
    category,
    releaseDate,
    'brand': brand[0]->{title},
    thumbnail,
    media,
    "test": media[0]{
      'image': media[0].image,
      'photo': media[0].image.asset->{
        url,
        metadata {
          dimensions
        }
      }
    },
    "mainImage": media[]{
      ...,
      metadata {
        dimensions
      }
    },
    text,
    link
  `
      
  // if (time.state = 'before') {
  // } else if (time.state = 'after') {
  // } else {
  // }

  const results = await getClient(preview)
    // .fetch(`* [_type == "post" && startTime >= ${time.startDate} && startTime <= time.endDate]{
    
    // .fetch(`* [_type == "post" && releaseDate >= '2020-08-10' && releaseDate <= '2020-08-13'] | order(releaseDate desc){
    // && defined(mainImage)
    .fetch(`* [_type == "post"][0..199] | order(_createdAt desc) {
      ${post}
    }`)
  return results
}

export async function getBrands(preview) {
  const results = await getClient(preview)
    .fetch(`* [_type == "brand"]{
      _id,
      title,
      text,
      show,
      downloads,
      contacts,
      links
    }`)
  return results
}

export async function getAds(preview) {
  const results = await getClient(preview)
    .fetch(`* [_type == "ad"]{
      _id,
      title,
      text,
      link,
      media
    }`)
  return results
}


// 'events': {
//   'title': eventstitle,
//     'category': category,
//       'startTime': startTime
//   'endTime': endTime
//   'label': label,
//     'locationText': location.label,
//       'locationLink': location.link,
//         'byline': byline,
//           'brand': brand._ref,
//             'brandTitle': brand -> { title }
// }

// export async function getOrderById(hash) {
//   const results = await client.fetch(`*[_id == '${hash}'] {
//     _id,
//     name
//   }`)
//   return results[0]
// }


// export async function getPreviewPostBySlug(slug) {
//   const data = await getClient(true).fetch(
//     `*[_type == "post" && slug.current == $slug] | order(date desc){
//       ${postFields}
//       content
//     }`,
//     { slug }
//   )
//   return data[0]
// }


// const getUniquePosts = posts => {
//   const slugs = new Set()
//   return posts.filter(post => {
//     if (slugs.has(post.slug)) {
//       return false
//     } else {
//       slugs.add(post.slug)
//       return true
//     }
//   })
// }

// const postFields = `
//   name,
//   title,
//   date,
//   excerpt,
//   'slug': slug.current,
//   'coverImage': coverImage.asset->url,
//   'author': author->{name, 'picture': picture.asset->url},
// `


// export async function getAllPostsWithSlug() {
//   const data = await client.fetch(`*[_type == "post"]{ 'slug': slug.current }`)
//   return data
// }

// export async function getAllPostsForHome(preview) {
//   const results = await getClient(preview)
//     .fetch(`*[_type == "post"] | order(date desc, _updatedAt desc){
//       ${postFields}
//     }`)
//   return getUniquePosts(results)
// }

// export async function getPostAndMorePosts(slug, preview) {
//   const curClient = getClient(preview)
//   const [post, morePosts] = await Promise.all([
//     curClient
//       .fetch(
//         `*[_type == "post" && slug.current == $slug] | order(_updatedAt desc) {
//         ${postFields}
//         content,
//       }`,
//         { slug }
//       )
//       .then(res => res?.[0]),
//     curClient.fetch(
//       `*[_type == "post" && slug.current != $slug] | order(date desc, _updatedAt desc){
//         ${postFields}
//         content,
//       }[0...2]`,
//       { slug }
//     ),
//   ])
//   return { post, morePosts: getUniquePosts(morePosts) }
// }
