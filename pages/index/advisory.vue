<template>
  <div class="max-w-6xl mx-auto lg:my-12 my-4 sm:px-6 lg:px-8 xl:px-0 px-4">
    <header-crud :categories="categories" :name="$t('advisory')" :isConsultant="true" />
    <div class="grid md:grid-cols-3 gap-6 sm:grid-cols-2 grid-cols-1">
      <div v-for="(expert, index) in consultants" :key="index" class="my-4">
        <experts :data="expert" />
      </div>
    </div>
  </div>
</template>

<script>
import Experts from '~/components/Experts.vue'
import { mapGetters } from 'vuex'
import { actions, getters } from '~/utils/store_schema'
const _page = 'users'
const { get } = actions(_page)
export default {
  name: 'Advisory',
  auth: false,
  components: { Experts },
  data() {
    return {
      consultants: [],
      categories: [],
    }
  },
  mounted() {
    this.fetchDirectories().then(() => {
      if (this.$route.query.category) {
        this.fetchData()
      }
    })
  },
  computed: {
    ...mapGetters({
      ...getters(_page),
    }),
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
    async fetchDirectories() {
      await this.$store.dispatch('getConsultantcategories').then((res) => {
        this.categories = res
        this.categories.unshift({
          id: 0,
          attributes: {
            name: this.$t('all'),
          },
        })
      })
    },
    fetchData() {
      this.$store
        .dispatch(get, {
          link: 'users',
          query: {
            populate: '*',
            locale: this.$i18n.locale,
            'filters[$and][0][role][id]': 4,
            'filters[$and][0][confirmed]': true,
            'filters[$and][0][consultantcategory][id]':
              this.$route.query.category && parseInt(this.$route.query.category) === 0
                ? null
                : this.$route.query.category,
          },
        })
        .then((res) => {
          this.consultants = res.users
        })
    },
  },
}
</script>
