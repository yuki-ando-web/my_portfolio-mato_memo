<template>
  <v-app dark>
    <v-app-bar :clipped-left="clipped"  app class="overflow-x-auto">
      <v-spacer></v-spacer>
      <!-- <v-toolbar-title v-text="title" />
      <v-toolbar-title class="caption ml-4 mt-3"
        >ユーザー:{{ userName }}</v-toolbar-title
      > -->
      <v-btn class="grey lighten-2 mr-1" depressed v-on:click="moveIndex"
        >全てのユーザーのメモ</v-btn
      >
      <v-btn class="grey lighten-2 mr-1" depressed v-on:click="moveUserTop"
        >{{ userName }}のメモ一覧&新規作成</v-btn
      >
      <v-btn class="grey lighten-2 mr-1" depressed @click="logout">
        ログアウト
      </v-btn>
      <v-btn class="grey lighten-2 mr-1" depressed @click="login">
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
      clipped: false,
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
  methods: {
    async login() {
      await this.$store.dispatch('userTop/login')
      this.$router.push('/')
    },
    async logout() {
      await this.$store.dispatch('userTop/logout')
      this.$router.go('/')
    },
    moveIndex() {
      this.$router.push('/memoIndex')
    },
    moveUserTop() {
      this.$router.push('/')
    },
  },
  computed: {
    userName: {
      get() {
        return this.$store.getters['userTop/getUserName']
      },
    },
  },
}
</script>
