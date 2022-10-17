<template>
  <div class="space-y-3">
    <ValidationObserver v-slot="{ handleSubmit, invalid, valid }" slim>
      <form class="" novalidate @submit.prevent="handleSubmit(onSubmit)">
        <div class="grid md:grid-cols-2 grid-cols-1 md:px-6 px-4 pb-4 md:pb-6 gap-4">
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
            <ValidationProvider v-slot="{ errors }" name="gender" rules="required" mode="eager">
              <select
                v-model="account.gender"
                name="option"
                class="
                  focus:outline-none
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
           <div class="mt-1" v-if="$route.query.type === 'consultant' " >
            <label for="region" class="block text-sm mb-1 font-medium text-gray-700"
              >{{ $t('region') }}*</label
            >
            <ValidationProvider v-slot="{ errors }" name="region" rules="required" mode="eager">
              <select
                v-model="account.region"
                name="option"
                class="
                  focus:outline-none
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
                :disabled="isRegisterSuccess"
                :class="
                  errors.length > 0
                    ? 'border-red-400'
                    : region
                    ? 'border-green-600'
                    : 'border-gray-300'
                "
              >
                <option v-for="(region, index) in dataRegions" :key="index" :value="region.id">
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
                class="
                  focus:outline-none
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
          <!-- <div class="md:col-span-1"></div> -->
          <div class="mt-1">
            <label for="phone" class="block mb-1 text-sm font-medium text-gray-700">
              {{ $t('phone') }}*</label
            >
            <ValidationProvider
              v-slot="{ errors }"
              name="phone"
              rules="required|phone"
              mode="eager"
            >
              <input
                name="phone"
                type="text"
                autocomplete="text"
                v-model="account.phone"
                placeholder="+998931234567"
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
<!--          <div class="md:col-span-1 col-span-2">-->
<!--            <label for="email" class="block mb-1 text-sm font-medium text-gray-700">{{-->
<!--                $t('email') + '*'-->
<!--              }}</label>-->
<!--            <ValidationProvider v-slot="{ errors }" name="gender" rules="required" mode="eager">-->

