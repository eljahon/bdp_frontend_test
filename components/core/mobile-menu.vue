<template>
  <div class="p-5">
    <button
      class="text-white focus:outline-none text-sm rounded-md bg-green-700 p-3"
      @click="
        signIn()
        closePanel()
      "
    >
      {{ $t('login-register') }}
    </button>
    <div
      v-for="(menu, index) in navbar"
      :key="index"
      class="block my-5"
      :class="
        $route.path.search(menu.route) > 0
          ? 'text-base text-green-700 font-semibold'
          : 'text-gray-800 hover:text-green-700 font-medium text-base '
      "
      @click="closePanel()"
    >
      <router-link :to="{ path: localePath(menu.route) }">
        {{ $t(menu.name) }}
      </router-link>
    </div>
    <div class="block space-y-5 text-gray-700">
      <div class="flex items-center gap-2">
        <i class="bx bx-envelope lg:text-lg text-base"></i>
        <p class="text-sm"> juanjose.robalino@gggi.org</p>
      </div>
      <div class="flex items-center gap-2">
        <i class="bx bx-phone lg:text-lg text-base"></i>
        <p class="text-sm">+99894 081 23 45</p>
      </div>
      <div class="flex gap-2">
        <i class="bx bx-map lg:text-lg text-base"></i>
        <p class="text-sm">7a, Bunyodkor av., 100000, Tashkent, Uzbekistan</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MobileMenu',
  data() {
    return {
      navbar: [
        { name: 'about', route: '/about' },
        { name: 'e-learning', route: '/e-learning' },
        { name: 'agri-business', route: '/agri-business' },
        { name: 'agri-finance', route: '/agri-finance' },
        { name: 'agri-market', route: '/agri-market' },
        { name: 'advisory', route: '/advisory' },
      ],
    }
  },
  methods: {
    signIn() {
      this.$router.push({
        path: this.localePath('/login'),
      })
    },
    closePanel() {
      this.$emit('closePanel', {})
    },
  },
}
</script>
