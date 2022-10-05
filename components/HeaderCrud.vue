<template>
  <div>
    <div class="lg:flex block items-center justify-between">
      <div class="font-semibold text-gray-700 text-2xl">
        <span class="text-green-800">{{ name }}</span>
      </div>
      <div v-if="!isConsultant" class="mt-1 flex rounded-md shadow-sm">
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
      <div v-else class="border md:block hidden rounded-md border-green-700 text-green-700 p-2">
        <select
          class="font-semibold focus:outline-none flex justify-between w-32"
          v-model="filter.category"
          @change="onChangeCategory"
        >
          <option
            v-for="(category, index) in categories"
            :key="index"
            :value="category.id"
            class="pr-4"
          >
            {{ category.attributes.name }}
          </option>
          <i class="bx bx-chevron-down text-lg"></i>
        </select>
      </div>
    </div>
    <div
      v-if="!isConsultant"
      class="lg:flex grid-cols-3 items-center md:block hidden justify-center lg:gap-7 gap-4 my-6"
    >
      <button
        v-for="(category, index) in categories"
        :key="index"
        class="rounded-md flex items-center focus:outline-none py-1.5 px-4"
        :class="
          $route.query.category && parseInt($route.query.category) === category.id
            ? 'bg-green-700 text-white'
            : 'border border-green-700 text-green-700 hover:text-white hover:bg-green-700'
        "
        @click="toChange(category)"
      >
        {{ category.attributes ? category.attributes.name : '' }}
      </button>
    </div>
    <div class="lg:hidden flex mt-4">
      <swiper
        ref="swiper"
        class="swiper"
        :options="categoriesOption"
        :autoplay="{ delay: 2000, disableOnIteraction: false }"
        :pagination="{ clickable: true }"
      >
        <swiper-slide v-for="(category, index) in categories" :key="index">
          <button
            class="rounded-md py-1.5 mb-4 w-full"
            :class="
            $route.query.category && parseInt($route.query.category) === category.id
              ? 'bg-green-700 text-white'
              : 'border border-green-700 text-green-700 hover:text-white hover:bg-green-700'
          "
            @click="toChange(category)"
          >
            {{ category.attributes ? category.attributes.name : '' }}
          </button>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
<script>
import debounce from 'lodash.debounce'
export default {
  props: {
    categories: Array,
    name: String,
    isConsultant: Boolean,
  },
  directives: {
    debounce,
  },
  data() {
    return {
      filter: {
        category: 0,
        text: '',
      },
      categoriesOption: {
        direction: 'horizontal',
        slideToClickedSlide: false,
        pagination: {
          clickable: true,
        },
        breakpoints: {
          768: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 6,
          },
          410: {
            slidesPerView: 2.7,
            spaceBetween: 10,
          },
          350: {
            slidesPerView: 2.5,
            spaceBetween: 10,
          },
          320: {
            slidesPerView: 2.5,
            spaceBetween: 10,
          },
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
    }
  },
  mounted() {
    if (this.$route.query.text) {
      this.filter.text = this.$route.query.text
    }
    if (!this.$route.query.category) {
      this.setQuery()
    }
  },
  watch: {
    'filter.text': {
      handler: debounce(function (e) {
        this.setQuery()
      }, 500),
      deep: true,
    },
  },
  methods: {
    onChangeCategory() {
      this.setQuery()
    },
    toChange(category) {
      this.filter.category = category.id
      this.setQuery()
    },
    setQuery() {
      let _query = {
        category: this.filter.category,
        text: this.filter.text.length > 0 ? this.filter.text : null,
      }
      this.$router.push({
        path: this.$route.path,
        query: this.$tools.emptyObject(_query),
      })
    },
  },
}
</script>
