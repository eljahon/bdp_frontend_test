<template>
  <div>
    <div v-if="$fetchState.pending"><main-loading /></div>
    <div v-else-if="$fetchState.error">An error occurred</div>
    <div class="" v-else>
      <div class="bg-gradient-to-r from-green-100 to-green-50">
        <div class="max-w-6xl mx-auto px-4 lg:px-8 xl:px-0">
          <div class="grid lg:grid-cols-2 grid-cols-1 px-0">
            <div class="grid content-center">
              <div class="flex items-center my-5">
                <!--               <svg-->
                <!--                 width="20"-->
                <!--                 height="18"-->
                <!--                 viewBox="0 0 24 20"-->
                <!--                 fill="none"-->
                <!--                 xmlns="http://www.w3.org/2000/svg"-->
                <!--               >-->
                <!--                 <path-->
                <!--                   d="M11.8137 18.9957C11.8013 19.5344 11.3011 19.925 10.8009 19.8346C11.4874 19.9594 13.0851 20.1341 13.9839 19.8346C13.463 19.9127 12.9877 19.518 12.9753 18.9916C12.9753 19.0204 12.6239 16.2284 14.0294 13.646C15.2323 11.4379 15.902 11.6682 17.3116 11.1336C19.118 10.4469 20.9741 9.73963 22.2473 8.19763C24.3265 5.67698 23.7767 2.2229 23.599 1.28948C21.3668 4.47628 19.1056 3.57164 16.8279 5.02317C14.513 6.49938 13.4796 8.82677 13.7028 11.3186C15.997 7.33 18.8948 9.08582 21.8876 5.09719C21.1601 6.29789 20.1638 7.34234 18.9237 8.08661C17.1421 9.17218 16.2823 8.85555 13.5829 12.7537C13.0869 13.4692 12.6859 14.2505 12.3965 15.0688C12.0617 14.123 11.578 13.2143 10.9663 12.4165C9.73853 10.8252 9.19701 9.92467 8.12223 9.15573C6.65062 8.09483 4.14556 7.68774 2.12416 4.34058C5.4973 8.84321 8.65962 6.78722 11.2308 11.2652C11.4871 8.4279 10.2801 5.87435 7.75433 4.26245C5.22034 2.64644 2.70701 3.65388 0.22263 0.105225C0.02421 1.14556 -0.587584 4.99027 1.72732 7.79466C3.1404 9.50766 5.19401 10.2895 7.19658 11.0518L7.21694 11.0596C8.18011 11.4255 10.6562 11.5366 11.6235 15.9241C11.8881 17.1412 11.8426 17.8444 11.8137 18.9957Z"-->
                <!--                   fill="#00730C"-->
                <!--                 />-->
                <!--               </svg>-->
                <img width="20" height="18" src="~/assets/images/logo.png" alt="logo images" />
                <div class="text-gray-800 text-sm font-semibold ml-1">
                  {{ $t('business-development-platform') }}
                </div>
              </div>
              <div class="lg:text-5xl text-2xl font-semibold">
                {{ $t('agriculture-business') }}<br />
                <div class="text-green-800 lg:my-4 my-0">{{ $t('in-karakalpakstan') }}</div>
              </div>
              <div class="text-gray-500 mr-4">
                {{ $t('info-about-platform') }}
              </div>
              <div class="my-5">
                <button
                  @click="openRegister()"
                  class="text-white text-sm bg-green-700 focus:outline-none rounded-md py-3 px-5"
                >
                  {{ $t('register') }}
                </button>
              </div>
            </div>
            <div class="">
              <img src="~/assets/images/homeBig.jpg" class="rounded-md" alt="home" />
            </div>
          </div>
        </div>
      </div>
      <div class="max-w-6xl mx-auto sm:px-6 lg:px-8 xl:px-0 px-4">
        <div class="mt-12 space-y-4">
          <router-link :to="localePath('/advisory')" class="font-semibold text-green-800 text-2xl">
            {{ $t('advisory') }}
          </router-link>
          <div class="">
            <experts-swiper :experts="experts" />
          </div>
        </div>
        <div class="mt-12 space-y-4">
          <router-link
            :to="localePath('/agri-market')"
            class="font-semibold text-green-800 text-2xl"
            >{{ $t('agri-market') }}</router-link
          >
          <div class="">
            <price-swiper :prices="pricList" />
          </div>
        </div>
        <div class="mt-12 space-y-4">
          <router-link :to="localePath('/e-learning')" class="font-semibold text-gray-700 text-2xl">
            <span class="text-green-800"> {{ $t('e-learning') }}</span>
          </router-link>
          <div class="grid md:grid-cols-3 md:gap-6 gap-0 sm:grid-cols-2 grid-cols-1">
            <div v-for="(video, index) in dataCourses" :key="index" class="mt-6">
              <video-card :data="video" />
            </div>
          </div>
          <router-link
            :to="localePath('/e-learning')"
            class="flex items-center justify-center my-6"
          >
            <button class="text-green-800 focus:outline-none text-sm flex items-center">
              {{ $t('see-all') }}
              <i class="bx bx-right-arrow-alt text-green-800 text-xl ml-1"></i>
            </button>
          </router-link>
        </div>
        <!--      <div class="my-8 space-y-4">-->
        <!--        <router-link-->
        <!--          :to="localePath('/agri-business')"-->
        <!--          class="font-semibold text-green-800 my-4 text-2xl"-->
        <!--        >-->
        <!--          {{ $t('agri-business') }}-->
        <!--        </router-link>-->
        <!--        <div class="grid lg:grid-cols-2 grid-cols-1 lg:mt-12 my-6 lg:space-x-10 space-y-8">-->
        <!--          &lt;!&ndash; <img src="~/assets/images/map.png" alt="" /> &ndash;&gt;-->
        <!--          <yandex-map :coords="getLocations" />-->
        <!--          <div class="relative">-->
        <!--            <div class="text-xl text-gray-800 font-semibold">-->
        <!--              <span class="text-green-800">{{ $t('karakalpakstan') }}</span> - -->
        <!--              {{ $t('didactive-map') }}-->
        <!--            </div>-->
        <!--            <div class="text-gray-500 text-sm leading-6 mt-7">-->
        <!--              {{-->
        <!--                $t(-->
        <!--                  'information-on-agri-business-units-that-help-users-to-access-service-providers-for-establishing-and-operating-business'-->
        <!--                )-->
        <!--              }}-->
        <!--            </div>-->
        <!--            <div class="grid lg:grid-cols-2 grid-cols-1 mt-10 gap-10">-->
        <!--              <div-->
        <!--                v-for="(item, index) in companyCategories"-->
        <!--                :key="index"-->
        <!--                @click="moveToAgriBusiness(item)"-->
        <!--              >-->
        <!--                <div class="flex items-center cursor-pointer">-->
        <!--                  <img-->
        <!--                    :src="-->
        <!--                      item.attributes && item.attributes.icon-->
        <!--                        ? $tools.getFileUrl(item.attributes.icon)-->
        <!--                        : require(`~/assets/images/district.png`)-->
        <!--                    "-->
        <!--                    class="w-6 object-contain"-->
        <!--                  />-->
        <!--                  <p class="text-base font-semibold text-gray-800 ml-4">-->
        <!--                    {{ item.attributes.name }}-->
        <!--                  </p>-->
        <!--                </div>-->
        <!--              </div>-->
        <!--            </div>-->
        <!--            <router-link-->
        <!--              :to="localePath('/agri-business')"-->
        <!--              class="lg:absolute bottom-0 flex justify-center lg:mt-0 mt-6"-->
        <!--            >-->
        <!--              <button-->
        <!--                class="text-white focus:outline-none py-3 px-7 font-medium bg-green-700 rounded-md text-sm"-->
        <!--              >-->
        <!--                {{ $t('discover-more') }}-->
        <!--              </button>-->
        <!--            </router-link>-->
        <!--          </div>-->
        <!--        </div>-->
        <!--      </div>-->
        <div class="mt-12 space-y-4">
          <router-link :to="localePath('/news')" class="font-semibold text-gray-700 text-2xl">
            <span class="text-green-800">{{ $t('news') }}</span>
          </router-link>
          <div class="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
            <NewsSwiper :news="dataNews" class="col-span-3" />
          </div>
          <router-link
            :to="localePath('/agri-finance')"
            class="flex items-center justify-center my-4"
          >
            <button class="text-green-800 focus:outline-none text-sm flex items-center">
              {{ $t('see-all') }}
              <i class="bx bx-right-arrow-alt text-green-800 text-xl ml-1"></i>
            </button>
          </router-link>
        </div>
        <div class="mt-12 space-y-4">
          <div class="font-semibold text-gray-700 text-2xl">
            {{ $t('frequently') }} <span class="text-green-800">{{ $t('asked-questions') }}</span>
          </div>
          <div class="grid lg:grid-cols-2 grid-cols-1 gap-6">
            <div>
              <div class="text-gray-500 leading-7 text-sm">
                {{
                  $t(
                    'below-you-will-find-answers-to-the-questions-we-get-asked-most-about-using-the-platfrom'
                  )
                }}
              </div>
              <div>
                <div v-for="(faq, index) in dataFaqs" :key="index">
                  <faq :data="faq" />
                </div>
              </div>
            </div>
            <img src="~/assets/images/homeSmall.jpg" class="rounded-md" alt="home" />
          </div>
        </div>
        <div class="mt-12 space-y-4">
          <!--        <div class="">-->
          <!--          <partners-swiper :partners="dataPartners" />-->
          <!--        </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import registeModal from '../../components/modals/register.vue'
