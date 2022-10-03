const postFields = `
  _id,
  _lang,
  name,
  title,
  content,
  startdate,
  enddate,
  starttime,
  endtime,
  occurences,
  tags,
  location,
  image,
  "videoMp4": videoMp4.asset->url,
  "videoWebM": videoWebm.asset->url,
  label,
  ticketLink,
  ticketLinkLabel,
  information,
  slices,
  "slug": slug.current,
`

const homeFields = `
  _id,
  title,
  content,
  newsTitle,
  videoTitle,
  video,
  textfieldone,
  textfieldtwo,
  circles[] {
    "videoMp4": videoMp4.asset->url,
    "videoWebM": videoWebm.asset->url,
    label
  },
  "slug": slug.current
`

const aboutFields = `
  _id,
  title,
  content,
  textcolumnone,
  textcolumntwo,
  textcolumnthree,
  "slug": slug.current
`
const programFields = `
  _id,
  title,
  content,
  textcolumnone,
  textcolumntwo,
  textcolumnthree,
  "slug": slug.current
`
const applicationFields = `
  _id,
  title,
  content,
  "slug": slug.current,
  downloadLabelOne,
  downloadLabelTwo,
  "download": download.asset->url,
  subtitleOne,
  subtitleTwo,
  fields,
  submitButton,
  confirmationMessage
`
const yearFields = `
  _id,
  _lang,
  title,
  content,
  textFieldOne,
  textFieldTwo,
  textFieldThree,
  textFieldFour,
  textFieldFive,
  images,
  "slug": slug.current
`

const artistFields = `
  _id,
  _lang,
  title,
  content,
  orderByLetter,
  textFieldOne,
  textFieldTwo,
  images,
  "slug": slug.current
`

const saisonFields = `
  _id,
  _lang,
  title,
  content,
  text,
  tags,
  "documentURL": document.asset->url,
  documentLabel,
  "slug": slug.current
`

const lEnsembleFields = `
  _lang,
  name,
  title,
  content,
  slices,
  "slug": slug.current,
`

const legalFields = `
  _id,
  title,
  content,
  text,
  "slug": slug.current
`

export const indexQuery = `
*[_type == "post" && _lang == $slug && !(_id in path('drafts.**'))] | order(startdate asc) {
  ${postFields}
}
`

export const indexEventsQuery = `
*[_type == "post" && _lang == $slug && !(_id in path('drafts.**'))] | order(startdate asc) {
  ${postFields}
}
`

export const homeQuery = `
*[_type == "home" && slug.current == $slug][0] {
  ${homeFields}
}
`

export const aboutQuery = `
*[_type == "about" && slug.current == $slug][0] {
  ${aboutFields}
}
`

export const programQuery = `
*[_type == "program" && slug.current == $slug][0] {
  ${programFields}
}
`

export const applicationQuery = `
*[_type == "application" && slug.current == $slug][0] {
  ${applicationFields}
}
`

export const yearsQuery = `
*[_type == "years" && slug.current == $slug][0] {
  _lang,
  title,
  content,
  slices,
  "slug": slug.current
}`

export const yearSlugsQuery = `
*[_type == "year" && defined(slug.current) && !(_id in path('drafts.**'))][].slug.current
`

export const yearQuery = `
*[_type == "year" && slug.current == $slug][0] {
  ${yearFields}
}`

export const artistsQuery = `
*[_type == "artists" && slug.current == $slug][0] {
  _lang,
  title,
  content,
  list,
  "slug": slug.current
}`

export const artistSlugsQuery = `
*[_type == "artist" && defined(slug.current) && !(_id in path('drafts.**'))][].slug.current
`

export const artistQuery = `
*[_type == "artist" && slug.current == $slug][0] {
  ${artistFields}
}`

export const allArtistsQuery = `
*[_type == "artist" && _lang == $lang] {
  ${artistFields}
}`

export const saisonQuery = `
*[_type == "saison" && slug.current == $slug][0] {
  ${saisonFields}
}
`

export const mediaPageQuery = `
*[_type == "mediaPage" && slug.current == $slug][0] {
  _lang,
  title,
  content,
  type,
  text,
  "slug": slug.current
}
`

export const menuQuery = `
*[_type == "menu" && _lang == $lang][0] {
  menuItems,
  cookietext,
  cookieaccept,
  cookierefuse
}
`

export const footerQuery = `
*[_type == "footer" && _lang == $lang][0] {
  textFieldOne,
  namePlaceholder,
  emailPlaceholder,
  submitButtonText,
  errorMessage,
  legalLabel
}
`

export const postQuery = `
{
  "post": *[_type == "post" && slug.current == $slug && !(_id in path('drafts.**'))] | order(date desc) [0] {
    content,
    ${postFields}
  },
  "morePosts": *[_type == "post" && slug.current != $slug] | order(date desc, _updatedAt desc) [0...2] {
    content,
    ${postFields}
  }
}`

export const postSlugsQuery = `
*[_type == "post" && defined(slug.current) && !(_id in path('drafts.**'))][].slug.current
`

export const postBySlugQuery = `
*[_type == "post" && slug.current == $slug && !(_id in path('drafts.**'))][0] {
  ${postFields}
}
`

export const allPostQuery = `
*[slug.current == $slug && !(_id in path('drafts.**'))][0] {
  ${postFields}
}
`
export const mediaSlugsQuery = `
*[_type == "mediaPage" && defined(slug.current) && !(_id in path('drafts.**'))][].slug.current 
`

export const pressQuery = `
*[_type == "presse" && _lang == $lang && !(_id in path('drafts.**'))] | order(date desc) {
    title,
    content,
    date,
    text,
    pressLink,
    "documentURL": document.asset->url,
    pressLinkLabel,
    "slug": slug.current
}
`

export const videosQuery = `
*[_type == "video" && _lang == $lang && !(_id in path('drafts.**'))] | order(date desc) {
    title,
    content,
    image,
    video,
    text,
    "slug": slug.current
}
`

export const disquesQuery = `
*[_type == "disque" && _lang == $lang && !(_id in path('drafts.**'))] | order(date desc) {
    title,
    content,
    text,
    link,
    linkLabel,
    "slug": slug.current
}
`
export const lEnsembleSlugsQuery = `
*[_type == "lEnsemble" && defined(slug.current)][].slug.current
`

export const lEnsembleQuery = `
*[_type == "lEnsemble" && slug.current == $slug] | order(_updatedAt desc) [0] {
    ${lEnsembleFields}
}`

export const lEnsembleMenuQuery = `
*[_type == "lEnsembleMenu" && _lang == $lang][0] {
  menuItems
}`

export const lesMusiciensSlugsQuery = `
*[_type == "lesMusiciens" && defined(slug.current) && !(_id in path('drafts.**'))][].slug.current
`

export const lesMusiciensQuery = `
*[_type == "lesMusiciens" && slug.current == $slug && !(_id in path('drafts.**'))] | order(_updatedAt desc) [0] {
    ${lEnsembleFields}
}`

export const lesMusiciensMenuQuery = `
*[_type == "lesMusiciensMenu" && _lang == $lang][0] {
  title,
  menuItems
}`

export const allMediaSlugsQuery = `
*[_type in ["presse", "video", "disque"] && defined(slug.current) && !(_id in path('drafts.**'))][].slug.current
`

export const mediaQuery = `
*[_type in ["presse", "video", "disque"] && slug.current == $slug && !(_id in path('drafts.**'))] | order(_updatedAt desc) [0] {
    ${lEnsembleFields}
}`

export const legalQuery = `
*[_type == "legal" && slug.current == $slug][0] {
    ${legalFields}
}
`