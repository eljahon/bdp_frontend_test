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
                :disabled="isRegisterSuccess"
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
                :disabled="isRegisterSuccess"
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
            <label for="gender" class="block text-sm mb-1 font-medium text-gray-700"
              >{{ $t('gender') }}*</label
            >
            <ValidationProvider
              v-slot="{ errors }"
              name="gender"
              rules="required"
              mode="eager"
            >
              <select
                v-model="account.gender"
                name="option"
                class="focus:outline-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 sm:text-sm"
                :disabled="isRegisterSuccess"
                :class="
                  errors.length > 0
                    ? 'border-red-400'
                    : account.gender
                    ? 'border-green-600'
                    : 'border-gray-300'
                "
              >
                <option v-for="(gender, index) in genders" :key="index" :value="gender.id">
                  {{ gender.name }}
                </option>
              </select>
            </ValidationProvider>
          </div>
          <div class="mt-1">
            <label for="region" class="block text-sm mb-1 font-medium text-gray-700"
              >{{ $t('region') }}*</label
            >
            <ValidationProvider v-slot="{ errors }" name="region" rules="required" mode="eager">
              <select
                v-model="region"
                name="option"
                class="focus:outline-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 sm:text-sm"
                :disabled="isRegisterSuccess"
                :class="
                  errors.length > 0
                    ? 'border-red-400'
                    : region
                    ? 'border-green-600'
                    : 'border-gray-300'
                "
              >
                <option v-for="(region, index) in dataRegions" :key="index" :value="region">
                  {{ region.attributes.name }}
                </option>
              </select>
            </ValidationProvider>
          </div>
          <div class="mt-1">
            <label for="district" class="block text-sm mb-1 font-medium text-gray-700"
              >{{ $t('district') }}*</label
            >
            <ValidationProvider v-slot="{ errors }" name="district" rules="required" mode="eager">
              <select
                v-model="account.district"
                :disabled="districts.length === 0 || isRegisterSuccess"
                name="option"
                class="focus:outline-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 sm:text-sm"
                :class="
                  errors.length > 0
                    ? 'border-red-400'
                    : account.disctict
                    ? 'border-green-600'
                    : 'border-gray-300'
                "
              >
                <option v-for="(district, index) in districts" :key="index" :value="district.id">
                  {{ district.attributes.name }}
                </option>
              </select>
            </ValidationProvider>
          </div>
          <div class="mt-1">
            <label for="phone" class="block mb-1 text-sm font-medium text-gray-700">
              {{ $t('username') }}*</label
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
                :disabled="isRegisterSuccess"
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
          <div v-if="isPhone && isRegisterPending" class="mt-1">
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
                class="focus:outline-none appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 sm:text-sm"
                :class="
                  errors.length > 0
                    ? 'border-red-400'
                    : otp
                    ? 'border-green-600'
                    : 'border-gray-300'
                "
              />
            </ValidationProvider>
          </div>
          <div v-if="isEmail" class="mt-1">
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
                :disabled="isRegisterSuccess"
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
                :disabled="isRegisterSuccess"
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
import { throwStatement } from '@babel/types'
import { mapGetters } from 'vuex'
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
      isPhone: false,
      isRegisterPending: false,
      isRegisterSuccess: false,
      otp: '',
      genders: [],
      account: {
        name: '',
        surname: '',
        email: '',
        phone: '',
        gender: null,
        district: null,
        role: null,
        confirmed: true,
      },
      region: null,
      districts: [],
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
      const MOBILEREG = /^([+]?[9]{2}[8][0-9]{2}[0-9]{7})$/
      if (EMAILREG.test(this.phoneOrEmail)) {
        this.isPhone = false
        this.isEmail = true
      } else if (MOBILEREG.test(this.phoneOrEmail)) {
        this.isPhone = true
        this.isEmail = false
        this.onSubmit()
      } else {
        this.isEmail = false
      }
    },
    region() {
      if (this.region.id) {
        this.districts = this.region.attributes.districts.data
      }
    },
    confirm_password() {
      if (this.account.password === this.confirm_password) {
        this.onSubmit()
      }
    },
    otp() {
      if (this.otp.length === 4) {
        this.confirmOtp()
      }
    },
  },
  computed: {
    ...mapGetters(['dataGenders', 'dataRegions']),
  },
  mounted() {
    if (this.$route.path.includes('/user')) {
      this.account.role = this.$const.role.authenticated
      this.account.confirmed = true
    }
    if (this.$route.path.includes('/consultant')) {
      this.account.role = this.$const.role.consultant
      this.account.confirmed = false
    }
    if (this.$route.path.includes('/content-provider')) {
      this.account.role = this.$const.role.contentprovider
      this.account.confirmed = false
    }
    console.log('Account: ', this.account)
    this.fetchDirectories()
  },
  methods: {
    confirmOtp() {
      this.$axios
        .$post('/users-permissions/register_confirm_otp', {
          phone: this.account.username,
          otp: this.otp,
        })
        .then(async (data) => {
          this.isRegisterPending = false
          this.isRegisterSuccess = true
          this.$emit('registerSuccess', {
            isSuccess: true,
            user: data.user,
            password: this.account.password,
            jwt: data.jwt,
          })
          return
        })
        .catch((e) => {
          this.isRegisterPending = false
          this.isRegisterSuccess = false
          console.log(e.response.data.error.message)
        })
    },
    onSubmit() {
      const _user = { ...this.account }
      if (this.phoneOrEmail.includes('@') > 0) {
        _user.email = this.phoneOrEmail
        _user.username = this.phoneOrEmail
        this.account.username = _user.username
        delete _user.phone
      } else if (this.phoneOrEmail.includes('+') > 0) {
        _user.phone = this.phoneOrEmail.substring(1)
        _user.username = this.phoneOrEmail.substring(1)
        _user.email = `${_user.phone}@gmail.com`
        _user.password = _user.name + 123456
        this.account.username = _user.username
        this.account.password = _user.password
      } else {
        _user.phone = this.phoneOrEmail
        _user.username = this.phoneOrEmail
        _user.password = _user.name + 123456
        _user.email = `${_user.phone}@gmail.com`
        this.account.username = _user.username
        this.account.password = _user.password
      }
      if (this.isEmail) {
        this.registerEmail(_user)
      } else if (this.isPhone) {
        this.registerPhone(_user)
      }
    },
    registerEmail(user) {
      this.$axios
        .$post('/auth/local/register', user)
        .then(async (data) => {
          this.isRegisterPending = false
          this.isRegisterSuccess = true
          this.$emit('registerSuccess', {
            isSuccess: true,
            user: data.user,
            password: this.account.password,
            jwt: data.jwt,
          })
          return
        })
        .catch((e) => {
          this.isRegisterPending = false
          this.isRegisterSuccess = false
          console.log(e.response.data.error.message)
        })
    },
    registerPhone(user) {
      this.$axios
        .$post('/users-permissions/register_otp', user)
        .then(async (data) => {
          this.isRegisterPending = true
          this.isRegisterSuccess = true
          return
        })
        .catch((e) => {
          this.isRegisterPending = false
          this.isRegisterSuccess = false
          console.log(e.response.data.error.message)
        })
    },
    async fetchDirectories() {
      await this.$store
        .dispatch('getGenders', {
          populate: '*',
          locale: this.$i18n.locale,
        })
        .then((res) => {
          this.genders = res.map((e) => {
            return {
              id:
                e.attributes.locale === 'en'
                  ? e.id
                  : this.$tools.getDefaultLanguageID(e.attributes.localizations.data),
              name: e.attributes.name,
            }
          })
        })
      await this.$store.dispatch('getRegions', {
        populate: '*',
        locale: this.$i18n.locale,
      })
    },
  },
}
</script>
