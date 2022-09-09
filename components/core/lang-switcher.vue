<template>
  <div class="lang-switcher flex">
    <div class="flex justify-end items-center">
      <img class="w-6 h-6" :src='localeImage[$i18n.locale]' alt=''>
    <select
      v-model="locale"
      class="text-sm p-2 bg-transparent w-10/12  rounded-md focus:outline-none"
      @change="onChange(locale)"
    >
      <option
        v-for="(lang, index) in $i18n.locales"
        :key="index"
        :value="lang.code"
        class="text-gray-700 rounded-md border shadow-md mt-3"
      >
          {{ lang.name }}
      </option>
    </select>
    </div>
    </div>

<!--  </div>-->
</template>

<script>
// import BaseDropdown from '../ui/BaseDropdown.vue'
import en from '~/assets/images/En.png'
import ka from '~/assets/images/Ka.png'
import ru from '~/assets/images/Ru_75x56.png'
import uz from '~/assets/images/Uz.png'
export default  {
  name: 'LangSwitcher',
  components: {
    // BaseDropdown,
  },
  data() {
    return {
      locale: this.$i18n.locale,
      localeImage: {
        uz: uz,
        kl: ka,
        ru: ru,
        en: en
      }
    }
  },
  methods: {
    onChange(event) {
      this.$router.push(this.switchLocalePath(event))
    },
  },
  mounted() {
  }
}
</script>
