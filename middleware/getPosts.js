export default async ({ store }) => {
  if (!store.state.posts.length) {
    await store.dispatch('getPosts')
    return console.log(`getPosts!!${store.state.posts.length}count`)
  }
}
