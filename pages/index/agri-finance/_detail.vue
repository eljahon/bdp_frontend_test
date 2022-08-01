<template>
  <div class="max-w-6xl mx-auto lg:my-12 my-4 sm:px-6 lg:px-8 xl:px-0 px-4">
    <div class="grid lg:grid-cols-3 grid-cols-1 lg:gap-6 gap-0">
      <div class="col-span-2">
        <div class="">
          <div class="mb-6 text-gray-700 font-semibold text-4xl">
            {{detail.attributes.title}}
          </div>
          <p class="text-sm text-gray-500 leading-8">
           {{detail.attributes.content}}
          </p>
        </div>
      </div>
      <div class="space-y-5">
        <div
          v-if="detail.attributes.attachments && detail.attributes.attachments.data.length > 0"
          class="bg-white rounded-md border border-gray-100 shadow-md p-5 lg:mt-0 mt-6"
        >
          <div class="text-gray-700 font-semibold text-xl">{{ $t('useful-materials') }}</div>
          <div
            v-for="(file, ind) in detail.attributes.attachments.data"
            :key="ind"
            @click="openInNewTab(file)"
            class="flex items-center justify-between rounded-md bg-yellow-100 p-3"
          >
            <div class="flex items-center space-x-3">
              <i class="bx bxs-file-pdf text-gray-700 text-2xl"></i>
              <p class="text-base text-gray-700 line-clamp-1">{{ file.attributes.filename }}</p>
            </div>
            <div><i class="bx bx-download text-gray-700 text-xl"></i></div>
          </div>
        </div>
        <div class="bg-white rounded-md border border-gray-100 shadow-md p-5">
          <div class="text-gray-700 font-semibold text-xl">{{ $t('other-courses') }}</div>
          <nuxt-link
            v-for="(service, ind) in services"
            :key="ind"
            class="flex items-center space-x-3 my-4 cursor-pointer hover:bg-gray-100 rounded-md"
            :to="localePath(`/agri-finance/${service.id}`)"
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
          <nuxt-link
            :to="localePath('/agri-finance')"
            class="text-center text-green-500 hover:text-green-700 font-semibold text-sm flex justify-center"
          >
            {{ $t('view-all') }}
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="text-gray-700 font-semibold text-2xl my-6">Our work process</div>
    <p class="text-sm text-gray-500 leading-8">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer adipiscing erat eget risus
      sollicitudin pellentesque et non erat. Maecenas nibh dolor, malesuada et bibendum a, sagittis
      accumsan ipsum. Pellentesque ultrices ultrices sapien, nec tincidunt nunc posuere ut. Lorem
      ipsum dolor sit amet, consectetur adipiscing elit. Nam scelerisque tristique dolor vitae
      tincidunt. Aenean quis massa uada mi elementum elementum. Nec sapien convallis vulputate
      rhoncus vel dui.
    </p>
    <div class="grid lg:grid-cols-4 grid-cols-1 gap-4 my-6">
      <div class="rounded-md border border-gray-200 shadow-md bg-white p-8">
        <div class="flex items-center justify-between">
          <img src="~/assets/images/consultation.png" class="rounded-md" alt="about" />
          <p class="text-gray-200 text-5xl font-extrabold">1</p>
        </div>
        <div class="text-gray-700 font-semibold text-lg mb-4 mt-8">Consultation</div>
        <div class="text-sm text-gray-500">
          Lorem Ipsum is simply dummy of the printing and typesetting test industry. Lorem Ipsum has
          been the industry's standard.
        </div>
      </div>
      <div class="rounded-md border border-gray-200 shadow-md bg-white p-8">
        <div class="flex items-center justify-between">
          <img src="~/assets/images/recommendation.png" class="rounded-md" alt="about" />
          <p class="text-gray-200 text-5xl font-extrabold">2</p>
        </div>
        <div class="text-gray-700 font-semibold text-lg mb-4 mt-8">Design & work</div>
        <div class="text-sm text-gray-500">
          Lorem Ipsum is simply dummy of the printing and typesetting test industry. Lorem Ipsum has
          been the industry's standard.
        </div>
      </div>
      <div class="rounded-md border border-gray-200 shadow-md bg-white p-8">
        <div class="flex items-center justify-between">
          <img src="~/assets/images/financial.png" class="rounded-md" alt="about" />
          <p class="text-gray-200 text-5xl font-extrabold">3</p>
        </div>
        <div class="text-gray-700 font-semibold text-lg mb-4 mt-8">Maintenance</div>
        <div class="text-sm text-gray-500">
          Lorem Ipsum is simply dummy of the printing and typesetting test industry. Lorem Ipsum has
          been the industry's standard.
        </div>
      </div>
      <div class="rounded-md border border-gray-200 shadow-md bg-white p-8">
        <div class="flex items-center justify-between">
          <img src="~/assets/images/management.png" class="rounded-md" alt="about" />
          <p class="text-gray-200 text-5xl font-extrabold">4</p>
        </div>
        <div class="text-gray-700 font-semibold text-lg mb-4 mt-8">Complete</div>
        <div class="text-sm text-gray-500">
          Lorem Ipsum is simply dummy of the printing and typesetting test industry. Lorem Ipsum has
          been the industry's standard.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { actions, getters } from '~/utils/store_schema'
const _page = 'serviceposts'
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
            pageSize: 5,
          },
          populate: '*',
          'sort[0][createdAt]': 'DESC',
          locale: this.$i18n.locale,
          'filters[$and][0][id][$ne]': this.$route.params.detail,
        })
        .then((res) => {
          this.services = res
        })
    },
    async fetchData() {
      await this.$store
        .dispatch(getById, {
          id: this.$route.params.detail,
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
