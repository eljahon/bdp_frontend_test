<template>
  <div class="lg:col-span-1 col-span-4 flex overflow-hidden w-full">
    <!-- <div class="fixed inset-0 hidden" role="dialog" aria-modal="true">
      <div class="fixed inset-0 bg-opacity-75" aria-hidden="true" />
      <div class="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4">
        <div class="absolute top-0 right-0 -mr-12 pt-2">
          <button
            class="
              ml-1
              flex
              items-center
              justify-center
              h-10
              w-10
              rounded-full
              focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white
            "
            @click="showHideMenu"
          >
            <span class="sr-only">Close sidebar</span>
            <svg
              class="h-6 w-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div class="mt-5 flex-1 h-0 overflow-y-auto">
          <nav class="flex-1 px-2 py-4 b space-y-1">
            <div v-for="(item, key) in sidebar" :key="key">
              <div v-if="item.children ">
                <a
                  class="
                    cursor-pointer
                    group
                    flex
                    items-center
                    px-2
                    py-2
                    text-base
                    font-medium
                    rounded-md
                  "
                  @click="menuWithChildClicked(item)"
                >
                  <span :class="item.current ? 'text-green-500' : 'text-gray-700'">{{
                    item.title[$i18n.locale]
                  }}</span>
                  <font-awesome-icon
                    class="ml-4 flex-shrink-0 h-6 w-6"
                    :class="item.current ? 'text-green-500' : 'text-gray-700'"
                    :icon="item.current ? 'chevron-up' : 'chevron-down'"
                  />
                </a>
                <div v-for="(child, k) in item.children" v-show="item.current" :key="k">
                  <div v-if="!child.hide || child.hide == null">
                    <a
                    :to="child.route"
                    :class="
                      child.current
                        ? 'cursor-pointer  text-white group flex items-center px-2 py-2 text-base font-medium rounded-md'
                        : 'cursor-pointer text-gray-300  hover:text-white group flex items-center px-2 py-2 text-base font-medium rounded-md'
                    "
                    @click="menuChildClicked(item, child)"
                  >
                    {{ child.title[$i18n.locale] }}
                  </a>
                  </div>
                </div>
              </div>
              <a
                v-else-if="!item.hide || item.hide === null"
                :class="
                  item.current
                    ? 'cursor-pointer  text-white group flex items-center px-2 py-2 text-base font-medium rounded-md'
                    : 'cursor-pointer text-gray-300  hover:text-white group flex items-center px-2 py-2 text-base font-medium rounded-md'
                "
                @click="menuClicked(item)"
              >
                {{ item.title[$i18n.locale] }}
              </a>
            </div>
          </nav>
        </div>
      </div>

      <div class="flex-shrink-0 w-14" aria-hidden="true" />
    </div> -->

    <!-- Static sidebar for desktop -->
    <div class="flex flex-shrink-0 border shadow-md w-full">
      <div class="flex flex-col w-full">
        <div class="flex flex-col h-0 flex-1">
          <div class="flex-1 flex flex-col overflow-y-auto w-full">
            <nav class="flex-1 bg-white px-2">
              <div
                class="
                  cursor-pointer
                  group
                  flex
                  items-center
                  px-2
                  py-2
                  text-sm
                  font-medium
                  rounded-md
                "
                :class="
                  locale.current
                    ? 'text-green-600 hover:text-green-600'
                    : 'text-gray-500 hover:text-gray-700'
                "
                @click="menuClicked(locale)"
              >
                {{ $t(locale.name[$i18n.locale]) }}
              </div>
              <div v-for="(item, key) in sidebar" :key="key" class="border-b">
                <div v-if="item.attributes.children">
                  <div
                    class="flex cursor-pointer justify-between"
                    @click="menuWithChildClicked(item)"
                  >
                    <a
                      class="
                        cursor-pointer
                        group
                        flex
                        items-center
                        px-2
                        py-2
                        text-sm
                        font-medium
                        rounded-md
                      "
                      :class="
                        item.current
                          ? 'text-green-600 hover:text-green-600'
                          : 'text-gray-500 hover:text-gray-700'
                      "
                    >
                      {{ item.attributes.title }}
                    </a>
                    <div v-if="item.attributes.children.data.length > 0" class="flex cursor-pointer justify-end items-center">
                      <i
                        class="mx-4 h-4 w-4 bx"
                        :class="item.current ? 'bx bx-chevron-up' : 'bx bx-chevron-down'"
                      />
                    </div>
                  </div>
                  <div v-for="(child, k) in item.attributes.children.data" v-show="item.current === true" :key="k">
                    <div v-if="child">
                      <a
                        :to="child.route"
                        class="
                          cursor-pointer
                          ml-4
                          group
                          flex
                          items-center
                          px-2
                          py-2
                          text-sm
                          font-medium
                          rounded-md
                        "
                        :class="
                          child.current
                            ? 'text-green-600 hover:text-green-600'
                            : 'text-gray-500 hover:text-gray-700'
                        "
                        @click="menuChildClicked(item, child)"
                      >
                        {{ child.attributes.title }}
                      </a>
                    </div>
                  </div>
                </div>
                <div
                  v-else
                  class="
                    cursor-pointer
                    group
                    flex
                    items-center
                    px-2
                    py-2
                    text-sm
                    font-medium
                    rounded-md
                  "
                  :class="
                    item.current
                      ? 'text-green-600 hover:text-green-600'
                      : 'text-gray-500 hover:text-gray-700'
                  "
                  @click="menuClicked(item)"
                >
                  {{ item.attributes.title }}
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'Sidebar',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      locale: {
        created_at: '2021-11-11T23:25:16.744559+05:00',
        id: 0,
        name: { uz: 'Hammasi', ru: 'Все', en: 'All' },
        children: [],
        current: false,
        status: true,
        updated_at: '2021-11-11T23:25:16.744646+05:00'
      }
    }
  },
  computed: {
    ...mapState({
      
    }),
    ...mapGetters({
      sidebar: 'sidebar',
    })
  },
  mounted () {
    if (this.$route.path.length <= this.name.length + 4 || this.$route.path.search('all') > -1) {
      this.menuClicked(this.locale)
    }
  },
  methods: {
    showHideMenu () {
      this.showMenuInMobile = !this.showMenuInMobile
    },
    menuChildClicked (item, child) {
      const sidebar = JSON.parse(JSON.stringify(this.sidebar))
      sidebar.forEach((el) => {
        if (el.id === item.id) {
          return item.attributes.children.data.forEach((ch) => {
            if (child === ch) {
              ch.current = true
            } else {
              ch.current = false
            }
            this.locale.current = false
          })
        }
      })
      this.$store.dispatch('changeSidebar', sidebar)
      this.$router.push({
        path: this.localePath(`${this.$route.path.slice(0, this.name.length + 4)}`),
        query: this.checkQuery(item, child)
      })
    },
    menuWithChildClicked (item) {
      let sidebar =  JSON.parse(JSON.stringify(this.sidebar))
      sidebar.forEach((menu) => {
        if (menu.id === item.id) {
          menu.current = !menu.current
          menu.attributes.children.data.forEach((child) => {
            child.current = false
          })
        } else {
          menu.current = false
        }
      })
      this.locale.current = false
      this.$store.dispatch('changeSidebar', sidebar)
    },
    menuClicked (item) {
      const sidebar = JSON.parse(JSON.stringify(this.sidebar))
      if (item.id === 0) {
        this.locale.current = !this.locale.current
      }
      sidebar.forEach((menu) => {
        if (item === menu) {
          menu.current = item.id !== 0
        } else {
          menu.current = false
        }
      })
      this.$store.dispatch('changeSidebar', sidebar)
      this.$router.push({
        path: this.localePath(`${this.$route.path.slice(0, this.name.length + 4)}`),
        query: this.checkQuery(item, {})
      })
    },
    checkQuery (parent, child) {
      if (parent.count === 0) {
        return {
          category: parent.id
        }
      }
      if (Object.keys(child).length > 0) {
        return {
          category: child.id,
        }
      }
      return {
        category: parent.id,
      }
    }
  }
}
</script>
