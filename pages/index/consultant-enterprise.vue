<template>
  <div :style="{ backgroundImage: `url(${image})` }" class="bg-cover h-full pb-10 bg-opacity-10">
    <div class="max-w-6xl mx-auto p-4 lg:px-8 xl:px-0">
      <div class="max-w-2xl mx-auto mt-10 bg-white rounded-md">
        <div class="flex justify-center text-gray-600 font-semibold text-xl md:p-6 p-4">
          {{ $t('registration-for-consultant-enterprise') }}
        </div>
        <main-register @registerSuccess="mainRegisterSuccess" />
        <ValidationObserver v-if="isMainRegister" v-slot="{ handleSubmit, invalid }" slim>
          <form class="" novalidate @submit.prevent="handleSubmit(onSubmit)">
            <div class="grid grid-cols-2 bg-white rounded-md p-6 gap-4">
              <div class="flex justify-start col-span-2 text-gray-600 font-semibold text-xl">
                {{ $t('additional-information') }}
              </div>
              <div class="md:col-span-1 col-span-2">
                <label for="company-name" class="block mb-1 text-sm font-medium text-gray-700">
                  {{ $t('company-name') }}*</label
                >
                <ValidationProvider
                  v-slot="{ errors }"
                  name="company-name"
                  rules="required"
                  mode="eager"
                >
                  <input
                    type="text"
                    name="company-name"
                    id="company-name"
                    v-model="company.name"
                    class="focus:outline-none appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 sm:text-sm"
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
                <label for="tin" class="block mb-1 text-sm font-medium text-gray-700"
                  >{{ $t('tin') }}*</label
                >
                <ValidationProvider
                  v-slot="{ errors }"
                  name="tin"
                  :rules="{ required: true, min: 9, max: 9 }"
                  mode="eager"
                >
                  <input
                    type="text"
                    name="tin"
                    id="tin"
                    v-model="company.tin"
                    v-mask="'### ### ###'"
                    class="focus:outline-none appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 sm:text-sm"
                    :class="
                      errors.length > 0
                        ? 'border-red-400'
                        : company.tin
                        ? 'border-green-600'
                        : 'border-gray-300'
                    "
                  />
                </ValidationProvider>
              </div>
              <div class="md:col-span-1 col-span-2">
                <label for="activity-type" class="block mb-1 text-sm font-medium text-gray-700">{{
                  $t('area-of-consultancy')
                }}</label>
                <v-select
                  v-model="company.activitytypes"
                  :options="activities"
                  :disabled="!isMainRegister"
                  :searchable="false"
                  label="title"
                  value="id"
                  :reduce="(activity) => activity.id"
                  :multiple="true"
                ></v-select>
              </div>
              <div class="md:col-span-1 col-span-2">
                <label for="field" class="block mb-1 text-sm font-medium text-gray-700">{{
                  $t('area-of-agriculture-and-environment')
                }}</label>
                <v-select
                  v-model="company.agrocultureareas"
                  :options="agrocultureAreas"
                  :disabled="!isMainRegister"
                  :searchable="false"
                  label="title"
                  value="id"
                  :reduce="(agro) => agro.id"
                  :multiple="true"
                ></v-select>
              </div>
              <div class="col-span-2">
                <label for="experience" class="block mb-1 text-sm font-medium text-gray-700">{{
                  $t('experience-in-agriculture-and-environment')
                }}</label>
                <textarea
                  type="experience"
                  name="experience"
                  id="experience"
                  v-model="additional.experience"
                  rows="4"
                  class="focus:outline-none appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 sm:text-sm"
                />
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
                    :disabled="!isMainRegister"
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
                <ValidationProvider
                  v-slot="{ errors }"
                  name="district"
                  rules="required"
                  mode="eager"
                >
                  <select
                    v-model="company.district"
                    :disabled="districts.length === 0 || !isMainRegister"
                    name="option"
                    class="focus:outline-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 sm:text-sm"
                    :class="
                      errors.length > 0
                        ? 'border-red-400'
                        : company.disctict
                        ? 'border-green-600'
                        : 'border-gray-300'
                    "
                  >
                    <option
                      v-for="(district, index) in districts"
                      :key="index"
                      :value="district.id"
                    >
                      {{ district.attributes.name }}
                    </option>
                  </select>
                </ValidationProvider>
              </div>
              <div class="md:col-span-1 col-span-2">
                <label for="resume" class="block mb-1 text-sm font-medium text-gray-700"
                  >{{ $t('upload-resume') }}(PDF)*</label
                >
                <!-- <ValidationProvider v-slot="{ errors }" name="resume" rules="required" mode="eager" vid="file"> -->
                <input
                  class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
                  aria-describedby="file_input_help"
                  id="resume"
                  accept="application/pdf"
                  type="file"
                  ref="file"
                  @change="mediaChange($event, 'resume')"
                  :disabled="!isMainRegister"
                />
                <!-- </ValidationProvider> -->
              </div>
              <div class="md:col-span-1 col-span-2">
                <label for="phone" class="block mb-1 text-sm font-medium text-gray-700"
                  >{{ $t('phone') }}*</label
                >
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
                    v-model="phone"
                    v-mask="'+##### ###-##-##'"
                    class="focus:outline-none appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 sm:text-sm"
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

              <ValidationProvider name="checked" rules="checked" mode="eager" v-slot="{}">
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
import axios from 'axios'
import { mapGetters } from 'vuex'
import background from '/assets/images/background.png'
import consultantWarningModal from '~/components/modals/consultant-warning.vue'
export default {
  name: 'ConsultantEnterprise',
  auth: false,
  data() {
    return {
      image: background,
      phone: '',
      company: {
        name: '',
        tin: '',
        phone: '',
        email: '',
        activitytypes: [],
        agrocultureareas: [],
        users: [],
        district: null,
      },
      additional: {
        resume_url: null,
        diploma_url: null,
        last_degree: '',
        tin: '',
        experience_year: null,
        workplace: '',
      },
      auth: {
        identifier: '',
        password: '',
      },
      jwt: '',
      activities: [],
      agrocultureAreas: [],
      isMainRegister: true,
      isAgree: false,
      region: null,
      districts: [],
    }
  },
  mounted() {
    this.fetchDirectories()
  },
  computed: {
    ...mapGetters(['dataRegions']),
  },
  watch: {
    region() {
      if (this.region.id) {
        this.districts = this.region.attributes.districts.data
      }
    },
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
        axios({
          baseURL: process.env.VUE_APP_BASE_URL,
          url: `/additionalinfos`,
          method: 'POST',
          data: { data: this.additional },
          headers: {
            Authorization: `Bearer ${this.jwt}`,
          },
        }).then(async () => {
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
                    localStorage.setItem('user_info', JSON.stringify(response))
                  })
                // await this.$bridge.$emit('join_chat', {
                //   username: res.data.user.username,
                //   user_id: res.data.user.id,
                // })
                this.loading = false
                this.successfulModal()
                this.$router.push(this.localePath('/'))
              })
          } catch (e) {
            if (e.response) this.authError = e.response.data.error.message
            this.loading = false
          }
        })
      })
    },
    async fetchDirectories() {
      await this.$store
        .dispatch('getActivitytypes', {
          populate: '*',
          locale: this.$i18n.locale,
        })
        .then((res) => {
          this.activities = res.map((e) => {
            return {
              id:
                e.attributes.locale === 'en'
                  ? e.id
                  : this.$tools.getDefaultLanguageID(e.attributes.localizations.data),
              title: e.attributes.title,
            }
          })
        })
      await this.$store
        .dispatch('getAgrocultureareas', {
          populate: '*',
          locale: this.$i18n.locale,
        })
        .then((res) => {
          this.agrocultureAreas = res.map((e) => {
            return {
              id:
                e.attributes.locale === 'en'
                  ? e.id
                  : this.$tools.getDefaultLanguageID(e.attributes.localizations.data),
              title: e.attributes.title,
            }
          })
        })
      await this.$store.dispatch('getRegions', {
        populate: '*',
        locale: this.$i18n.locale,
      })
    },
    mainRegisterSuccess(e) {
      this.isMainRegister = e.isSuccess
      this.auth.identifier = e.user.username
      this.auth.password = e.password
      this.additional.user = e.user.id
      this.company.users.push(e.user.id)
      this.jwt = e.jwt
    },
    successfulModal() {
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
    },
  },
}
</script>
