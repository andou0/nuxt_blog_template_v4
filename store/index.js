import client from '~/plugins/contentful'

export const state = () => ({
  categories: [],
  posts: [],
  chapters: {},
  query: '',
  layout: {
    width: 1280,
    padding: 16,
    toolbarHeight: 48,
    drawerWidth: 300
  }
})

export const getters = {
  linkTo: () => (name, obj) => {
    return { name: `${name}-slug`, params: { slug: obj.fields.slug } }
  },
  categoriesFind: state => ({ post, slug }) => {
    return state.categories.find((cat) => {
      if (post) { return cat.sys.id === post.fields.chapter.fields.category.sys.id }
      if (slug) { return cat.fields.slug === slug }
    })
  },
  eyeCatchUrl: () => (post) => {
    return (post.fields.image && post.fields.image.fields)
      ? `https://${post.fields.image.fields.file.url}`
      : `${process.env.BASE_URL}/grobal.png`
  },
  mainCategories: state => () => {
    const categories = []
    for (const cat of state.categories) {
      if (cat.fields.isMain) { categories.push(cat) }
    }
    return categories
  },
  postsWhere: state => ({ category, chapter }) => {
    switch (true) {
      case (!!category): return state.posts.filter(post =>
        post.fields.chapter.fields.category.sys.id === category.sys.id)
      case (!!chapter): return state.posts.filter(post =>
        post.fields.chapter.sys.id === chapter.sys.id)
      default: return []
    }
  }
}

export const mutations = {
  setCategories (state, payload) {
    state.categories = payload
  },
  setPosts (state, payload) {
    state.posts = payload
  },
  setChapters (state, payload) {
    state.chapters = payload
  },
  setQuery (state, payload) {
    state.query = payload
  }
}

export const actions = {
  async getCategories ({ commit }) {
    await client.getEntries({
      content_type: 'category',
      order: 'fields.sort'
    }).then(({ items }) =>
      commit('setCategories', items)
    ).catch(console.error)
  },
  async getPosts ({ commit, dispatch }) {
    await client.getEntries({
      content_type: 'blogPost',
      order: 'fields.chapter.sys.id,fields.sort,-fields.publishDate'
    }).then((res) => {
      commit('setPosts', res.items)
      dispatch('orderChapters', res.includes.Entry)
    }).catch(console.error)
  },
  orderChapters ({ state, commit }, entries) {
    const chapters = {}
    for (const category of state.categories) {
      chapters[category.fields.slug] = entries.filter(entry =>
        entry.fields.category && entry.fields.category.sys.id === category.sys.id
      ).sort((a, b) => a.fields.sort - b.fields.sort)
    }
    commit('setChapters', chapters)
  },
  getQuery ({ commit }, query) {
    commit('setQuery', query)
  }
}
