<template>
  <div class='max-w-6xl mx-auto sm:px-6 lg:px-8 xl:px-0 px-4 lg:my-12 my-4'>
    <div v-if='$fetchState.pending'>
      <main-loading />
    </div>
    <div v-else-if='$fetchState.error'>An error occurred</div>
    <div v-else>
      <header-crud :categories='categories' :name="$t('e-learning')" class='' />
      <div class='grid md:grid-cols-3 gap-6 sm:grid-cols-2 grid-cols-1'>
        <div v-for='(video, index) in data' :key='index'>

          <video-card :data='video' />


        </div>
      </div>
      <pagination
        v-if='pagination.pageCount > 1'
        :pageCount='pagination.pageCount'
        :pageSize='pagination.pageSize'
        :page='pagination.page'
        @onChange='changePage($event)'
      />
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
      dataTitle: {
        en: 'Post',
        ru: 'Пост',
        uz: 'post',
        kaa: 'Post Kaa'
      },
      categories: [],
      selectedCategory: null,
      loading: false
    }
  },
  computed: {
    ...mapGetters(getters(_page)),
    ...mapGetters(['dataCoursecategories'])
  },
  // mounted() {
  //   console.log(this.pagination, this.data,'======>>>>>>>>>>>>')
  //   this.fetchDirectories().then(() => {
  //     if (this.$route.query.category) {
  //       this.fetchData()
  //     }
  //   })
  // },
  watch: {
    '$route.query': function(val) {
      this.fetchData()
    }
  },
  async fetch() {
    await this.fetchDirectories()
    await this.fetchData()
  },
  methods: {
    // onChangeCategory(category) {
    //   this.$router.push({
    //     path: this.$route.path,
    //     query: {
    //       category: category.id,
    //     },
    //   })
    // },
    changePage(e) {
      let _query = {
        ...this.$route.query,
        page: e
      }
      this.$router.push({
        path: this.$route.path,
        query: _query
      })
    },
    async fetchData() {
      await this.$store
        .dispatch(get, {
          pagination: {
            page: this.$route.query.page ? this.$route.query.page : 1,
            pageSize: this.pagination.pageSize
          },
          populate: '*',
          'sort[0][createdAt]': 'DESC',
          locale: this.$i18n.locale,
          'filters[$and][0][coursecategory][id]':
            this.$route.query.category && parseInt(this.$route.query.category) === 0
              ? null
              : this.$route.query.category,
          'filters[$and][0][title][$containsi]': this.$route.query.text
            ? this.$route.query.text
            : null,
          'filters[$and][0][title][$notNull]': true,
          filters: {
            status: {
              title: this.dataTitle[this.$i18n.locale]
            }
          }
          // 'filters[$and][0][coursetype][id]': 1,
        })
    },
    async fetchDirectories() {
      await this.$store.dispatch('getCoursecategories', {
        populate: '*',
        locale: this.$i18n.locale,
        'sort[0][createdAt]': 'DESC',
      }).then((res) => {
        this.categories = res
        this.categories.unshift({
          id: 0,
          attributes: {
            name: this.$t('all')
          }
        })
      })
    }
  }
}
</script>