<!--              <input-->
<!--                type="email"-->
<!--                name="email"-->
<!--                id="email"-->
<!--                v-model="account.email"-->
<!--                :class="-->
<!--                  errors.length > 0-->
<!--                    ? 'border-red-400'-->
<!--                    : account.email-->
<!--                    ? 'border-green-600'-->
<!--                    : 'border-gray-300'-->
<!--                "-->
<!--                class="focus:outline-none appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 sm:text-sm"-->
<!--              />-->
<!--            </ValidationProvider>-->
<!--          </div>-->
          <div class="mt-1">
            <label for="password" class="block mb-1 text-sm font-medium text-gray-700">
              {{ $t('password') }}*</label
            >
            <ValidationProvider
              v-slot="{ errors }"
              name="password"
              rules="required|min:1"
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
          <div v-if="isPhoneConfirmPending" class="mt-1">
          <!-- <div class="mt-1"> -->
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
                    rounded-none rounded-l-md
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
                  @click="confirmOtp"
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
                      ? 'text-gray-700 bg-gray-100 hover:bg-gray-200 border-gray-100 hover:border-gray-200'
                      : 'text-white focus:outline-none text-sm bg-green-700 p-3'
                  "
                >
                  <span>{{ $t('confirm') }}</span>
                </button>
              </div>
              <div class="md:col-span-1"></div>
              <div v-if="isPhoneConfirmPending">
                <span :class="[timer === 'on' ? '' : 'hidden']" class="text-sm text-gray-500 mb-2">
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
                </span>
                <span
                  v-if="timer === 'off'"
                  :class="[timer === 'off' ? 'text-yellow-600' : 'text-gray-400']"
                  class="text-sm ml-1 focus:outline-none cursor-pointer"
                  @click="resendCode()"
                >
                  {{ $t('resend') }}
                </span>
              </div>
            </ValidationProvider>
          </div>
          <button
            v-if="!isPhoneConfirmPending && !isRegisterSuccess "
            type="submit"
            class="
              md:col-span-2
              col-span-1
              text-center
              px-2.5
              py-1.5
              border
              borxder-transparent
              font-medium
              rounded
            "
            :class="
              invalid
                ? 'text-gray-700 bg-gray-100 hover:bg-gray-200 border-gray-100 hover:border-gray-200 focus:ring-gray-500'
                : 'text-white focus:outline-none text-sm bg-green-700 p-3'
            "
            :disabled="invalid"
          >
            {{ $t('submit') }}
          </button>
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
      timer: 'off',
      timerMinutes: new Date().getTime() + 180000,
      times: 1,
      phoneOrEmail: '',
      isEmail: false,
      isPhone: false,
      isPhoneConfirmPending: false,
      isRegisterSuccess: false,
      is_confirm: false,
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
        region: null,
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
      } else {
        this.isEmail = false;
        this.isPhone = true

      }
    },
    account: {
      handler() {
        this.isPhone = false;
        this.isEmail = true;
        this.isPhoneConfirmPending = false
        this.timer = 'off'
      },
      deep: true,
    },
    region() {
      if (this.region.id) {
        this.districts = this.region.attributes.districts.data
      }
    }, "account.region"(oldvalue) {
      if (this.$route.query.type === 'consultant') {
        this.districts = this.dataRegions.find(el => el.id === oldvalue)?.attributes.districts.data
      }
    },
    confirm_password(oldvalue) {
      if (this.account.password === this.confirm_password) {
        this. is_confirm = true;
      }
    },
    otp() {},
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
    this.fetchDirectories()
  },
  methods: {
    onCountdownEnd() {
      this.timer = 'off'
    },
   async fetchGenders () {
      await this.$store
        .dispatch('getDistricts', {
          populate: '*',
          // 'filters[$and][0][region][id]': locale ?? 18,
          locale: this.$i18n.locale,
        })
        .then((res) => {
          this.districts = res
        })
    },
    resendCode() {
      this.$axios
        .$post('/users-permissions/resend_otp', { phone: this.account.username })
        .then((res) => {
          this.times++
          if (this.times === 2) {
            this.timerMinutes = new Date().getTime() + 50000
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
    confirmOtp() {
      this.$axios
        .$post('/users-permissions/register_confirm_otp', {
          phone: this.account.username,
          otp: this.otp,
        })
        .then(async (data) => {
          this.isPhoneConfirmPending = false
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
          this.isPhoneConfirmPending = false
          this.isRegisterSuccess = false
        })
    },
    onSubmit() {
      const _user = { ...this.account }
      if (this.phoneOrEmail.includes('@') > 0) {
        _user.email = this.phoneOrEmail
        _user.username = this.phoneOrEmail
        this.account.username = _user.username
        delete _user.phone
      } else
        if (this.phoneOrEmail.includes('+') > 0) {
        _user.phone = this.phoneOrEmail.substring(1)
        _user.username = this.phoneOrEmail.substring(1)
        _user.email = `${_user.phone}@gmail.com`
        // _user.password = _user.name + 123456
        this.account.username = _user.username
        this.account.password = _user.password
      } else {
        _user.phone = this.phoneOrEmail
        _user.username = this.account.phone
        // _user.password = _user.name + 123456
        _user.email = `${this.account.phone}@gmail.com`
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
          this.isRegisterSuccess = false
        })
    },
    registerPhone(user) {
      this.$axios
        .$post('/users-permissions/register_otp', user)
        .then(async (data) => {
          this.isPhoneConfirmPending = true
          this.timer = 'on'
          return
        })
        .catch((e) => {
          this.isPhoneConfirmPending = false
          this.isRegisterSuccess = false
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
     await this.fetchGenders()
      if (this.$route.query.type === 'consultant') {
        await this.$store.dispatch('getRegions', {
          populate: '*',
          locale: this.$i18n.locale,
        })
          .then(res => {
          })
      }

    },
  },
}
</script>
