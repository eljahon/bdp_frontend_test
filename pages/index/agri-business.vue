<template>
 <div>
   <div v-if="$fetchState.pending||loading"><main-loading /></div>
   <div v-else-if="$fetchState.error">An error request not or Internal server error</div>
   <div v-else class="max-w-6xl sm:px-6 lg:px-8 xl:px-0 px-4 mx-auto lg:my-12 my-4">
     <div class="lg:flex block items-center justify-between">
       <div class="font-semibold text-gray-700 text-2xl">
         <span class="text-green-800">{{ $t('agri-business') }}</span>
       </div>
       <div class="mt-1 flex rounded-md shadow-sm">
         <div
           class="relative py-0.5 bg-green-700 rounded-md rounded-r-none flex items-stretch flex-grow focus-within:z-10 lg:my-0 mt-4"
         >
           <input
             v-model="filter.text"
             id="search"
             type="search"
             name="search"
             class="block w-full p-2 ml-0.5 focus:outline-none sm:text-sm border-gray-300 border rounded-md"
             placeholder="Search"
           />
         </div>
         <button
           type="button"
           class="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 lg:my-0 mt-4 bg-green-700 text-sm font-medium rounded-r-md focus:outline-none"
         >
           <i class="bx bx-search text-lg text-white"></i>
         </button>
       </div>
     </div>
     <div class="grid lg:grid-cols-3 grid-cols-1 lg:gap-5 gap-0 mt-5">
       <div class="rounded-md shadow-md p-5">
         <div class="flex items-center justify-between">
           <div class="text-gray-700 text-xl font-semibold">{{ $t('locations') }}</div>
           <div class="border rounded-md border-green-700 text-green-700 p-2 mb-4">
             <select class="font-semibold w-32 focus:outline-none" v-model="filter.category" @change="onChangeCategory">
               <option v-for="(category, index) in categories" :key="index" :value="category.id">
                 {{ category.attributes.name }}
               </option>
             </select>
           </div>
         </div>
         <div
           class="overflow-y-auto hide-scrolbar scrollbar-track-blue-lighter scrollbar-thumb-blue scrollbar-w-2 scrolling-touch"
           style="height: calc(60vh - 0px)"
         >
           <div v-for="(company, index) in data" :key="index">
             <div
               class="flex pb-1 items-center space-x-3 my-2 cursor-pointer "
               :class="
                $route.query.company && parseInt($route.query.company) === company.id
                  ? 'bg-gray-100 p-2'
                  : ''
              "
               @click="toCompanyDetail(company)"
             >
               <div class="w-24 h-20">
                 <img v-if='company && company.attributes && company.attributes.logo'
                      :src="$tools.getFileUrl(company.attributes.logo)"
                      class="rounded-md w-full h-full object-cover"
                      alt="about"
                 />
                 <img v-else
                      src="~/assets/images/com.jpg"
                      class="rounded-md w-full h-full object-cover"
                      alt="about"
                 />
               </div>
               <div class="grid w-full border-b pb-1 border-green-700 content-between text-gray-500 text-base h-14">
                 <p class="text-green-700 font-medium">{{ company.attributes.name ? textFormatTop(company.attributes.name)  : ''  }}</p>
                 <p class="text-sm mt-1 pb-2" v-html='textFormatBottom(company.attributes.shortinfo)'></p>
               </div>
             </div>
           </div>
         </div>
       </div>
       <div class="col-span-2">
         <router-view></router-view>
       </div>
     </div>
   </div>
 </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { actions, getters } from '~/utils/store_schema'
import debounce from 'lodash.debounce'
const _page = 'companies'
const { get } = actions(_page)
export default {
  name: 'AgriBusiness',
  auth: false,
  directives: {
    debounce,
  },
  data() {
    return {
      statusId: {
        en: 6,
        ru: 7,
        uz: 8,
        kaa: 12
      },
      infoOpened: false,
      loading: false,
      filter: {
        category: this.$route.query.category ?? 0,
        text: '',
      },
      categories: [],
    }
  },
  async fetch() {
    await this.fetchDirectories();
    await this.fetchData()
  },
  // mounted() {
  //   this.fetchDirectories().then(() => {
  //     if (this.$route.query && Object.keys(this.$route.query).length > 0) {
  //       this.filter = { ...this.$route.query }
  //       this.fetchData()
  //     } else {
  //       this.setQuery()
  //     }
  //   })
  // },
  watch: {
    '$route.query.category': {
      handler() {
        this.fetchData()
      },
      deep: true,
    },
    'filter.text': {
      handler: debounce(function (e) {
        this.setQuery()
      }, 500),
      deep: true,
    },
  },
  computed: {
    ...mapGetters({
      ...getters(_page),
    }),
  },
  methods: {
    textFormatTop(item) {
      let len = item.length;
      if (len > 18) {
        return item.slice(0, 18) + "..."
      } else {
        return  item ? item : ''
      }
    },
    textFormatBottom(item) {
      let len = item.length;
      if (len > 26) {
        return item.slice(0, 26) + "..."
      } else {
        return  item ? item : ''
      }
    },
    async setQuery() {
      let _query = {
        ...this.$route.query,
        category: this.filter.category,
        text: this.filter.text && this.filter.text.length > 0 ? this.filter.text : null,
      }
      this.$router.push({
        path: this.$route.path,
        query: this.$tools.emptyObject(_query),
      })
    },
    onChangeCategory(event) {
      this.$ga.event({
        eventCategory: this.$route.path,
        eventAction: 'click',
        eventLabel: this.categories.find((el) => parseInt(el.id) ===parseInt(event.target.value) ).attributes.name,
        eventValue: event.target.value
      })
      this.setQuery()
    },
    async fetchData() {
     return  await this.$store
        .dispatch(get, {
          populate: '*',
          locale: this.$i18n.locale,
          'sort[0][name]': 'ASC',
          'filters[$and][0][companycategory][id]':
            this.$route.query.category && parseInt(this.$route.query.category) === 0
              ? null
              : this.$route.query.category,
          'filters[$and][0][name][$containsi]': this.$route.query.text
            ? this.$route.query.text
            : null,
          'filters[$and][0][name][$notNull]': true,
          'filters[$and][0][established]': true,
          // filters: {
          //   status: {
          //     id: {
          //       $eq: statusId[this.$i18n.locale]
          //     }
          //   }
          //
          // },
          'filters[$and][0][status][id][$eq]': this.statusId[this.$i18n.locale],
        })
        .then((res) => {
          // console.log('res ==>>>', res )
          this.$store.dispatch('setCompanies', res)
        })
       .finally(() => {
       })
    },
    async fetchDirectories() {
    return   await this.$store
        .dispatch('getCompanycategories', {
          populate: '*',
          locale: this.$i18n.locale,
        })
        .then((res) => {
          this.categories = res
          this.categories.push({
            id: 0,
            attributes: {
              name: this.$t('all'),
            },
          })
        })
    },
    toCompanyDetail(data) {
      // console.log(data, '=====>>>>>')
      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          id: data.id,
        },
      })
    },
  },
}
</script>

<style scoped>
.hide-scrolbar::-webkit-scrollbar {
  display: none;
}
.hide-scrolbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
