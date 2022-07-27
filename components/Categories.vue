<template>
  <div class="lg:flex grid grid-cols-3 items-center justify-center lg:gap-7 gap-4 my-6">
    <button
      v-for="(category, index) in data"
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
</template>
<script>
export default {
  props: {
    data: Array,
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {
    toChange(category) {
      this.$emit('onChange', category)
    },
  },
}
</script>