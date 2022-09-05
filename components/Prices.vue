<template>
  <div class="group w-full hover:shadow-md shadow-sm border border-gray-100 rounded-md relative">
    <div class="flex items-center w-full bg-white rounded-md p-2 gap-2">
      <img
      v-if="data && data.attributes && data.attributes.product && data.attributes.product.data && data.attributes.product.data.attributes"
        :src="
          data.attributes.product.data.attributes.image !== null
            ? $tools.getFileUrl(data.attributes.product.data.attributes.image)
            : require('/assets/images/default.png')
        "
        @error="
          data.attributes.product.data.attributes.image = require('/assets/images/default.png')
        "
        class="w-16 rounded-md"
      />
      <div class="grid content-between space-y-2">
        <div v-if="data && data.attributes && data.attributes.product && data.attributes.product.data && data.attributes.product.data.attributes" class="text-gray-700 text-sm font-semibold">
          {{ data.attributes.product.data.attributes.name }}
        </div>
        <div v-if="data && data.attributes && data.attributes.district && data.attributes.district.data && data.attributes.district.data.attributes" class="text-green-700 font-medium text-xs">
          {{ data.attributes.district.data.attributes.name }}
        </div>
        <div v-if="data && data.attributes" class="flex items-center text-gray-700 font-semibold text-sm space-x-3">
          <div>Min: {{ data.attributes.min }}</div>
          <div>Max: {{ data.attributes.max }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Prices',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    data: Object,
  },
  }
</script>
