import Vue from 'vue'

export default ({ app }) => {
  Vue.filter('zero', (number) => {
    const num = `#0${number}`
    return num.slice(-num.length)
  })
  Vue.filter('ago', (date) => {
    return app.$dayjs(date).fromNow()
  })
  Vue.filter('date', (date) => {
    return app.$dayjs(date).format('YYYY年MM月DD日')
  })
}
