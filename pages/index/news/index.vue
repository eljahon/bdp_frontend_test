<template>
  <div class="max-w-6xl mx-auto lg:my-12 my-4 sm:px-6 lg:px-8 xl:px-0 px-4">
    <div class="grid lg:grid-cols-3 grid-cols-1 lg:gap-6 gap-0">
      <div class="col-span-2">
        <div class="">
          <div class="mb-6 text-gray-700 font-semibold text-4xl">
            {{detail.attributes.title}}
          </div>
          <div v-html='detail.attributes.content' class="text-sm text-gray-500 leading-8">
            <!--           {{detail.attributes.content}}-->
          </div>
        </div>
      </div>
      <div class="space-y-5">
        <div
          v-if="detail.attributes.attachments && detail.attributes.attachments.data.length > 0"
          class="bg-white rounded-md border border-gray-100 shadow-md p-5 lg:mt-0 mt-6"
        >
          <div class="text-gray-700 font-semibold text-xl">{{ $t('useful-materials') }}</div>
<!--          <div-->
<!--            v-for="(file, ind) in detail.attributes.attachments.data"-->
<!--            :key="ind"-->
<!--            @click="openInNewTab(file)"-->
<!--            class="flex items-center justify-between rounded-md bg-yellow-100 p-3"-->
<!--          >-->
<!--&lt;!&ndash;            <div class="flex items-center space-x-3">&ndash;&gt;-->
<!--&lt;!&ndash;              <i class="bx bxs-file-pdf text-gray-700 text-2xl"></i>&ndash;&gt;-->
<!--&lt;!&ndash;              <p class="text-base text-gray-700 line-clamp-1">{{ file.attributes.filename }}</p>&ndash;&gt;-->
<!--&lt;!&ndash;            </div>&ndash;&gt;-->
<!--            <div><i class="bx bx-download text-gray-700 text-xl"></i></div>-->
<!--          </div>-->
        </div>
        <div class="bg-white rounded-md border border-gray-100 shadow-md p-5">
          <div class="text-gray-700 font-semibold text-xl">{{ $t('news') }}</div>
          <div v-for="(service, ind) in services"
               :key="ind">
            <a v-if='service && service.attributes &&service.attributes.link' :href='service.attributes.link' target="_blank"
               class="flex items-center space-x-3 my-4 cursor-pointer hover:bg-gray-100 rounded-md"

            >
              <img
                :src="
                $tools.getFileUrl(
                  service.attributes.thumbnail
                    ? service.attributes.thumbnail
                    : service.attributes.image
                )
              "
                class="rounded-md w-28 h-20 object-cover"
                :alt="service.id"
              />
              <div class="grid content-between text-gray-600 text-sm">
                <div class="line-clamp-2 text-sm mb-2">{{ service.attributes.title }}</div>
                <div class="text-xs">{{ $tools.getDate(service.attributes.createdAt) }}</div>
              </div>
            </a>
            <nuxt-link
              class="flex items-center space-x-3 my-4 cursor-pointer hover:bg-gray-100 rounded-md"
              :to="{path:localePath(`/news`), query: {id:service.id}}"
            >
              <img
                :src="
                $tools.getFileUrl(
                  service.attributes.thumbnail
                    ? service.attributes.thumbnail
                    : service.attributes.image
                )
              "
                class="rounded-md w-28 h-20 object-cover"
                :alt="service.id"
              />
              <div class="grid content-between text-gray-600 text-sm">
                <div class="line-clamp-2 text-sm mb-2">{{ service.attributes.title }}</div>
                <div class="text-xs">{{ $tools.getDate(service.attributes.createdAt) }}</div>
              </div>
            </nuxt-link>
          </div>

                    <nuxt-link
                      :to="localePath('/news')"
                      class="text-center text-green-500 hover:text-green-700 font-semibold text-sm flex justify-center"
                    >
                      {{ $t('view-all') }}
                    </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { actions, getters } from '~/utils/store_schema'
const _page = 'news'
const { get, getById } = actions(_page)
export default {
  name: 'AgriFinanceDetails',
  auth: false,
  data() {
    return {
      detail: {
        attributes: {}
      },
      services: []
    }
  },
  watch: {
    '$route.query.id': function(value) {
      // console.log(value)
      this.fetchData()
    }
  },
  computed: {
    ...mapGetters(getters(_page)),
  },
  mounted() {
    window.scrollTo(0, 0)
    this.fetchDirectories().then(() => {
      this.fetchData()
    })
  },
  methods: {
    openInNewTab(file) {
      window.open(this.$tools.getFileUrl(file.attributes.url))
    },
    async fetchDirectories() {
      await this.$store
        .dispatch(get, {
          pagination: {
            page: 1,
            pageSize: 12,
          },
          populate: '*',
          'sort[0][createdAt]': 'DESC',
          locale: this.$i18n.locale,
          // 'filters[$and][0][id][$ne]': this.$route.params.detail,
        })
        .then((res) => {
          this.services = res;
          this.localePath({path: '/news', query: {id: res[0].id}})
          this.$router.push({path: this.localePath('/news'), query: {id: res[0].id}})
          // console.log('=====>>>', res[0].id, this.localePath('/news'),this.localePath({path: '/news', query: {id: res[0].id}}))
        })
    },
    async fetchData() {
      await this.$store
        .dispatch(getById, {
          id: this.$route.query.id,
          query: {
            populate: '*',
            locale: this.$i18n.locale,
          }
        })
        .then((res) => {
          this.detail = { ...res.data}
        })
    },
  },

}
</script>
