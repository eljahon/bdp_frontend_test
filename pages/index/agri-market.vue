<template>
<div>
  <div v-if="$fetchState.pending||loading"><main-loading /></div>
  <div v-else-if="$fetchState.error">An error request not or Internal server error</div>
  <div v-else class="max-w-6xl mx-auto lg:my-12 my-4 sm:px-6 lg:px-8 xl:px-0 px-4">
    <div class="lg:flex block items-center justify-between">
      <div class="font-semibold text-gray-700 text-2xl">
        <span class="text-green-800">{{$t('agri-market')}} - </span> {{$t('weekly-prices')}}
      </div>
      <div class="lg:mt-1 mt-4 flex space-x-6 items-center">
        <div class="text-green-700 text-sm">
          <select v-model="filter.district" class="focus:outline-none">
            <option v-for="(district, index) in districts" :key="index" :value="district.id">
              {{ district.name }}
            </option>
          </select>
        </div>
        <div class="text-green-700 text-sm">
          <select v-model="filter.category" class="focus:outline-none">
            <option v-for="(category, index) in categories" :key="index" :value="category.id">
              {{ category.attributes.name }}
            </option>
          </select>
        </div>
<!--        <div class="text-green-700 text-sm">-->
<!--          <select v-model="filter.pricedate" class="focus:outline-none">-->
<!--            <option v-for="(priceDate, index) in priceDates" :key="index" :value="priceDate.id">-->
<!--              {{ $tools.getDate(priceDate.attributes.date) }}-->
<!--            </option>-->
<!--          </select>-->
<!--        </div>-->
        <nuxt-link
          :to="{path: localePath('/graph')}"
          class="
            text-green-700 text-sm
            border border-green-700
            rounded-md
            px-3
            py-1.5
            focus:outline-none
          "
        >
          {{ $t('compare') }}
        </nuxt-link>
      </div>
    </div>
    <div class="grid md:grid-cols-4 gap-4 sm:grid-cols-2 grid-cols-1 mt-8">
      <div v-for="(price, index) in pricList" :key="index">
        <prices :data="price" />
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Prices from '~/components/Prices.vue'
import { mapGetters } from 'vuex'
import { actions, getters } from '~/utils/store_schema'
const _page = 'pricelists'
const { get } = actions(_page)
export default {
  name: 'AgriMarket',
  auth: false,
  components: { Prices },
  data() {
    return {
      pricList: [],
      regionId: {
        en: 18,
        ru: 36,
        uz: 37,
        kaa: 38
      },
      filter: {
        district: this.$route.query.district ?? 5,
        category: 'all',
        pricedate: null
      },
      loading: false,
      districts: [],
      categories: [],
      // priceDates: []
    }
  },
async fetch() {
  try {
    await this.fetchDirectories();
    await this.setQuery()
    await this.fetchPriceLists()
  } catch (err) {
    console.log(err)
  }
},
  computed: {
    ...mapGetters({
      ...getters(_page),
    }),
  },
  watch: {
    filter: {
      handler() {
        this.setQuery()
      },
      deep: true,
    },
    '$route.query': {
      handler() {
        this.fetchPriceLists()
      },
      deep: true,
    },
  },
  methods: {
    checkProductLocalizations (item, lang) {
      let _ =item.find((el) =>el.attributes.locale === lang).attributes.name;
     return  _;
    },
    async setQuery () {
      await this.$router.push({
        path: this.$route.path,
        query: {
          district: this.filter.district,
          category: this.filter.category,
          // pricedate: this.filter.pricedate
        }
      })
    },
   async fetchPriceLists() {
     let id;
     await this.$store.dispatch('getPricedates', {
       populate: '*',
       locale: this.$i18n.locale,
       sort: 'createdAt:DESC'
     }).then(res => {
       // this.priceDates = res
      id = res[0].id
     })
     const _ = {
        populate: 'product,product.localizations',
        locale: this.$i18n.locale,
        "filters[$and][0][district][id]": this.$route.query.district ,
        "filters[$and][0][pricedate][id]": id,
        // "filters[max][$ne]": 0,
        filters: {
          max: {
            $gt: 0
          },
          min: {
            $gt: 0
          }
        },
        "filters[product][productcategory][id][$eq]": this.$route.query.category !== 'all' ? this.$route.query.category : null,
        'sort[0][product][name]': 'ASC',
      }
     try {
       await this.$store.dispatch(get, _)
         .then(res => {
           this.pricList = res.map((el) => {
               return {
                 id: el.id,
                 attributes: {
                   ...el.attributes,
                   product: {
                     data: {
                       attributes: {
                         image: el.attributes.product.data.attributes.image,
                         name:
                           el.attributes.product.data.attributes.locale === this.$i18n.locale
                             ? el.attributes.product.data.attributes.name
                             : this.checkProductLocalizations(el.attributes.product.data.attributes.localizations.data, this.$i18n.locale)

                       }
                     }
                   }
                 }

               }
             })
         })

     } catch (err) {
       console.log(err)
     }
    },
    async fetchDirectories() {
      try {
        await this.$store.dispatch('getDistricts', {
          populate: '*',
          "filters[$and][0][region][id]": this.regionId[this.$i18n.locale],
          locale: this.$i18n.locale,
        }).then(res => {
          this.districts = res
            .map((e) => {
              return {
                id: e.attributes.locale === 'en'? e.id : this.$tools.getDefaultLanguageID(e.attributes.localizations.data),
                name: e.attributes.name,
              }
            });
          // if (res.districts((el) => el.id).includes(this.$route.query.district)) {
          //   this.filter.district = parseInt(this.$route.query.district)
          // }  else  {
          //   this.filter.district = this.districts[0].id
          // }
        })
        await this.$store.dispatch('getProductcategories', {
          populate: '*',
          locale: this.$i18n.locale,
        }).then(res => {
          this.categories = res
          this.categories.push({
            id: 'all',
            attributes: {
              name: this.$t('all-products'),
            },
          })
        })

      } catch (err) {
        console.log(err)
      }
    }
  },
}
</script>
