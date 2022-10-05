<template>
  <div>
    <div v-if="$fetchState.pending"><main-loading /></div>
    <div v-else-if="$fetchState.error">An error request not or Internal server error</div>
    <div v-else class="max-w-6xl mx-auto lg:my-12 my-4 sm:px-6 lg:px-8 xl:px-0 px-4">
      <header-crud :categories="categories" :name="$t('agri-finance')" />
      <div class="grid md:grid-cols-3 gap-6 sm:grid-cols-2 grid-cols-1">
        <div v-for="(info, index) in data" :key="index">
          <news :data="info" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import News from '~/components/News.vue'
import { mapGetters } from 'vuex'
import { actions, getters } from '~/utils/store_schema'
const _page = 'serviceposts'
const { get } = actions(_page)
export default {
  name: 'AgriFinance',
  auth: false,
  components: { News },
  data() {
    return {
      categories: [],
      loading: false
    }
  },
  watch: {
    '$route.query': {
      handler() {
        this.fetchData()
      },
      deep: true,
    },
  },
  computed: {
    ...mapGetters(getters(_page)),
    ...mapGetters(['dataServicecategories']),
  },
  // mounted() {
  //   this.fetchDirectories().then(() => {
  //     if (this.$route.query.category) {
  //       this.fetchData()
  //     }
  //   })
  // },
  async fetch() {
    await this.fetchDirectories()
    await this.fetchData()
  },
  methods: {
    async fetchData() {
     return  await this.$store
        .dispatch(get, {
          'sort[0][createdAt]': 'DESC',
          populate: '*',
          locale: this.$i18n.locale,
          'filters[$and][0][servicecategory][id]':
            this.$route.query.category && parseInt(this.$route.query.category) === 0
              ? null
              : this.$route.query.category,
          'filters[$and][0][title][$containsi]': this.$route.query.text
            ? this.$route.query.text
            : null,
          pagination: {
            page: this.$route.query.page ? this.$route.query.page : 1,
            pageSize: this.pagination.pageSize,
          },
          'filters[$and][0][title][$notNull]': true,
        })
        .then(() => {})
    },
    async fetchDirectories() {
     return  await this.$store
        .dispatch('getServicecategories', {
          populate: '*',
          locale: this.$i18n.locale,
        })
        .then((res) => {
          this.categories = res
          this.categories.unshift({
            id: 0,
            attributes: {
              name: this.$t('all'),
            },
          })
        })
    },
  },
}
</script>
