<template>
  <v-app dark>
    <v-app-bar :clipped-left="clipped" app class="overflow-x-auto">
      <v-app-bar-title>mato_memo</v-app-bar-title>
      <v-spacer></v-spacer>

      <v-btn class="grey lighten-2 mr-1" depressed v-on:click="moveMypage"
        >{{userName}}のお気に入りメモ一覧</v-btn
      >
      <v-btn class="grey lighten-2 mr-1" depressed v-on:click="moveIndex"
        >全ユーザーのメモ一覧</v-btn
      >
      <v-btn class="grey lighten-2 mr-1" depressed v-on:click="moveUserTop"
        >{{ userName }}のメモ一覧&新規作成</v-btn
      >
      <v-btn
        v-show="userName !== 'ゲスト'"
        class="grey lighten-2 mr-1"
        depressed
        @click="logout"
      >
        ログアウト
      </v-btn>
      <v-btn
        v-show="userName == 'ゲスト'"
        class="grey lighten-2 mr-1"
        depressed
        @click="login"
      >
        ログイン
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>

        <Nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'memo_app',
    }
  },
  computed: {
    userName: {
      get() {
        return this.$store.getters['memo/getUserName']
      },
    },
  },
  
  methods: {
    login() {
      this.$store.dispatch('memo/login')
    },
    logout() {
      this.$store.dispatch('memo/logout')
      this.$router.go('/')
    },
    moveMypage() {
      this.$router.push('/myPage')
    },
    moveIndex() {
      this.$router.push('/allUserIndex')
    },
    moveUserTop() {
      this.$router.push('/')
    },
  },
}
</script>
