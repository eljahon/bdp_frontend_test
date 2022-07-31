<template>
  <div :style="{ backgroundImage: `url(${image})` }" class="bg-cover h-full pb-10 bg-opacity-10">
    <div class="max-w-6xl mx-auto p-4 lg:px-8 xl:px-0">
      <div class="max-w-xl mx-auto mt-10 md:p-10 p-6 bg-white rounded-md">
        <div class="flex justify-between">
          <div class="flex justify-between items-center mb-3">
            <div id="signin">
              <router-link
                :to="localePath('/login')"
                :class="
                  $route.path.search('/login') > 0
                    ? 'text-green-700 border-b-2 border-green-700'
                    : 'text-gray-500 hover:text-green-700 hover:border-b-2 hover:border-green-700'
                "
                class="text-xl font-medium focus:outline-none"
              >
                {{ $t('login') }}
              </router-link>
            </div>

            <div id="register">
              <router-link
                :to="localePath('/register')"
                :class="
                  $route.path.search('/register') > 0
                    ? 'text-green-700 border-b-2 border-green-700'
                    : 'text-gray-500 hover:text-green-700 hover:border-b-2 hover:border-green-700'
                "
                class="text-xl font-medium ml-6 focus:outline-none"
              >
                {{ $t('registration') }}
              </router-link>
            </div>
          </div>
        </div>

        <div class="flex justify-center my-4 text-gray-600 font-semibold">
          {{ $t('how-will-you-use-the-platform') }}
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div
            @click="toEnterprise()"
            class="border rounded-md cursor-pointer border-gray-200 p-4 hover:shadow-md"
          >
            <img :src="require('/assets/images/enterprise.png')" alt="" />
            <div class="flex justify-center text-gray-600 text-sm font-semibold">
              {{ $t('as-an-enterprise') }}
            </div>
          </div>
          <div
            @click="toIndividual()"
            class="border rounded-md cursor-pointer border-gray-200 p-4 hover:shadow-md"
          >
            <img :src="require('/assets/images/individual.png')" alt="" />
            <div class="flex justify-center text-gray-600 text-sm font-semibold">
              {{ $t('as-an-individual') }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import background from '../../assets/images/background.png'
export default {
  name: 'Register',
  auth: false,
  props: {
    // eslint-disable-next-line vue/require-default-prop
    status: String,
    type: String,
  },
  data() {
    return {
        image: background,
    }
  },
  methods: {
    toEnterprise() {
      if (this.$route.query.type === 'user') {
        this.$router.push({
          path: this.localePath('/user-enterprise'),
          query: {
            type: 'user',
          },
        })
      } else
        this.$router.push({
          path: this.localePath('/consultant-enterprise'),
          query: {
            type: 'consultant',
          },
        })
      this.onClose()
    },
    toIndividual() {
      if (this.$route.query.type === 'user') {
        this.$router.push({
          path: this.localePath('/user-individual'),
          query: {
            type: 'user',
          },
        })
      } else
        this.$router.push({
          path: this.localePath('/consultant-individual'),
          query: {
            type: 'consultant',
          },
        })
      this.onClose()
    },
    openSignIn() {
      this.$emit('close')
      this.$modal.show(
        signInModal,
        { status: 'sign-in' },
        {
          height: 'auto',
          maxWidth: 400,
          width: window.innerWidth <= 350 ? window.innerWidth - 10 : 350,
          acrollable: true,
        }
      )
    },
    onClose(e) {
      this.$emit('close')
      this.$root.$emit('sign-in', e)
    },
  },
}
</script>
