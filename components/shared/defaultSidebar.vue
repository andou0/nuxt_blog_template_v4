<template>
  <div class="my-sidebar">
    <v-card
      flat
      color="transparent"
    >
      <v-card-actions class="justify-center">
        <v-avatar size="60">
          <v-img
            :src="icon"
            alt="icon"
            aspect-ratio="1"
          />
        </v-avatar>
      </v-card-actions>
      <v-card-text class="px-0">
        Rails・Nuxt.js専門の{{ age }}歳プログラマ。ここで公開している知識は全て独学で習得しました。前職は会計事務所。IT業界に片足も突っ込んだことはありません。独学でも、ノンプログラマでもプログラミングが好きならここまでできるってよ。をこのブログで証明しています。
      </v-card-text>
    </v-card>

    <service-menu />

    <div class="my-subtitle">
      得意な技術
    </div>
    <ul class="my-list">
      <li
        v-for="(skill, i) in skills"
        :key="`skill-${i}`"
        class="my-list-content"
      >
        {{ skill.name }}
        <small>
          {{ skill.desc }}
        </small>
      </li>
    </ul>

    <div class="my-subtitle">
      苦手な技術
    </div>
    <ul class="my-list">
      <li
        v-for="(weak, i) in weaks"
        :key="`weak-${i}`"
        class="my-list-content"
      >
        {{ weak.name }}
        <small>
          {{ weak.desc }}
        </small>
      </li>
    </ul>

    <div class="my-title">
      開発中のアプリケーション
    </div>
    <v-list-item
      href="https://myapp9-bizplan.herokuapp.com/"
      target="_blank"
      rel="noopener noreferrer"
      class="pa-0 mt-4"
    >
      <v-img
        :src="demoapp"
        alt="demoapp"
        :aspect-ratio="(16 / 7)"
        :max-width="$store.state.layout.drawerWidth"
      />
    </v-list-item>
    <div class="my-text-content">
      元会計事務所の知識を生かして、ポチポチと事業計画書策定アプリを構築中です。サーバーサイドにはRails(API)、フロントエンドにはNuxt.jsを使っています。下記のユーザー情報でログインできますので覗いて行ってくださいな。（完成はいつになるやら。。。）
    </div>
    <ul class="my-list">
      <li class="my-list-content">
        <a
          href="https://myapp9-bizplan.herokuapp.com/"
          target="_blank"
          rel="noopener noreferrer"
          class="my-link"
        >
          https://myapp9-bizplan.herokuapp.com
        </a>
      </li>
      <li class="my-list-content">
        email: user1@example.com
      </li>
      <li class="my-list-content">
        pass: password
      </li>
      <li class="my-list-content">
        <small>
          ログイン情報とユーザーデータは、予告なく変更・破棄する場合があります。
        </small>
      </li>
    </ul>
  </div>
</template>

<script>
import icon from '~/assets/image/sidebaricon.png'
import demoapp from '~/assets/image/demoapp.png'
import serviceMenu from '~/components/ui/serviceMenu'

export default {
  components: {
    serviceMenu
  },
  data ({ $dayjs }) {
    const yearAgo = $dayjs(new Date(1987, 3, 24)).fromNow().match(/\d+/g)
    return {
      icon,
      demoapp,
      age: yearAgo[0],
      skills: [
        { name: 'Nuxt.js', desc: 'フロントエンド開発にオススメ' },
        { name: 'Vue.js', desc: 'jQueryに疲れたならこれ' },
        { name: 'JavaScript', desc: '言わずと知れたスクリプト言語' },
        { name: 'Vuetify', desc: 'CSSフレームワーク（得意!!）' },
        { name: 'Rails', desc: '主にAPI開発で使用' },
        { name: 'Ruby', desc: 'もう簡潔に書けたときの快感は何とも' },
        { name: 'Contentful', desc: 'WordPressの次はこれを使うべし' },
        { name: 'Netlify', desc: 'このブログをネットに公開するのに使っています' }
      ],
      weaks: [
        { name: 'CSS', desc: 'これを設計からできるデザイナーは神様' },
        { name: 'jQuery', desc: 'セレクタ地獄に疲れました' },
        { name: 'Heroku', desc: '知識がなくともアプリが公開できるため大いに知識不足' }
      ]
    }
  }
}
</script>
