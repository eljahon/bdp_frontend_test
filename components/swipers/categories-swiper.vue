<template>
  <div class="relative">
    <swiper
      ref="swiper"
      class="swiper"
      :options="categoriesOption"
      :autoplay="{ delay: 2000, disableOnIteraction: false }"
      :pagination="{ clickable: true }"
    >
    <client-only>
      <swiper-slide v-for="(category, index) in data" :key="index">
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
    </client-only>
  
    </swiper>
  </div>
</template>

<script>
export default {
  name: 'CategoriesSwiper',
  auth: false,
  data() {
    return {
      filter: {
        category: 0,
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
  props: {
    data: Array,
    name: String,
  },
  mounted() {
    if (!this.$route.query.category) {
      this.setQuery()
    }
  },
  methods: {
    toChange(category) {
      this.$emit('onChange', category)
    },
    setQuery() {
      let _query = {
        category: this.filter.category,
      }
      this.$router.push({
        path: this.$route.path,
        query: this.$tools.emptyObject(_query),
      })
    },
    prev() {
      this.$refs.swiper.$swiper.slidePrev()
    },
    next() {
      this.$refs.swiper.$swiper.slideNext()
    },
  },
}
</script>
