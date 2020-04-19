const contentful = require('contentful')

const dev = process.env.NODE_ENV === 'development'
const space = process.env.CTF_SPACE_ID
const accessToken = dev
  ? process.env.CTF_PREVIEW_API_KEY : process.env.CTF_CDA_ACCESS_TOKEN
const timeout = 1000000

const config = { space, accessToken, timeout }
if (dev) { config.host = 'preview.contentful.com' }

const client = contentful.createClient(config)
module.exports = client
