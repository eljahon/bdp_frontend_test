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
          {{ $t('choose-your-type-of-activity') }}
        </div>
        <div class="grid md:grid-cols-3 grid-cols-2 gap-4">
          <div
            @click="toRegisterType('user')"
            class="border rounded-md border-gray-200 p-4 cursor-pointer hover:shadow-md"
          >
            <img :src="require('/assets/images/user.png')" alt="" />
            <div class="flex justify-center text-gray-600 text-sm font-semibold">
              {{ $t('user') }}
            </div>
          </div>
          <div
            @click="toRegisterType('consultant')"
            class="border rounded-md border-gray-200 p-4 cursor-pointer hover:shadow-md"
          >
            <img :src="require('/assets/images/consultant.png')" alt="" />
            <div class="flex justify-center text-gray-600 text-sm font-semibold">
              {{ $t('consultant') }}
            </div>
          </div>
          <div
            @click="toContentProvider()"
            class="border cursor-pointer rounded-md border-gray-200 p-4 hover:shadow-md"
          >
            <img :src="require('/assets/images/content.png')" alt="" />
            <div class="flex justify-center text-gray-600 text-sm font-semibold">
              {{ $t('content-provider') }}
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
      phoneOrEmail: '',
      isEmail: false,
      image: background,
      account: {
        name: '',
        surname: '',
        email: '',
        phone: '',
      },
      confirm_password: '',
      hidden: {
        password: true,
        confirm_password: true,
      },
      loading: false,
    }
  },
  watch: {
    phoneOrEmail() {
      const EMAILREG =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (EMAILREG.test(this.phoneOrEmail)) {
        this.isEmail = true
      } else {
        this.isEmail = false
      }
    },
  },
  methods: {
    toContentProvider() {
      this.$router.push({
        path: this.localePath('/content-provider'),
        query: {
          type: 'content-provider',
        },
      })
    },
    toRegisterType(type) {
      this.$router.push({
        path: this.localePath('/register-type'),
        query: {
            type
        },
      })
    },
    onSubmit() {
      const _user = { ...this.account }
      if (this.phoneOrEmail.includes('@') > 0) {
        _user.email = this.phoneOrEmail
        _user.username = this.phoneOrEmail
        delete _user.phone
      } else if (this.phoneOrEmail.includes('+') > 0) {
        _user.phone = this.phoneOrEmail.substring(1)
        _user.username = this.phoneOrEmail.substring(1)
        delete _user.email
        delete _user.password
      } else {
        _user.phone = this.phoneOrEmail.substring(1)
        _user.username = this.phoneOrEmail.substring(1)
        delete _user.email
        delete _user.password
      }
      this.$axios
        .post('/auth/local/register', _user)
        .then(async (data) => {
          if (this.isEmail) {
            this.$snotify.info('Logging in...')
            console.log(this.account, _user)
            await this.$auth
              .loginWith('local', {
                data: { identifier: _user.email, password: _user.password },
              })
              .then(async (res) => {
                await this.$auth.setToken('local', 'Bearer ' + res.data.jwt)
                // await this.$auth.setRefreshToken('local', res.data.refresh)
                await this.$axios.setHeader('Authorization', 'Bearer ' + res.data.jwt)
                await this.$auth.ctx.app.$axios.setHeader('Authorization', 'Bearer ' + res.data.jwt)
                localStorage.setItem('user_info', JSON.stringify(res.data.user))
                await this.$auth.setUser(res.data.user)
                // this.$bridge.$emit('join_chat', {
                //   username: res.data.user.username,
                //   user_id: res.data.user.id,
                // })
                await this.$snotify.success('Successfully Logged In')
                this.loading = false
              })
              .catch((e) => {
                this.loading = false
                this.$snotify.error(e.response.data.detail);
                this.$sentry.captureException(error)

              })
            return
          }
          if (data.data === false) {
            this.confirmCode({ username: this.user.phone, isOtpSuccess: false, isLogin: null })
            return
          }
          this.confirmCode({ username: data.data.user.phone, isOtpSuccess: null, isLogin: null })
          // eslint-disable-next-line no-console
        })
        .catch((e) => {
          this.$sentry.captureException(error)

        })
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
  },
}
</script>
