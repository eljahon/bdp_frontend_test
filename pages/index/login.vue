<template>
  <div :style="{ backgroundImage: `url(${image})` }" class="bg-cover h-full pb-10 bg-opacity-10">
    <div class="max-w-6xl mx-auto p-4 lg:px-8 xl:px-0">
      <div class="max-w-xl mx-auto mt-10 md:p-10 p-6 bg-white rounded-md">
        <div class="flex justify-between">
          <div class="flex justify-between items-center mb-3">
            <div id="signin">
              <button
                :class="
                  $route.path.search('/login') > 0
                    ? 'text-green-700 border-b-2 border-green-700'
                    : 'text-gray-500 hover:text-green-700 hover:border-b-2 hover:border-green-700'
                "
                class="text-xl font-medium focus:outline-none"
              >
                {{ $t('login') }}
              </button>
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
        <ValidationObserver ref="observer" v-slot="{ passes, invalid }">
          <form @submit.prevent="passes(tryToLogIn)" class="space-y-3">
            <div class="mt-2">
              <ValidationProvider
                v-slot="{ valid, errors }"
                rules="required|phoneOrEmail"
                name="Username"
              >
                <input
                  name="text"
                  type="text"
                  autocomplete="text"
                  v-model="auth.identifier"
                  :placeholder="$t('email-or-phone')"
                  :state="errors[0] ? false : valid ? true : null"
                  required
                  class="
                    focus:outline-none
                    appearance-none
                    block
                    w-full
                    px-3
                    py-2
                    border border-gray-300
                    rounded-md
                    shadow-sm
                    placeholder-gray-400
                    sm:text-sm
                  "
                  :class="
                    errors.length > 0
                      ? 'border-red-400'
                      : auth.identifier
                      ? 'border-green-600'
                      : 'border-gray-300'
                  "
                />
                <div class="text-red-500 text-xs">{{ errors[0] }}</div>
              </ValidationProvider>
            </div>
            <div v-if="isPhone" class="mt-1">
              <label for="otp" class="block mb-1 text-sm font-medium text-gray-700">
                {{ $t('enter-confirm-code') }}</label
              >
              <ValidationProvider
                v-slot="{ errors }"
                name="otp"
                rules="required|min:4|max:4"
                mode="eager"
              >
                <input
                  name="otp"
                  type="text"
                  autocomplete="text"
                  v-model="otp"
                  :placeholder="$t('enter-confirm-code')"
                  required
                  class="
                    focus:outline-none
                    appearance-none
                    block
                    w-full
                    px-3
                    py-2
                    border
                    rounded-md
                    shadow-sm
                    placeholder-gray-400
                    sm:text-sm
                  "
                  :class="
                    errors.length > 0
                      ? 'border-red-400'
                      : otp
                      ? 'border-green-600'
                      : 'border-gray-300'
                  "
                />
                <div class="text-red-500 text-xs">{{ errors[0] }}</div>
              </ValidationProvider>
            </div>
            <div v-if="isPhone">
              <p :class="[timer === 'on' ? '' : 'hidden']" class="text-sm text-gray-500 mb-2">
                {{ $t('you-can-resend-code-after') }}
                <countdown
                  v-if="timer === 'on'"
                  class="text-primary font-semibold"
                  :end-time="timerMinutes"
                  @finish="onCountdownEnd"
                >
                  <template #process="scope">
                    <span class="ml-1">{{ scope.timeObj.m }} : {{ scope.timeObj.s }}</span>
                  </template>
                </countdown>
              </p>
            </div>
            <div class="mt-1" v-if="isEmail">
              <ValidationProvider v-slot="{ valid, errors }" rules="required|min:6" name="password">
                <input
                  name="password"
                  type="password"
                  v-model="auth.password"
                  :placeholder="$t('password')"
                  :state="errors[0] ? false : valid ? true : null"
                  required
                  class="
                    focus:outline-none
                    appearance-none
                    block
                    w-full
                    px-3
                    py-2
                    border border-gray-300
                    rounded-md
                    shadow-sm
                    placeholder-gray-400
                    sm:text-sm
                  "
                  :class="
                    errors.length > 0
                      ? 'border-red-400'
                      : auth.password
                      ? 'border-green-600'
                      : 'border-gray-300'
                  "
                />
                <div class="text-red-500 text-xs">{{ errors[0] }}</div>
              </ValidationProvider>
            </div>
            <div class="text-red-500 text-xs">{{ authError }}</div>
            <button
              :class="invalid ? 'bg-gray-300' : 'bg-green-600 hover:bg-green-700 text-white'"
              :disabled="invalid"
              type="submit"
              class="
                mt-3
                w-full
                flex
                justify-center
                px-4
                py-2
                border border-transparent
                rounded-md
                shadow-sm
                text-sm
                font-medium
                text-white
                focus:outline-none
              "
            >
              {{ $t('sign-in') }}
              <vue-loaders v-if="loading" name="ball-beat" color="white" scale="0.5" />
            </button>
            <div v-if="isPhone && times < 3" class="flex justify-center mt-3">
              <p class="text-gray-600 text-sm">
                {{ $t('did-not-get-code') }}
              </p>
              <button
                :class="[timer !== 'on' ? 'text-primary' : '']"
                :disabled="timer === 'on'"
                class="text-gray-400 text-sm ml-1 focus:outline-none"
                @click="resendCode()"
              >
                {{ $t('resend') }}
              </button>
            </div>
          </form>
        </ValidationObserver>
        <div class="flex items-center justify-center mt-2">
          <p class="text-gray-600 text-sm font-medium">{{ $t('do-not-have-an-account') }}</p>
          <button class="ml-2 text-yellow-600 text-sm font-medium focus:outline-none">
            {{ $t('register') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import background from '../../assets/images/background.png'
export default {
  name: 'Login',
  auth: false,
  props: {
    // eslint-disable-next-line vue/require-default-prop
    status: String,
  },
  data() {
    return {
      image: background,
      timer: 'off',
      timerMinutes: new Date().getTime() + 180000,
      times: 1,
      auth: {
        identifier: '',
        password: '',
      },
      authError: '',
      tryingToLogIn: false,
      isAuthError: false,
      loading: false,
      isEmail: false,
      isPhone: false,
      otp: '',
    }
  },
  watch: {
    'auth.identifier'() {
      const EMAILREG =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      const MOBILEREG = /^([+]?[9]{2}[8][0-9]{2}[0-9]{7})$/
      if (EMAILREG.test(this.auth.identifier)) {
        this.isPhone = false
        this.isEmail = true
      } else if (MOBILEREG.test(this.auth.identifier)) {
        this.sendOtp()
      } else {
        this.isEmail = false
        this.isPhone = false
      }
    },
    otp() {
      if (this.otp.length === 4) {
        // this.registerPhone()
      }
    },
  },
  methods: {
    resendCode() {
      this.$axios
        .$post('/users-permissions/send_otp', { phone: this.auth.identifier })
        .then((res) => {
          this.times++
          if (this.times === 2) {
            this.timerMinutes = new Date().getTime() + 240000
          } else if (this.times === 3) {
            this.timerMinutes = new Date().getTime() + 300000
          }
          this.timer = 'on'
        })
        .catch((error) => {
          this.$snotify.error(error)
        })
    },
    onCountdownEnd() {
      this.timer = 'off'
    },
    sendOtp() {
      this.$axios
        .$post('/users-permissions/send_otp', { phone: this.auth.identifier })
        .then((response) => {
          this.isPhone = true
          this.isEmail = false
          this.timer = 'on'
        })
        .catch((error) => {
          this.isPhone = false
          this.isEmail = false
          this.authError = error.response.data.message
        })
    },
    async tryToLogIn() {
      if (this.auth.identifier.includes('+') > 0) {
        this.auth.identifier = this.auth.identifier.substring(1)
      }
      this.authError = ''
      this.loading = true
      if (this.isEmail) {
        this.registerEmail()
      } else {
        this.registerPhone()
      }
    },
    async registerEmail() {
      this.$snotify.info('Logging in...')
      try {
        await this.$auth
          .loginWith('local', {
            data: this.auth,
          })
          .then(async (res) => {
            await this.$store
              .dispatch('getUsers', {
                link: '/users/me',
                query: {
                  populate: '*',
                },
              })
              .then((response) => {
                localStorage.setItem('user_info', JSON.stringify(response.data))
              })
            // await this.$bridge.$emit('join_chat', {
            //   username: res.data.user.username,
            //   user_id: res.data.user.id,
            // })
            this.loading = false
            this.$router.push(this.localePath('/'))
            await this.$snotify.success('Successfully Logged In')
          })
      } catch (e) {
        if (e.response) this.authError = e.response.data.error.message
        this.loading = false
      }
    },
    registerPhone() {
      this.$snotify.info('Logging in...')
      try {
        this.$axios
          .$post('/users-permissions/login_otp', { phone: this.auth.identifier, otp: this.otp })
          .then(async (res) => {
            console.log('User res', res)
            this.$auth.setUser(res.user)
            this.$auth.setUserToken(res.jwt)
            await this.$store
              .dispatch('getUsers', {
                link: '/users/me',
                query: {
                  populate: '*',
                },
              })
              .then((response) => {
                localStorage.setItem('user_info', JSON.stringify(response.data))
              })
            // await this.$bridge.$emit('join_chat', {
            //   username: res.user.username,
            //   user_id: res.user.id,
            // })
            this.loading = false
            this.$router.push(this.localePath('/'))
            await this.$snotify.success('Successfully Logged In')
          })
      } catch (e) {
        if (e.response) this.authError = e.response.data.error.message
        this.loading = false
      }
    },
  },
}
</script>