import expertsSwiper from '~/components/swipers/experts-swiper.vue'
import NewsSwiper from '~/components/swipers/news-swipers/new-swipers'
import PriceSwiper from '~/components/swipers/price-swiper.vue'
import PartnersSwiper from '~/components/swipers/partners-swiper.vue'
import YandexMap from '~/components/core/yandex-map.vue'
import Faq from '~/components/Faq.vue'
import MainLoading from '~/components/main-loading'
export default {
  auth: false,
  components: {
    MainLoading,
    YandexMap,
    expertsSwiper,
    PriceSwiper,
    NewsSwiper,
    PartnersSwiper,
    Faq,
  },
  props: {},
  data() {
    return {
      video: {},
      experts: [],
      pricList: [],
      settings: {
        apiKey: 'b8d77dd9-8477-4216-ad67-5074082c24a6',
        lang: 'ru_RU',
        coordorder: 'latlong',
        version: '2.1',
      },
      companyCategories: [],
      items: [
        {
          image: 'district',
          title: 'District Hokimiyat',
        },
        {
          image: 'bank',
          title: 'Banks',
        },
        {
          image: 'terminal',
          title: 'Terminal stations',
        },
        {
          image: 'railway',
          title: 'Railway stations',
        },
        {
          image: 'refrigerator',
          title: 'Refrigerators',
        },
        {
          image: 'government',
          title: 'Government branches',
        },
        {
          image: 'farmers',
          title: 'Farmers unions',
        },
        {
          image: 'supply',
          title: 'Supply points',
        },
      ],
      dataTitle: {
        en: 'Post',
        ru: 'Пост',
        uz: 'post',
        kaa: 'Post Kaa',
      },
    }
  },
  computed: {
    ...mapState({
      isLoggedIn: (state) => state.auth.loggedIn,
      currentUser: (state) => state.auth.user,
      userConnection: (state) => state.socket.userConnection,
      userConnectionStatus: (state) => state.socket.userConnectionStatus,
    }),
    ...mapGetters([
      'dataCourses',
      'dataUsers',
      'dataFaqs',
      // 'dataPartners',
      'getLocations',
      'dataNews',
    ]),
  },
  async fetch() {
    await this.$store
      .dispatch('getPricelists', {
        populate: 'district, district.localizations, product,product.localizations',
        locale: this.$i18n.locale,
        'pagination[page]': 1,
        'pagination[pageSize]': 12,
        filters: {
          max: {
            $gt: 0,
          },
          min: {
            $gt: 0,
          },
        },
      })
      .then((res) => {
        this.pricList = res.map((el) => {
          return {
            id: el.id,
            attributes: {
              ...el.attributes,
              district: {
                data: {
                  attributes: {
                    name:
                      el.attributes.district.data.attributes.locale === this.$i18n.locale
                        ? el.attributes.district.data.attributes.name
                        : this.checkProductLocalizations(
                            el.attributes.district.data.attributes.localizations.data,
                            this.$i18n.locale
                          ),
                  },
                },
              },
              product: {
                data: {
                  attributes: {
                    image: el.attributes.product.data.attributes.image,
                    name:
                      el.attributes.product.data.attributes.locale === this.$i18n.locale
                        ? el.attributes.product.data.attributes.name
                        : this.checkProductLocalizations(
                            el.attributes.product.data.attributes.localizations.data,
                            this.$i18n.locale
                          ),
                  },
                },
              },
            },
          }
        })
      })
      .catch((error) => {
        this.$sentry.captureException(error)
      })
    await this.$store
      .dispatch('getUsers', {
        link: '/users',
        query: {
          populate:
            'additionalinfo,additionalinfo.localization,consultantcategory, consultantcategory.localization,agrocultureareas, agrocultureareas.localization',
          locale: this.$i18n.locale,
          'filters[$and][0][confirmed]': true,
          'filters[$and][0][role][id]': 4,
        },
      })
      .then((res) => {
        // console.log('res ===>>>', res.users)
        this.experts = res.users
      })
      .catch((error) => {
        this.$sentry.captureException(error)
      })
    //

    await this.$store
      .dispatch('getFaqs', {
        populate: '*',
        locale: this.$i18n.locale,
      })
      .catch((error) => {
        this.$sentry.captureException(error)
      })
    await this.$store
      .dispatch('getCourses', {
        populate: '*',
        locale: this.$i18n.locale,
        sort: ['createdAt:desc'],
        'pagination[page]': 1,
        'pagination[pageSize]': 3,
        filters: {
          status: {
            title: this.dataTitle[this.$i18n.locale],
          },
        },
      })
      .catch((error) => {
        this.$sentry.captureException(error)
      })
    await this.$store
      .dispatch('getPartners', {
        populate: '*',
        locale: this.$i18n.locale,
      })
      .catch((error) => {
        this.$sentry.captureException(error)
      })
    await this.$store
      .dispatch('getCompanies', {
        populate: '*',
        locale: this.$i18n.locale,
      })
      .then((res) => {
        this.$store.dispatch('setCompanies', res)
      })
      .catch((error) => {
        this.$sentry.captureException(error)
      })
    await this.$store
      .dispatch('getCompanycategories', {
        populate: '*',
        locale: this.$i18n.locale,
      })
      .then((res) => {
        this.companyCategories = res
      })
    await this.$store
      .dispatch('getNews', {
        populate: '*',
        locale: this.$i18n.locale,
        'sort[0][createdAt]': 'DESC',
      })
      .catch((error) => {
        this.$sentry.captureException(error)
      })
  },
  methods: {
    checkProductLocalizations(item, lang) {
      let _ = item.find((el) => el.attributes.locale === lang).attributes.name
      return _
    },
    moveToAgriBusiness(item) {
      let _query = {
        category: item.id,
      }
      this.$router.push({
        path: this.localePath('/agri-business'),
        query: this.$tools.emptyObject(_query),
      })
    },
    openRegister() {
      this.$emit('close')
      this.$modal.show(
        registeModal,
        { status: 'register' },
        {
          height: 'auto',
          maxWidth: 700,
          width: window.innerWidth <= 650 ? window.innerWidth - 10 : 650,
          scrollable: true,
        }
      )
    },
    async fetchDirectories() {
      //
      await this.$store
        .dispatch('getUsers', {
          link: '/users',
          query: {
            populate: '*',
            locale: this.$i18n.locale,
            'filters[$and][0][confirmed]': true,
            'filters[$and][0][role][id]': 4,
          },
        })
        .then((res) => {
          this.experts = res.users
        })
        .catch((error) => {
          this.$sentry.captureException(error)
        })
      //

      await this.$store
        .dispatch('getFaqs', {
          populate: '*',
          locale: this.$i18n.locale,
        })
        .catch((error) => {
          this.$sentry.captureException(error)
        })
      await this.$store
        .dispatch('getCourses', {
          populate: '*',
          locale: this.$i18n.locale,
          sort: ['createdAt:desc'],
          'pagination[page]': 1,
          'pagination[pageSize]': 3,
          filters: {
            status: {
              title: this.dataTitle[this.$i18n.locale],
            },
          },
        })
        .catch((error) => {
          this.$sentry.captureException(error)
        })
      await this.$store
        .dispatch('getPricelists', {
          populate: '*',
          locale: this.$i18n.locale,
          'pagination[page]': 1,
          'pagination[pageSize]': 12,
        })
        .catch((error) => {
          this.$sentry.captureException(error)
        })
      await this.$store
        .dispatch('getPartners', {
          populate: '*',
          locale: this.$i18n.locale,
        })
        .catch((error) => {
          this.$sentry.captureException(error)
        })
      await this.$store
        .dispatch('getCompanies', {
          populate: '*',
          locale: this.$i18n.locale,
        })
        .then((res) => {
          this.$store.dispatch('setCompanies', res)
        })
        .catch((error) => {
          this.$sentry.captureException(error)
        })
      await this.$store
        .dispatch('getCompanycategories', {
          populate: '*',
          locale: this.$i18n.locale,
        })
        .then((res) => {
          this.companyCategories = res
        })
      await this.$store
        .dispatch('getNews', {
          populate: '*',
          locale: this.$i18n.locale,
          'sort[0][createdAt]': 'DESC',
        })
        .catch((error) => {
          this.$sentry.captureException(error)
        })
    },
  },
}
</script>
