<template>
  <div>
<!--    <div v-if="$fetchState.pending||loading"><main-loading /></div>-->
<!--    <div v-else-if="$fetchState.error">An error request not or Internal server error</div>-->
    <div>
      <div
      v-if="company.id && detailOpened"
      class="border relative rounded-md p-5 bg-white"
      style="min-height: calc(72vh - 0px)"
    >
      <div class="flex justify-between items-center mb-2">
        <h3 v-if='company.attributes && company.attributes&& company.attributes.name' class="text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white">
          {{ company.attributes.name ? company.attributes.name : ''  }}
        </h3>
        <button
          type="button"
          class="
            text-gray-400
            bg-transparent
            hover:bg-gray-100 hover:text-gray-900
            rounded-lg
            text-sm
            p-1.5
            ml-auto
            inline-flex
            items-center
          "
          data-modal-toggle="defaultModal"
          @click="onClose()"
        >
          <svg
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div v-html="company.attributes.fullinfo"></div>
      <div class="absolute bottom-5 right-5 left-5">
        <div class="flex justify-between items-center">
          <h3 class="text-xl font-semibold text-gray-900 lg:text-2xl left-5 dark:text-white">
            {{ company.attributes.address ? company.attributes.address : '' }}
          </h3>
          <button
            class="
              right-5
              items-center
              text-white
              focus:outline-none
              text-sm
              rounded-md
              bg-green-700
              p-3
            "
          >
            {{ $tools.phoneFormatter(company.attributes.phone) }}
          </button>
        </div>
      </div>
    </div>
    <yandex-map
      v-if="!detailOpened"
      :coords="getLocations"
      :location="company.attributes"
    />
    </div>
  </div>
</template>
<script>
import YandexMap from '~/components/core/yandex-map.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'AgriBusiness',
  auth: false,
  components: {
    YandexMap,
  },
  data() {
    return {
      detailOpened: false,
      company: {
        attributes: {},
      },
    }
  },
  // mounted() {
  //   if (this.$route.query.company) {
  //     this.fetchCompanyDetail(this.$route.query.company)
  //   }
  // },
  computed: {
    ...mapGetters(['getLocations']),
  },
  watch: {
    'getLocations': function(oldvalue, newvalue) {
    },
    '$route.query.id': function (val) {
      if (val) {
        this.fetchCompanyDetail(val)
      }
}
  },
  methods: {
    onClose() {
      this.detailOpened = false
    },
   async  fetchCompanyDetail(id) {
     return await this.$store
        .dispatch('getByIdCompanies', {
          id: id,
          query: {
            populate: '*',
          },
        })
        .then((res) => {
          this.company = { ...res.data }
          // this.detailOpened = true
        })
    },
  },
}
</script>
