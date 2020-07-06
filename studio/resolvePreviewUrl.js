
const previewSecret = 'CopenHAGENfaSHIONweek' // Copy the string you used for SANITY_PREVIEW_SECRET
const projectUrl = 'http://localhost:3000'

export default function resolvePreivewUrl(document) {
  return `${projectUrl}/api/preview?secret=${previewSecret}&slug=${document.slug.current}`
}