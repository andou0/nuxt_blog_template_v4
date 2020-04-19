export default {
  head () {
    const desc = this.desc || process.env.BASE_DESC
    const ogUrl = (process.env.BASE_URL + this.$route.fullPath)
    const ogTitle = (this.title)
      ? `${this.title} - ${process.env.SITE_NAME}` : process.env.SITE_NAME
    const ogImg = (this.ogImg) ? this.ogImg : `${process.env.BASE_URL}/grobal.png`
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: desc },
        { hid: 'og:url', property: 'og:url', content: ogUrl },
        { hid: 'og:title', property: 'og:title', content: ogTitle },
        { hid: 'og:description', property: 'og:description', content: desc },
        { hid: 'og:image', property: 'og:image', content: ogImg }
      ]
    }
  }
}
