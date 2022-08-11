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
    <!-- <div
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
    </div> -->
    <div v-for="(menu, index) in navbar" :key="index" class="flex items-center">
      <div v-if="menu.children">
        <div class="block my-3">
          <a
            :class="
              $route.path.search(menu.route) > 0
                ? 'text-base text-green-700 font-semibold'
                : 'text-gray-800 hover:text-green-700 font-medium text-base '
            "
            @click="
              menuWithChildClicked(menu)
            "
          >
            {{ $t(menu.name) }}
            <i
              class="text-gray-800 text-xl"
              :class="[menu.current ? menu.iconUp : menu.iconDown]"
            />
          </a>
        </div>
        <div v-for="(child, k) in menu.children" v-show="menu.current" :key="k" class="pb-3">
          <div
            v-if="child.route"
            class="block"
            :class="
              child.current
                ? 'cursor-pointer text-gray-800 px-4 text-sm font-medium rounded-md'
                : 'cursor-pointer text-gray-800 px-4 text-sm font-medium rounded-md'
            "
            @click="
              menuChildClicked(menu, child)
              closePanel()
            "
          >
            {{ $t(child.name) }}
          </div>
        </div>
      </div>
      <div
        v-else
        class="block my-3"
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
    </div>
    <div class="block space-y-5 text-gray-700">
      <div class="flex items-center gap-2">
        <i class="bx bx-envelope lg:text-lg text-base"></i>
        <p class="text-sm">juanjose.robalino@gggi.org</p>
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
        {
          id: 1,
          name: 'about',
          route: '/about',
          current: false,
          iconDown: 'bx bx-chevron-down',
          iconUp: 'bx bx-chevron-up',
        },
        {
          id: 2,
          name: 'e-learning',
          route: '/e-learning',
          current: false,
          iconDown: 'bx bx-chevron-down',
          iconUp: 'bx bx-chevron-up',
        },
        {
          id: 3,
          name: 'agri-business',
          route: '/agri-business',
          current: false,
          iconDown: 'bx bx-chevron-down',
          iconUp: 'bx bx-chevron-up',
        },
        {
          id: 4,
          name: 'agri-finance',
          route: '/agri-finance',
          current: false,
          iconDown: 'bx bx-chevron-down',
          iconUp: 'bx bx-chevron-up',
        },
        {
          id: 5,
          name: 'agri-market',
          iconDown: 'bx bx-chevron-down',
          iconUp: 'bx bx-chevron-up',
          children: [
            { name: 'weekly-prices', route: '/agri-market', current: false },
            { name: 'marketplace', route: '/marketplace', current: false },
          ],
          current: false,
        },
        {
          id: 6,
          name: 'advisory',
          route: '/advisory',
          current: false,
          iconDown: 'bx bx-chevron-down',
          iconUp: 'bx bx-chevron-up',
        },
      ],
    }
  },
  methods: {
    menuChildClicked(menu, child) {
      menu.children.forEach((ch) => {
        if (child === ch) {
          ch.current = true
        } else {
          ch.current = false
        }
      })
      this.$router.push(this.localePath(child.route))
      return child
    },
    menuWithChildClicked(menu) {
      this.navbar.forEach((navbar) => {
        if (menu === navbar) {
          navbar.current = !navbar.current
          navbar.children.forEach((child) => {
            child.current = false
          })
        } else {
          navbar.current = false
        }
      })
      return menu
    },
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
