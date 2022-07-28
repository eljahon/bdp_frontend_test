<template>
  <div class="space-y-3">
    <ValidationObserver v-slot="{ handleSubmit }" slim>
      <form class="" novalidate @submit.prevent="handleSubmit(onSubmit)">
        <div class="grid md:grid-cols-2 grid-cols-1 md:px-6 px-4 gap-4">
          <div class="mt-1">
              <label for="firstname" class="block mb-1 text-sm font-medium text-gray-700">
                  {{ $t('firstname') }}*</label
                >
            <ValidationProvider v-slot="{ errors }" name="firstname" rules="required" mode="eager">
              <input
                name="firstname"
                autocomplete="text"
                :placeholder="$t('firstname')"
                v-model="account.name"
                required
                class="focus:outline-none appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 sm:text-sm"
               :class="
                      errors.length > 0
                        ? 'border-red-400'
                        : account.name
                        ? 'border-green-600'
                        : 'border-gray-300'
                    "
              />
            </ValidationProvider>
          </div>
          <div class="mt-1">
              <label for="lastname" class="block mb-1 text-sm font-medium text-gray-700">
                  {{ $t('lastname') }}*</label
                >
            <ValidationProvider v-slot="{ errors }" name="lastname" rules="required" mode="eager">
              <input
                name="lastname"
                autocomplete="text"
                :placeholder="$t('lastname')"
                v-model="account.surname"
                required
                class="focus:outline-none appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 sm:text-sm"
                 :class="
                      errors.length > 0
                        ? 'border-red-400'
                        : account.surname
                        ? 'border-green-600'
                        : 'border-gray-300'
                    "
              />
            </ValidationProvider>
          </div>
          <div class="mt-1">
              <label for="phone" class="block mb-1 text-sm font-medium text-gray-700">
                  {{ $t('phone') }}*</label
                >
            <ValidationProvider
              v-slot="{ errors }"
              name="phoneOrEmail"
              rules="required|phoneOrEmail"
              mode="eager"
            >
              <input
                name="phoneOrEmail"
                type="text"
                autocomplete="text"
                v-model="phoneOrEmail"
                :placeholder="$t('email-or-phone')"
                required
                class="focus:outline-none appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 sm:text-sm"
                 :class="
                      errors.length > 0
                        ? 'border-red-400'
                        : phoneOrEmail
                        ? 'border-green-600'
                        : 'border-gray-300'
                    "
              />
            </ValidationProvider>
          </div>
          <div class="mt-1">
              <label for="password" class="block mb-1 text-sm font-medium text-gray-700">
                  {{ $t('password') }}*</label
                >
            <ValidationProvider
              v-slot="{ errors }"
              name="password"
              rules="required|min:6"
              mode="eager"
            >
              <input
                name="password"
                :type="hidden.password ? 'password' : 'text'"
                autocomplete="text"
                v-model="account.password"
                :placeholder="$t('password')"
                required
                class="focus:outline-none appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 sm:text-sm"
                 :class="
                      errors.length > 0
                        ? 'border-red-400'
                        : account.password
                        ? 'border-green-600'
                        : 'border-gray-300'
                    "
              />
            </ValidationProvider>
          </div>
          <div class="mt-1" v-if="isEmail">
              <label for="password" class="block mb-1 text-sm font-medium text-gray-700">
                  {{ $t('confirm-password') }}*</label
                >
            <ValidationProvider
              v-slot="{ errors }"
              name="confirmPassword"
              :rules="{ required: true, samePassword: account.password }"
              mode="eager"
            >
              <input
                v-model="confirm_password"
                name="confirm_password"
                :type="hidden.confirm_password ? 'password' : 'text'"
                :placeholder="$t('confirm-password')"
                required
                class="focus:outline-none appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 sm:text-sm"
                 :class="
                      errors.length > 0
                        ? 'border-red-400'
                        : confirm_password
                        ? 'border-green-600'
                        : 'border-gray-300'
                    "
              />
            </ValidationProvider>
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
export default {
  name: 'Register',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    status: String,
  },
  data() {
    return {
      phoneOrEmail: '',
      isEmail: false,
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
                this.$bridge.$emit('join_chat', {
                  username: res.data.user.username,
                  user_id: res.data.user.id,
                })
                await this.$snotify.success('Successfully Logged In')
                this.loading = false
                this.onClose()
              })
              .catch((e) => {
                this.loading = false
                this.$snotify.error(e.response.data.detail)
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
          console.error(e)
        })
    },
  },
}
</script>
