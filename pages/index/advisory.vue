<template>
  <div>
    <div v-if="$fetchState.pending"><main-loading /></div>
    <div v-else-if="$fetchState.error">An error request not or Internal server error</div>
    <div v-else class="max-w-6xl mx-auto lg:my-12 my-4 sm:px-6 lg:px-8 xl:px-0 px-4">
      <header-crud :categories="categories" :name="$t('advisory')" :isConsultant='true' />
      <div class="grid md:grid-cols-3 gap-6 sm:grid-cols-2 grid-cols-1">
        <div v-for="(expert, index) in consultants" :key="index" class="my-4">
          <experts :data="expert" />
        </div>
      </div>
    </div>
    <pagination
      :pageCount='pagination.pageCount'
      :pageSize='pagination.pageSize'
      :page='pagination.page'
      @onChange='changePage($event)'
    />
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
      loading: false,
      limit: 12
    }
  },
  fetchOnServer: true,
  // mounted() {
  //   this.fetchDirectories().then(() => {
  //     if (this.$route.query.category) {
  //       this.fetchData()
  //     }
  //   })
  // },
  computed: {
    ...mapGetters({
      ...getters(_page),
    }),
  },
  watch: {
    '$route.query.category': function(val) {
        this.fetchData()

    },
    '$route.query.page': function(val) {
      this.fetchData()
    }
  },
 async mounted() {
   await this.fetchData()
  },
  async fetch() {
    try {
      await this.fetchDirectories()
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    changePage (event) {
      console.log(event)
      this.$router.push({name: this.$route.name, query: {...this.$route.query, page:event, pageSize: 12}})
    },
    async fetchDirectories() {
      return await this.$store
        .dispatch('getAgrocultureareas', { populate: '*', locale: this.$i18n.locale })
        .then((res) => {
          const list = res.map((el) => {
            return {
              attributes: { name: el.attributes.title },
              id:
                el.attributes.locale === 'en'
                  ? el.id
                  : el.attributes.localizations.data.find((l) => l.attributes.locale === 'en')
                      ?.id ?? 0,
            }
          })
          this.categories = list
          this.categories.unshift({
            id: 0,
            attributes: {
              name: this.$t('all'),
            },
          })
        })
    },
    async fetchData() {
      const _query = {...this.$route.query}
      return await this.$store
        .dispatch(get, {
          link: 'users',
          query: {
            populate: '*',
            locale: this.$i18n.locale,
            start:  _query.pageSize ? (_query.page - 1) * _query.pageSize : 0,
            limit: 12,
            'filters[$and][0][role][id]': 4,
            'filters[$and][0][confirmed]': true,
            'filters[$and][0][agrocultureareas][id]':
              this.$route.query.category && parseInt(this.$route.query.category) === 0
                ? null
                : this.$route.query.category,
          },
        })
        .then((res) => {
          this.consultants = res.users
        })
        .finally(() => {
        })
    },
  },
}
</script>
