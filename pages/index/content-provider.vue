<template>
  <div :style="{ backgroundImage: `url(${image})` }" class="bg-cover h-full pb-10 bg-opacity-10">
    <div class="max-w-6xl mx-auto p-4 lg:px-8 xl:px-0">
      <div class="max-w-2xl mx-auto mt-10 bg-white rounded-md">
        <div class="flex justify-center text-gray-600 font-semibold text-xl md:p-6 p-4">
          {{ $t('registration-for-content-provider') }}
        </div>
        <main-register class="" />
        <ValidationObserver v-slot="{ handleSubmit, invalid }" slim>
          <form class="" novalidate @submit.prevent="handleSubmit(onSubmit)">
            <div class="grid grid-cols-2 bg-white rounded-md p-6 gap-4">
              <div class="flex justify-start col-span-2 text-gray-600 font-semibold text-xl">
                {{ $t('additional-information') }}
              </div>
              <div class="md:col-span-1 col-span-2">
                <label for="organization-name" class="block mb-1 text-sm font-medium text-gray-700">
                  {{ $t('organization-name') }}*</label
                >
                <ValidationProvider
                  v-slot="{ errors }"
                  name="organization_name"
                  rules="required"
                  mode="eager"
                >
                  <input
                    type="text"
                    name="organization_name"
                    id="organization_name"
                    v-model="company.name"
                    :disabled="!isMainRegister"
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
                        : company.name
                        ? 'border-green-600'
                        : 'border-gray-300'
                    "
                  />
                </ValidationProvider>
              </div>
              <div class="md:col-span-1 col-span-2">
                <label for="position" class="block mb-1 text-sm font-medium text-gray-700">{{
                  $t('position-at-organization')
                }}</label>
                <input
                  type="text"
                  name="position"
                  id="position"
                  v-model="company.position"
                  :disabled="!isMainRegister"
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
                />
              </div>
              <div class="md:col-span-1 col-span-2">
                <label for="phone" class="block mb-1 text-sm font-medium text-gray-700">{{
                  $t('phone')
                }}</label>
                <ValidationProvider
                  v-slot="{ errors }"
                  :rules="{ required: true, length: 16 }"
                  name="phone"
                  mode="eager"
                >
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    v-model="company.phone"
                    :disabled="!isMainRegister"
                    v-mask="'+##### ###-##-##'"
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
                        : company.phone
                        ? 'border-green-600'
                        : 'border-gray-300'
                    "
                  />
                </ValidationProvider>
              </div>
              <div class="md:col-span-1 col-span-2">
                <label for="email" class="block mb-1 text-sm font-medium text-gray-700">{{
                  $t('email')
                }}</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  v-model="company.email"
                  :disabled="!isMainRegister"
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
                />
              </div>
              <div class="col-span-2">
                <label for="summary" class="block mb-1 text-sm font-medium text-gray-700">{{
                  $t('short-summary')
                }}</label>
                <textarea
                  type="text"
                  name="summary"
                  id="summary"
                  rows="4"
                  v-model="company.shortinfo"
                  :disabled="!isMainRegister"
                  :placeholder="
                    $t(
                      'short-summary-of-agricultural-environmental-experience-and-activities-of-organization-in-Karakalpakstan'
                    )
                  "
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
                />
              </div>
              <div class="col-span-2">
                <label for="description" class="block mb-1 text-sm font-medium text-gray-700">{{
                  $t('short-description')
                }}</label>
                <textarea
                  type="text"
                  name="description"
                  id="description"
                  rows="4"
                  v-model="company.fullinfo"
                  :disabled="!isMainRegister"
                  :placeholder="
                    $t(
                      'short-description-of-organization-size-relationship-to-agricultural-environmental-sectors-in-Karakalpakstan'
                    )
                  "
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
                />
              </div>
              <ValidationProvider name="checked" rules="checked" mode="eager" v-slot="{ errors }">
                <div class="flex items-center mt-2 col-span-2">
                  <input
                    name="termsOfUse"
                    type="checkbox"
                    v-model="isAgree"
                    :value="true"
                    :disabled="!isMainRegister"
                    class="h-5 w-5 text-green-600 focus:ring-green-600 border-gray-300 rounded"
                  />
                  <label for="termsOfUse" class="ml-2 block text-gray-600 text-base">
                    {{ $t('i-agree-with') }}
                    <span class="text-green-600 border-b border-green-600">
                      {{ $t('terms-of-use') }}
                    </span>
                  </label>
                </div>
                <div class="text-red-500 text-xs">{{ errors[0] }}</div>
              </ValidationProvider>
              <button
                :class="invalid ? 'bg-gray-300' : 'bg-green-600 hover:bg-green-700 text-white'"
                :disabled="invalid"
                class="col-span-2 rounded-md py-3 mt-6"
              >
                {{ $t('register') }}
              </button>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import background from '/assets/images/background.png'
import axios from 'axios'
export default {
  name: 'UserInterprise',
  auth: false,
  data() {
    return {
      image: background,
      company: {
        name: '',
        tin: '',
        phone: '',
        email: '',
        activitytypes: [],
        agrocultureareas: [],
        users: [],
        district: null,
        shortinfo: '',
        fullinfo: '',
        position: '',
      },
      phone: '',
      auth: {
        identifier: 'zokirjonov@gmail.com',
        password: '123456',
      },
      jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzMsImlhdCI6MTY1OTI5Mjc3MywiZXhwIjoxNjYxODg0NzczfQ.veRGIxE_8coEnDIZnJXuUfBoK4J2HZDJNCR6BKgLCVo',
      isMainRegister: false,
      isAgree: false,
    }
  },
  mounted() {},
  watch: {
    phone: {
      handler() {
        if (this.phone) this.company.phone = this.phone.replace(/[^0-9]/g, '')
      },
      deep: true,
    },
  },
  methods: {
    mediaChange({ target }, type) {
      const formData = new FormData()
      formData.append('files', target.files[0])
      axios({
        baseURL: process.env.VUE_APP_BASE_URL,
        url: `/upload`,
        method: 'POST',
        data: formData,
        headers: {
          Authorization: `Bearer ${this.jwt}`,
        },
      }).then((res) => {
        if (type === 'resume') {
          this.additional.resume_url = res.data[0].url.substring(8)
          return
        }
      })
    },
    onSubmit() {
      axios({
        baseURL: process.env.VUE_APP_BASE_URL,
        url: `/companies`,
        method: 'POST',
        data: { data: this.company },
        headers: {
          Authorization: `Bearer ${this.jwt}`,
        },
      }).then(async (res) => {
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
              await this.$bridge.$emit('join_chat', {
                username: res.data.user.username,
                user_id: res.data.user.id,
              })
              this.loading = false
              await this.$snotify.success('Successfully Logged In')
              this.$router.push(this.localePath('/'))
            })
        } catch (e) {
          if (e.response) this.authError = e.response.data.error.message
          this.loading = false
        }
      })
    },
    mainRegisterSuccess(e) {
      this.isMainRegister = e.isSuccess
      this.auth.identifier = e.user.username
      this.auth.password = e.password
      this.company.users.push(e.user.id)
      this.jwt = e.jwt
    },
  },
}
</script>
