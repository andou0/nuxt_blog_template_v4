export default async ({ store }) => {
  if (!store.state.categories.length) {
    await store.dispatch('getCategories')
    return console.log(`getCategories!!${store.state.categories.length}count`)
  }
}
