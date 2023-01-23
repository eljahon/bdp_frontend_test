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
          <form @submit.prevent="passes(onSubmit)" class="space-y-3">
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
                  :placeholder="$t('phone')"
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
                <div class="relative flex items-stretch flex-grow focus-within:z-10">
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
                      rounded-none
                      rounded-l-md
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
                  <button
                    type="button"
                    @click="tryToLogin"
                    class="
                      -ml-px
                      relative
                      inline-flex
                      items-center
                      space-x-2
                      px-4
                      py-2
                      border
                      text-sm
                      font-medium
                      rounded-r-md
                    "
                    :class="
                      invalid
                        ? 'text-gray-700 bg-gray-100 hover:bg-gray-200 border-gray-600'
                        : 'text-white focus:outline-none text-sm bg-green-700 p-3'
                    "
                  >
                    <span>{{ $t('confirm') }}</span>
                  </button>
                </div>
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
<!--            //password-->
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
              </ValidationProvider>
            </div>
            <!-- <div class="text-red-500 text-xs">{{ authError }}</div> -->
            <button
              v-if="!isPhoneOtpPending"
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
                :class="[timer !== 'on' ? 'text-yellow-600' : '']"
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
          <button @click="reg" class="ml-2 text-yellow-600 text-sm font-medium focus:outline-none">
            {{ $t('register') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import background from '../../assets/images/background.png'
import consultantWarningModal from '~/components/modals/consultant-warning'
const EMAILREG =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const MOBILEREG = /^([+]?[9]{2}[8][0-9]{2}[0-9]{7})$/
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
      isPhoneOtpPending: false,
    }
  },
  watch: {
    'auth.identifier'() {
      if (MOBILEREG.test(this.auth.identifier)) {
        this.isPhone = false
        this.isEmail = true
      }
      // else {
      //   this.isEmail = false
      //   this.isPhone = false
      // }
      this.isPhoneOtpPending = false
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
          this.$sentry.captureException(error)
        })
    },
    onCountdownEnd() {
      this.timer = 'off'
    },
    reg () {
      this.$router.push({path: this.localePath('/rest-password')})
    },
    sendOtp() {
      this.isPhoneOtpPending = true
      this.$axios
        .$post('/users-permissions/send_otp', { phone: this.auth.identifier })
        .then((response) => {
          this.isPhone = true
          this.isEmail = false
          this.timer = 'on'
          this.isPhoneOtpPending = true
        })
        .catch((error) => {
          let authError = error.response.data.error.details[0].messages[0].message
          if (authError === 'User is not confirmed.') {
            this.consultantWarningModal()
          }
          if (authError === 'User is not defined.') {
            this.$router.push(this.localePath('/register'))
          }
          this.isPhone = false
          this.isEmail = false
          this.$sentry.captureException(error)
          this.isPhoneOtpPending = false
        })
    },
    async onSubmit() {
      // if (this.auth.identifier.includes('+') > 0) {
      //   this.auth.identifier = this.auth.identifier.substring(1)
      // }
      // if (MOBILEREG.test(this.auth.identifier)) {
      //   this.sendOtp()
      //   return
      // }
      this.tryToLogin()
    },
    async registerEmail() {
      this.$snotify.info('Logging in...')
      try {
        await this.$auth
          .loginWith('local', {
            data: this.auth,
          })
          .then(async (res) => {
            this.afterLoginProcess()
          })
      } catch (e) {
        if (e.response) this.authError = e.response.data.error.message
        this.loading = false
        this.$sentry.captureException(e)
      }
    },
    tryToLogin() {
      this.loading = true
      if (this.isEmail) {
        this.registerEmail()
      } else {
        this.registerPhone()
      }
    },
    registerPhone() {
      this.$snotify.info('Logging in...')
      try {
        this.$axios
          .$post('/users-permissions/login_otp', { phone: this.auth.identifier, otp: this.otp })
          .then(async (res) => {
            this.$auth.setUser(res.user)
            this.$auth.setUserToken(res.jwt)
            this.afterLoginProcess()
          })
      } catch (e) {
        if (e.response) this.authError = e.response.data.error.message
        this.loading = false
        this.$sentry.captureException(e)
      }
    },
    async afterLoginProcess() {
      let user = {}
      await this.$store
        .dispatch('getUsers', {
          link: '/users/me',
          query: {
            populate: '*',
          },
        })
        .then((response) => {
          localStorage.setItem('user_info', JSON.stringify(response))
          user = response
        })
      this.loading = false
      if (this.$route.query.from === 'consultant' && user.role.id !== 4) {
        this.$router.push({
          path: this.localePath('/chats'),
          query: { room_id: 'new', consultant_id: this.$route.query.consultant },
        })
      } else {
        this.$router.push(this.localePath('/'))
      }
      if(user.confirmed === false) {
        this.consultantWarningModal()
      } else {
        await this.$snotify.success('Successfully Logged In')
      }
    },
    consultantWarningModal() {
      this.$modal.show(
        consultantWarningModal,
        {
          title: 'Successful',
        },
        {
          height: 'auto',
          maxWidth: 400,
          width: window.innerWidth <= 400 ? window.innerWidth - 30 : 400,
          scrollable: true,
          clickToClose: true,
        }
      )
    }
  },
}
</script>
