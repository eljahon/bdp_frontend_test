<template>
  <div class="max-w-6xl mx-auto lg:my-12 my-4 sm:px-6 lg:px-8 xl:px-0 px-4">
      <div class="grid md:grid-cols-2 grid-cols-1 gap-6">
        <img
          v-if="detail.attributes.main_image || detail.attributes.thumbnail"
          :src="
            $tools.getFileUrl(
              detail.attributes.thumbnail
                ? detail.attributes.thumbnail
                : detail.attributes.main_image
            )
          "
          class="h-72 w-full object-cover rounded-sm"
        />
        <img
          v-else
          src="https://www.pinupacc.com/images/dummy.png"
          class="h-60 w-full object-cover rounded-sm"
        />

        <div>
          <p class="md:text-3xl text-xl text-gray-700">
            {{ detail.attributes.title }}
          </p>
          <div class="flex items-center justify-between mt-2 space-x-3">
            <p
              v-if="detail.attributes.pricetype === 'contract'"
              class="text-2xl text-green-600 font-semibold"
            >
              {{ $t('text.byAgreement') }}
            </p>
              <!-- v-else-if="detail.attributes.tradingposttype.data.id === 4" -->
            <p
              class="text-2xl lowercase text-green-600 font-semibold"
            >
              <!-- {{ detail.attributes.price }} {{ $t('sum') }} -->
              <!-- <span v-if="detail.attributes.unit"
                >/ {{ detail.attributes.unit.data.attributes.name }}
              </span> -->
            </p>
            <p class="text-2xl text-yellow-800 font-semibold lowercase">
              <!-- {{ detail.attributes.price }} {{ $t('.sum') }} -->
              <!-- <span v-if="detail.attributes.unit"
                >/ {{ detail.attributes.unit.data.attributes.name }}
              </span> -->
            </p>
          </div>
          <!-- <div class="grid grid-cols-2 gap-5 mt-7">
            <button
              class="p-1 flex text-yellow-600 bg-yellow-100 md:text-base text-sm justify-center items-center rounded-md border-2 border-transparent"
            >
              <div class="flex items-center justify-center" @click="toProductChat">
                <i class="bx bx-envelope text-base" />
                <span class="ml-2">{{ $t('word.write') }}</span>
              </div>
            </button>
            <button
              ref="toggle"
              class="p-1 flex bg-green-600 md:text-base text-sm text-white justify-center items-center rounded-md"
              @click="change"
            >
              <p v-show="show" class="text-white">
                <i class="bx bx-phone text-white" />
                <span class="ml-2">{{ $t('word.phone') }}</span>
              </p>
            </button>
            <div
              class="bg-gray-100 rounded-md font-medium text-gray-700 space-x-7 text-sm p-2 flex col-span-2"
            >
              <div class="block space-y-2">
                <div>ID: {{ productDetail.id }}</div>
                <div class="flex items-center gap-2">
                  <i class="bx bx-show-alt text-base" />
                  <span class="">{{ productDetail.seen }}</span>
                </div>
              </div>
              <div class="block space-y-2">
                <div>
                  {{ $t('word.all') }}: {{ productDetail.count }}
                  <span v-if="productDetail.unit"
                    >/ {{ productDetail.unit.namejson[$i18n.locale] }}
                  </span>
                </div>
                <div v-if="productDetail.userregion" class="flex items-center gap-1">
                  <i class="bx bx-map text-base" />
                  <p class="">
                    {{ productDetail.userregion.name[$i18n.locale] }}
                  </p>
                </div>
              </div>
            </div>
            <div class="md:flex block justify-between space-y-3 col-span-2">
              <div v-if="productDetail.userid" class="flex items-center">
                <img
                  v-if="productDetail.avatar"
                  :src="$tools.getFileUrl(productDetail.userid.avatar)"
                  class="w-12 h-12 object-cover rounded-full"
                  alt=""
                />
                <img
                  v-else
                  src="https://silkozari.com/web/images/miscellaneous/avatar.jpg"
                  class="w-12 h-12 object-cover rounded-full"
                  alt=""
                />
                <div class="block ml-2">
                  <p class="md:text-lg text-base font-medium text-gray-700">
                    {{
                      `${productDetail.userid.name ? productDetail.userid.name : ''} ${
                        productDetail.userid.surname ? productDetail.userid.surname : ''
                      }`
                    }}
                  </p>
                  <p class="md:text-sm text-xs text-gray-500">
                    {{ $tools.getDateTime(productDetail.created_at) }}
                  </p>
                </div>
              </div>
              <router-link
                :to="{ path: localePath('/trading') }"
                class="text-light-orange md:text-base text-sm font-medium flex lg:items-end justify-center"
          </p>
              >
                {{ $t('text.allAds') }}
              </router-link>
            </div>
          </div> -->
        </div>
      </div>
      <!-- <div class="grid md:grid-cols-2 grid-cols-1 my-4 gap-6">
        <div>
          <p class="md:text-lg text-base text-gray-800 font-medium">
            {{ $t('word.information') }}
          </p>
          <p class="text-gray-600 md:text-base text-sm mt-2">
            {{ productDetail.description[$i18n.locale] }}
          </p>
        </div>
        <div class="space-y-3">
          <p class="md:text-lg text-base text-gray-800 font-medium">
            {{ $t('text.deliveryParam') }}
          </p>
          <div
            v-if="!productDetail.hasdelivery"
            class="flex items-center md:text-base text-sm text-gray-700"
          >
            <i class="bx bx-cube text-lg" />
            <p class="ml-2">
              {{ $t('text.pickUp') }}
            </p>
          </div>
          <div v-else class="flex items-center text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                fill="#374151"
                d="M10.833 13.333h.75-.75zm0-6.667h-.75.75zm3.578-.59l.53-.53-.53.53zm2.845 2.846l.53-.53-.53.53zM3.333 4.916H10v-1.5H3.333v1.5zm6.75.083v8.334h1.5V4.999h-1.5zM3.25 13.333V4.999h-1.5v8.334h1.5zm.917.083h-.834v1.5h.834v-1.5zm5.833 0H7.5v1.5H10v-1.5zm-8.25-.083c0 .874.709 1.583 1.583 1.583v-1.5c-.046 0-.083-.037-.083-.083h-1.5zm8.333 0c0 .046-.037.083-.083.083v1.5c.874 0 1.583-.709 1.583-1.583h-1.5zM10 4.916c.046 0 .083.037.083.083h1.5c0-.874-.709-1.583-1.583-1.583v1.5zm-6.667-1.5c-.874 0-1.583.709-1.583 1.583h1.5c0-.046.037-.083.083-.083v-1.5zm8.25 9.917V6.666h-1.5v6.667h1.5zm.084-6.75h2.155v-1.5h-2.155v1.5zM16.75 9.51v3.822h1.5V9.51h-1.5zm-2.87-2.904l2.846 2.845 1.06-1.06-2.845-2.846-1.06 1.061zm-1.38 6.809h-.833v1.5h.833v-1.5zm4.167 0h-.834v1.5h.834v-1.5zm1.583-3.905c0-.42-.167-.822-.464-1.12l-1.06 1.061c.015.016.024.037.024.06h1.5zm-4.428-2.928c.022 0 .043.008.058.024l1.061-1.06c-.297-.297-.7-.464-1.12-.464v1.5zm-3.739 6.75c0 .874.71 1.583 1.584 1.583v-1.5c-.046 0-.084-.037-.084-.083h-1.5zm6.667 0c0 .046-.037.083-.083.083v1.5c.874 0 1.583-.709 1.583-1.583h-1.5zm-5.167-6.667c0-.046.038-.083.084-.083v-1.5c-.875 0-1.584.709-1.584 1.583h1.5zm-4.833 7.5c0 .506-.41.917-.917.917v1.5c1.335 0 2.417-1.082 2.417-2.417h-1.5zm-.917.917c-.506 0-.916-.41-.916-.917h-1.5c0 1.335 1.082 2.417 2.416 2.417v-1.5zm-.916-.917c0-.506.41-.917.916-.917v-1.5c-1.334 0-2.416 1.082-2.416 2.417h1.5zm.916-.917c.507 0 .917.41.917.917h1.5c0-1.335-1.082-2.417-2.417-2.417v1.5zm9.25.917c0 .506-.41.917-.916.917v1.5c1.334 0 2.416-1.082 2.416-2.417h-1.5zm-.916.917c-.507 0-.917-.41-.917-.917h-1.5c0 1.335 1.082 2.417 2.417 2.417v-1.5zm-.917-.917c0-.506.41-.917.917-.917v-1.5c-1.335 0-2.417 1.082-2.417 2.417h1.5zm.917-.917c.506 0 .916.41.916.917h1.5c0-1.335-1.082-2.417-2.416-2.417v1.5z"
              />
            </svg>

            <p class="ml-2 md:text-base text-sm">
              {{ $t('text.deliveryArea') }}
            </p>
          </div>
          <div v-if="productDetail.deliverableregions" class="grid grid-cols-4 gap-2">
            <div
              v-for="(region, index) in productDetail.deliverableregions"
              :key="index"
              class="flex md:text-base text-sm font-medium"
            >
              <div
                class="text-gray-700 md:text-sm text-xs bg-gray-200 rounded-md p-1.5 w-full text-center"
              >
                {{ region.name[$i18n.locale] }}
              </div>
            </div>
          </div>
        </div>
      </div> -->
      <!-- <div v-if="products.length > 0">
        <div class="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-3 gap-10 mt-8">
          <div class="text-lg text-gray-800 col-span-3 font-medium mb-4">
            Muallifning boshqa e'lonlari
          </div>
        </div>
        <div class="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-3 gap-10">
          <div v-for="(item, index) in products" :key="index">
            <div class="col-span-3 flex gap-4 h-auto w-full cursor-pointer">
              <div class="gap-x-2 bg-white rounded-md hover:shadow-lg border shadow-md w-full">
                <div class="h-48 object-cover relative overflow-hidden">
                  <router-link :to="{path: localePath('/')}">
                    <img
                      class="w-full h-60  object-cover shadow-lg rounded-md rounded-b-none"
                      src="https://www.e-fresco.io/pub/media/catalog/product/c/a/carrots_1.jpg"
                    >
                    <p v-if="item.type.id === 1" class="text-green-800 bg-green-50 text-xs px-2 py-1 text-center rounded-xl w-16 absolute bottom-2 left-2">
                      {{ item.type.name[$i18n.locale] }}
                    </p>
                    <p v-else class="text-light-orange bg-orange-50 text-xs px-2 py-1 text-center rounded-xl w-20 absolute bottom-2 left-2">
                      {{ item.type.name[$i18n.locale] }}
                    </p>
                  </router-link>
                </div>
                <div class="p-3">
                  <h3 class="text-gray-600 font-medium text-base">
                    {{ item.title[$i18n.locale] }}
                  </h3>
                  <p class="text-sm my-2 text-green-600">
                    {{ product.position }}
                  </p>
                  <div class="grid grid-cols-1 justify-between mr-3">
                    <div class="flex gap-2 items-center font-medium mt-3">
                      <p v-if="item.type.id === 1" class="text-green-600 text-base text-right">
                        {{ item.price }}
                      </p>
                      <p v-else class="text-light-orange text-base text-right">
                        {{ item.price }}
                      </p>
                      <p v-if="item.payment_type" class="text-gray-500 lowercase text-xs">
                        {{ item.payment_type.name[$i18n.locale] }} / {{ item.unit.name[$i18n.locale] }}
                      </p>
                    </div>
                    <div class="flex items-end justify-between mt-4">
                      <div class="flex items-center gap-4">
                        <div class="w-10 h-10 object-cover overflow-hidden rounded-full">
                          <img :src="item.userid.avatar" alt="Avatar">
                        </div>
                        <div>
                          <span class="text-xs text-gray-400 font-normal">{{ $tools.getDate(item.created_at) }}</span>
                        </div>
                      </div>
                      <div class="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 12 12">
                          <path stroke="#9CA3AF" stroke-linecap="round" stroke-linejoin="round" d="M7.5 6c0 .828-.672 1.5-1.5 1.5-.829 0-1.5-.672-1.5-1.5S5.17 4.5 6 4.5c.828 0 1.5.672 1.5 1.5z" />
                          <path stroke="#9CA3AF" stroke-linecap="round" stroke-linejoin="round" d="M1.229 6C1.866 3.971 3.761 2.5 6 2.5s4.134 1.471 4.771 3.5c-.637 2.029-2.532 3.5-4.77 3.5-2.24 0-4.135-1.471-4.772-3.5z" />
                        </svg>
                        <span class="text-xs text-gray-500">{{ item.views }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> -->
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { actions, getters } from '~/utils/store_schema'
const _page = 'tradinposts'
const { getById } = actions(_page)
export default {
  name: 'MarketplaceDetail',
  auth: false,
  data() {
    return {
      detail: {
        attributes: {},
      },
    }
  },
  mounted() {
    this.fetchData()
  },
  computed: {
    ...mapGetters(getters(_page)),
  },
  methods: {
    async fetchData() {
      await this.$store
        .dispatch(getById, {
          id: this.$route.params.detail,
          query: {
            populate: '*',
            locale: this.$i18n.locale,
          },
        })
        .then((res) => {
          this.detail = { ...res.data }
        })
    },
  },
}
</script>
