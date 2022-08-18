<template>
  <div class="max-w-6xl mx-auto sm:px-6 lg:px-8 xl:px-0 px-4 lg:my-12 my-4">
    <div class="grid grid-cols-4 gap-4">
      <!-- Vertical menu for desktop -->
      <div class="lg:block hidden">
        <sidebar :name="'marketplace'" />
      </div>
      <div class="lg:col-span-3 col-span-4">
        <main class="flex-1 relative focus:outline-none">
          <div class="grid md:grid-cols-2 grid-cols-1 mb-4">
            <div class="md:flex hidden items-center">
              <input
                v-model="query.filter"
                class="w-full pl-9 text-base font-medium focus:outline-none text-gray-500 border-transparent bg-gray-100 rounded-md p-2"
                :placeholder="$t('search')"
                type="text"
              />
              <!-- @input="searching($event.target.value)" -->
              <div class="absolute m-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
                  fill="none"
                  viewBox="0 0 27 24"
                >
                  <path
                    stroke="#6b7280"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M23.059 21l-6.334-6m2.111-5c0 3.866-3.308 7-7.388 7-4.081 0-7.39-3.134-7.39-7s3.309-7 7.39-7c4.08 0 7.388 3.134 7.388 7z"
                  />
                </svg>
              </div>
            </div>
            <div class="md:flex hidden relative items-center justify-end">
              <div>
                <div
                  v-show="isPostTypeDropdown"
                  class="z-20 absolute top-12 right-10 p-4 w-40 text-lg rounded-md shadow-md py-1 text-gray-700 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabindex="-1"
                  @mouseenter="postTypeDropdown(true)"
                  @mouseleave="postTypeDropdown(false)"
                >
                  Lorem ipsum dolor sit amet.
                </div>
              </div>
              <div class="ml-3">
                <button
                  aria-expanded="false"
                  aria-haspopup="true"
                  class="bg-gray-100 hover:bg-gray-200 rounded-md w-10 h-10 focus:outline-none"
                  @click="openFilter(!isFilterOpened)"
                  @mouseenter="openFilter(true)"
                >
                  <div class="text-lg">
                    <i class="flex justify-center items-center bx bx-slider-alt" />
                  </div>
                </button>
              </div>
              <div
                v-show="isFilterOpened"
                class="z-20 absolute top-12 p-4 w-80 rounded-md shadow-lg border py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabindex="-1"
                @mouseenter="openFilter(true)"
                @mouseleave="openFilter(false)"
              >
                Lorem ipsum dolor sit amet.
              </div>
            </div>
          </div>
        </main>
        <div class="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
          <div v-for="(product, index) in products" :key="index">
            Lorem ipsum dolor sit amet.
            <div class="col-span-3 flex gap-4 h-auto w-full cursor-pointer">
              <div class="gap-x-2 bg-white rounded-md hover:shadow-lg border shadow-md w-full">
                <div class="relative overflow-hidden">
                  <nuxt-link
                    :to="{
                      path: localePath(`/marketplace/${product.id}`),
                      query: { id: product.id },
                    }"
                  >
                    <img
                      v-if="product.attributes.main_image || product.attributes.thumbnail"
                      :src="
                        $tools.getFileUrl(
                          product.attributes.thumbnail
                            ? product.attributes.thumbnail
                            : product.attributes.main_image
                        )
                      "
                      class="w-full md:h-60 h-44 object-cover rounded-md rounded-b-none"
                    />
                    <img
                      v-else
                      class="w-full md:h-60 h-44 object-cover rounded-md rounded-b-none"
                      src="https://www.pinupacc.com/images/dummy.png"
                    />
                  </nuxt-link>
                  <!-- <div v-if="product.typename" class="absolute bottom-3 left-3">
                      <p
                        v-if="product.type === '1'"
                        class="text-green-800 bg-green-50 text-sm px-2 py-1 text-center rounded-xl w-auto"
                      >
                        {{ product.typename[$i18n.locale] }}
                      </p>
                      <p
                        v-else
                        class="text-light-orange bg-orange-50 w-auto rounded-xl px-2 font-semibold text-base text-right"
                      >
                        {{ product.typename[$i18n.locale] }}
                      </p>
                    </div> -->
                </div>
                <div class="p-3">
                  <h3 class="text-gray-600 font-medium line-clamp-1 text-base">
                    {{ product.attributes.title[$i18n.locale] }}
                  </h3>
                  <div class="flex items-center font-medium mt-3">
                    <p
                      v-if="product.pricetype === 'contract'"
                      class="text-green-800 text-lg font-medium text-center rounded-xl w-auto"
                    >
                      {{ $t('text.byAgreement') }}
                    </p>
                    <p
                      v-else-if="product.attributes.tradingposttype.data.id === 4"
                      class="text-green-600 w-auto rounded-xl font-semibold text-lg"
                    >
                      {{ product.attributes.price }}
                    </p>
                    <p v-else class="text-light-orange w-auto rounded-xl font-semibold text-lg">
                      {{ product.attributes.price }}
                    </p>
                    <!-- <div
                        v-if="product.pricetype !== 'contract' && product.unit"
                        class="text-gray-500 lowercase ml-2 text-base"
                      >
                        {{ $t('word.sum') }} / {{ product.unit.namejson[$i18n.locale] }}
                      </div> -->
                  </div>
                  <div class="flex items-end justify-between mt-4">
                    <!-- <div v-if="product.userid" class="flex items-center gap-4">
                        <div
                          v-if="!product.userid.avatar"
                          class="w-10 h-10 object-cover overflow-hidden rounded-full"
                        >
                          <img
                            src="https://silkozari.com/web/images/miscellaneous/avatar.jpg"
                            alt="Avatar"
                          />
                        </div>
                        <div v-else class="w-12 h-12 object-cover overflow-hidden rounded-full">
                          <img :src="$tools.getFileUrl(product.userid.avatar)" alt="Avatar" />
                        </div>
                        <div>
                          <h4 class="text-base text-gray-600 font-normal line-clamp-1">
                            {{
                              `${product.userid.name ? product.userid.name : ''} ${
                                product.userid.surname ? product.userid.surname : ''
                              }`
                            }}
                          </h4>
                          <span class="text-xs text-gray-400 font-normal">{{
                            $tools.getDate(product.created_at)
                          }}</span>
                        </div>
                      </div> -->
                    <div class="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        fill="none"
                        viewBox="0 0 12 12"
                      >
                        <path
                          stroke="#9CA3AF"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M7.5 6c0 .828-.672 1.5-1.5 1.5-.829 0-1.5-.672-1.5-1.5S5.17 4.5 6 4.5c.828 0 1.5.672 1.5 1.5z"
                        />
                        <path
                          stroke="#9CA3AF"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M1.229 6C1.866 3.971 3.761 2.5 6 2.5s4.134 1.471 4.771 3.5c-.637 2.029-2.532 3.5-4.77 3.5-2.24 0-4.135-1.471-4.772-3.5z"
                        />
                      </svg>
                      <span class="text-xs text-gray-500">{{ product.attributes.seen }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Marketplace',
  auth: false,
  data() {
    return {
      isFilterOpened: false,
      isPostTypeDropdown: false,
      query: {},
      categories: [],
      products: [],
    }
  },
  mounted() {
    this.fetchDirectories()
  },
  computed: {},
  methods: {
    async fetchDirectories() {
      await this.$store
        .dispatch('getTradingpostcategories', {
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
          this.categories.forEach((category) => {
            if (category.children) {
              category.children.forEach((child) => {
                child.current = false
              })
            }
            category.current = false
          })
          this.$store.dispatch('setSidebar', this.categories)
        }),
        await this.$store
          .dispatch('getTradinposts', {
            populate: '*',
            locale: this.$i18n.locale,
            // pagination: {
            //   page: this.$route.query.page ? this.$route.query.page : 1,
            //   pageSize: this.pagination.pageSize,
            // },
          })
          .then((res) => {
            this.products = res.data
          })
    },
    openFilter(bool) {
      this.isFilterOpened = bool
    },
  },
}
</script>
