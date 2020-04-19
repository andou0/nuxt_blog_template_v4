<template>
  <div id="privacy">
    <my-drawer>
      <template #drawer>
        <default-sidebar />
      </template>
      <template #main>
        <my-card>
          <template #h1>
            {{ title }}
          </template>
          <template #h2>
            {{ siteName }}（以下、当サイト）では、個人情報の保護およびその適切な取り扱いについて、以下のとおりプライバシーポリシー（以下、本ポリシー）を定めております。
          </template>
          <template #main-content>
            <v-card class="pa-4">
              <div class="my-title">
                アクセス解析ツールについて
              </div>
              <div class="my-text-content">
                <p>
                  当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。このGoogleアナリティクスはトラフィックデータの収集のためにCookieを使用しています。このトラフィックデータは匿名で収集されており、個人を特定するものではありません。
                </p>
                <p>
                  この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。規約の詳細については
                  <a
                    href="https://www.google.com/analytics/terms/jp.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Googleアナリティクス利用規約
                  </a>
                  からご確認ください。
                </p>
              </div>
              <div class="my-title">
                広告について
              </div>
              <div class="my-text-content">
                <p>
                  当サイトでは、第三者配信の広告サービス（Googleアドセンス）を利用しています。このような広告配信事業者は、ユーザーの興味に応じた商品やサービスの広告を表示するため、当サイトや他サイトへのアクセスに関する情報「Cookie」(氏名、住所、メール アドレス、電話番号は含まれません) を使用することがあります。
                </p>
                <p>
                  Googleアドセンスの詳細と、Googleが収集するデータの匿名化の方法については、
                  <a
                    href="https://policies.google.com/technologies/ads?hl=ja"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ポリシーと規約 - Google
                  </a>
                  をご覧ください
                </p>
              </div>
              <div class="my-title">
                著作権について
              </div>
              <div class="my-text-content">
                <p>
                  当サイトのコンテンツ（記事・画像・その他のコンテンツ）について、許可なく転載することを禁じます。コンテンツの引用は、当サイトのリンクを掲載することで、ご自由に行うことができます。
                </p>
                <p>
                  引用許可範囲については、事前予告なく変更する場合があります。最新の情報は本ページにて公開されます。
                </p>
              </div>
              <div class="my-title">
                免責条項
              </div>
              <div class="my-text-content">
                <p>
                  当サイトのに掲載している情報につきまして、可能な限り正確な情報を掲載するよう努めておりますが、誤った情報が入り込んだり、情報が古くなっている場合があります。
                </p>
                <p>
                  誤った情報を見つけた場合は、お手数ですが
                  <a :href="`mailto:${email}`">
                    {{ email }}
                  </a>
                  よりご連絡ください。確認を取り次第、即座に対応致します。また、情報の正誤性のため、コンテンツは随時更新され予告なしに変更・削除されることがあります。
                </p>
                <p>
                  当サイトに掲載された内容、又は移動先サイトで提供される情報、サービスによって生じた損害については一切の責任を負いかねますのでご了承ください。
                </p>
              </div>
              <div class="my-title">
                本ポリシーの変更について
              </div>
              <div class="my-text-content">
                <p>
                  当サイトは、個人情報に関して適用される日本の法令を遵守するとともに、継続的な改善に努め、必要に応じて本ポリシーを変更することがあります。
                </p>
                <p>
                  修正された最新のプライバシーポリシーは常に本ページにて開示されます。
                </p>
              </div>
              <v-card-actions class="body-2 justify-end">
                <p>（初版: 2019/09/17）</p>
              </v-card-actions>
            </v-card>
          </template>
        </my-card>
      </template>
    </my-drawer>
  </div>
</template>

<script>
import meta from '~/assets/mixins/meta'

export default {
  mixins: [meta],
  data: () => ({
    siteName: process.env.SITE_NAME,
    title: 'プライバシーポリシー',
    email: process.env.EMAIL
  })
}
</script>
