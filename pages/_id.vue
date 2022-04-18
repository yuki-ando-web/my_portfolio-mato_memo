<template>
  <div>
    <v-app>
      <v-simple-table>
        <thead>
          <tr>
            <th class="text-h6">{{ detailMemo.title }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-body-1">{{ detailMemo.content }}</td>
          </tr>
          <tr v-for="tag in detailMemo.tag" :key="tag">
            <td class="text-body-1">タグ
              <v-chip>
                {{ tag }}
              </v-chip>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-app>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    detailMemo: {
      get() {
        return this.$store.getters['userTop/getStateMemos'].find(
          (e) => e.memoId === this.$route.params.id
        )
      },
    },
  },
  mounted() {
    console.log(this.detailMemo.title)
  },
}
</script>
<style>
th {
  white-space: break-spaces;
}
td {
  white-space: break-spaces;
}
</style>
