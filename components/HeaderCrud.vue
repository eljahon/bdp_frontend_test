<template>
  <div>
    <div class="lg:flex block items-center justify-between">
      <div class="font-semibold text-gray-700 text-2xl">
        <span class="text-green-800">{{ name }}</span>
      </div>
      <div v-if="!isConsultant" class="mt-1 flex rounded-md shadow-sm">
        <div
          class="
            relative
            py-0.5
            bg-green-700
            rounded-md rounded-r-none
            flex
            items-stretch
            flex-grow
            focus-within:z-10
            lg:my-0
            mt-4
          "
        >
          <input
            v-model="filter.text"
            id="search"
            type="search"
            name="search"
            class="
              block
              w-full
              p-2
              ml-0.5
              focus:outline-none
              sm:text-sm
              border-gray-300 border
              rounded-md
            "
            placeholder="Search"
            @change="onChangeSearch"
          />
        </div>
        <button
          type="button"
          class="
            -ml-px
            relative
            inline-flex
            items-center
            space-x-2
            px-4
            py-2
            lg:my-0
            mt-4
            bg-green-700
            text-sm
            font-medium
            rounded-r-md
            focus:outline-none
          "
        >
          <i class="bx bx-search text-lg text-white"></i>
        </button>
      </div>
    </div>
    <div class="lg:flex grid grid-cols-3 items-center justify-center lg:gap-7 gap-4 my-6">
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
  watch: {},
  methods: {
    toChange(category) {
      this.filter.category = category.id
      this.setQuery()
    },
    onChangeSearch: debounce(function (e) {
      this.setQuery()
    }, 500),
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