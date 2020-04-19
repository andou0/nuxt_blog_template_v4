// Plugins Doc: => https://github.com/qianlongo/dayjs-analysis/blob/master/source-code/docs/ja/Plugin.md
import dayjs from 'dayjs'
import 'dayjs/locale/ja'
import relativeTime from 'dayjs/plugin/relativeTime' // time ago

dayjs.locale('ja')
dayjs.extend(relativeTime)

export default (ctx, inject) => {
  inject('dayjs', string => dayjs(string))
}
