<template>
  <div class="max-w-6xl mx-auto sm:px-6 lg:px-8 xl:px-0 px-4 lg:my-12 my-4">
    <header-crud :categories="categories" :name="$t('e-learning')"/>
    <div class="grid md:grid-cols-3 gap-6 sm:grid-cols-2 grid-cols-1">
      <div v-for="(video, index) in data" :key="index">
        <video-card :data="video" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { actions, getters } from '~/utils/store_schema'
const _page = 'courses'
const { get } = actions(_page)
export default {
  name: 'ELearning',
  auth: false,
  data() {
    return {
      categories: [],
      selectedCategory: null,
    }
  },
  computed: {
    ...mapGetters(getters(_page)),
    ...mapGetters(['dataCoursecategories']),
  },
  mounted() {
    this.fetchDirectories().then(() => {
      if (this.$route.query.category) {
        this.fetchData()
      }
    })
  },
  watch: {
    '$route.query': {
      handler() {
        this.fetchData()
      },
      deep: true,
    },
  },
  methods: {
    onChangeCategory(category) {
      this.$router.push({
        path: this.$route.path,
        query: {
          category: category.id
        },
      })
    },
    async fetchData() {
      await this.$store
        .dispatch(get, {
          'sort[0][createdAt]': 'DESC',
          populate: '*',
          locale: this.$i18n.locale,
          'filters[$and][0][coursecategory][id]':
            this.$route.query.category && parseInt(this.$route.query.category) === 0
              ? null
              : this.$route.query.category,
          'filters[$and][0][title][$containsi]': this.$route.query.text ? this.$route.query.text : null,
        })
        .then(() => {})
    },
    async fetchDirectories() {
      await this.$store.dispatch('getCoursecategories').then((res) => {
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
