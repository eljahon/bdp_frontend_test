<template>
  <div :style="{ backgroundImage: `url(${image})` }" class="bg-cover h-full pb-10 bg-opacity-10">
    <div class="max-w-6xl mx-auto p-4 lg:px-8 xl:px-0">
      <div class="max-w-2xl mx-auto mt-10 bg-white rounded-md">
        <div class="flex justify-center text-gray-600 font-semibold text-xl md:p-6 p-4">
          {{ $t('registration-for-consultant-individual') }}
        </div>
        <main-register class="" @registerSuccess="mainRegisterSuccess" />
        <ValidationObserver v-slot="{ handleSubmit, invalid }" slim>
        <!-- <ValidationObserver v-if="isMainRegister" v-slot="{ handleSubmit, invalid }" slim> -->
          <form class="" novalidate @submit.prevent="handleSubmit(onSubmit)">
            <div class="grid grid-cols-2 bg-white rounded-md p-6 gap-4">
              <div class="flex justify-start col-span-2 text-gray-600 font-semibold text-xl">
                {{ $t('additional-information') }}
              </div>
              <div class="md:col-span-1 col-span-2">
                <label for="activity-type" class="block mb-1 text-sm font-medium text-gray-700">{{
                  $t('area-of-consultancy')
                }}</label>
                <v-select
                  v-model="form.activitytypes"
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
                  v-model="form.agrocultureareas"
                  :options="agrocultureAreas"
                  :disabled="!isMainRegister"
                  :searchable="false"
                  label="title"
                  value="id"
                  :reduce="(agro) => agro.id"
                  :multiple="true"
                ></v-select>
              </div>
              <div class="md:col-span-1 col-span-2" v-if='is_otherone'>
                <label for="workplace" class="block mb-1 text-sm font-medium text-gray-700">{{
                    $t('area-of-consultancy') + '  other'

                  }}</label>
                <ValidationProvider
                  v-slot="{ errors }"
                  name="workplace"
                  rules="required"
                  mode="eager"
                >
                  <input
                    type="text"
                    name="workplace"
                    id="workplace"
                    v-model="additional.otherarea"
                    class="focus:outline-none appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 sm:text-sm"
                    :disabled="!isMainRegister"
                    :class="
                      errors.length > 0
                        ? 'border-red-400'
                        : form.workplace
                        ? 'border-green-600'
                        : 'border-gray-300'
                    "
                  />
                </ValidationProvider>
              </div>
              <div class="md:col-span-1 col-span-2" v-if='is_othertwo'>
                <label for="workplace" class="block mb-1 text-sm font-medium text-gray-700">{{
                    $t('area-of-agriculture-and-environment') + '  other'

                  }}</label>
                <ValidationProvider
                  v-slot="{ errors }"
                  name="workplace"
                  rules="required"
                  mode="eager"
                >
                  <input
                    type="text"
                    name="workplace"
                    id="workplace"
                    v-model="additional.otherarea"
                    class="focus:outline-none appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 sm:text-sm"
                    :disabled="!isMainRegister"
                    :class="
                      errors.length > 0
                        ? 'border-red-400'
                        : form.workplace
                        ? 'border-green-600'
                        : 'border-gray-300'
                    "
                  />
                </ValidationProvider>
              </div>
              <div class="md:col-span-1 col-span-2">
                <label for="workplace" class="block mb-1 text-sm font-medium text-gray-700">{{
                    $t('workplace')
                  }}</label>
                <ValidationProvider
                  v-slot="{ errors }"
                  name="workplace"
                  mode="eager"
                >
                  <input
                    type="text"
                    name="workplace"
                    id="workplace"
                    v-model="additional.workplace"
                    class="focus:outline-none appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 sm:text-sm"
                    :disabled="!isMainRegister"
                    :class="
                      errors.length > 0
                        ? 'border-red-400'
                        : form.workplace
                        ? 'border-green-600'
                        : 'border-gray-300'
                    "
                  />
                </ValidationProvider>
              </div>
              <div class="mt-1">
                <label for="degree" class="block text-sm mb-1 font-medium text-gray-700"
                  >{{ $t('last-received-degree') }}*</label
                >
                <select
                  v-model="additional.last_degree"
                  name="option"
                  class="focus:outline-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 sm:text-sm border-gray-300"
                  :disabled="!isMainRegister"
                >
                  <option v-for="(degree, index) in degrees" :key="index" :value="degree">
                    {{ degree }}
                  </option>
                </select>
              </div>
              <div class="md:col-span-1 col-span-2">
                <label for="experience" class="block mb-1 text-sm font-medium text-gray-700">{{
                  $t('experience')
                }}</label>
                <input
                  name="experience"
                  id="experience"
                  type="number"
                  :min="0"
                  :max="80"
                  v-model="additional.experience_year"
                  :disabled="!isMainRegister"
                  class="focus:outline-none appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 sm:text-sm"
                />
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
                    v-model="additional.tin"
                    :disabled="!isMainRegister"
                    v-mask="'#########'"
                    class="focus:outline-none appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 sm:text-sm"
                    :class="
                      errors.length > 0
                        ? 'border-red-400'
                        : form.tin
                        ? 'border-green-600'
                        : 'border-gray-300'
                    "
                  />
                </ValidationProvider>
              </div>
              <div class="md:col-span-1 col-span-2">
                <label for="resume" class="block mb-1 text-sm font-medium text-gray-700"
                  >{{ $t('upload-resume') }}(PDF)*(Word)</label
                >
                <!-- <ValidationProvider v-slot="{ errors }" name="resume" rules="required" mode="eager" vid="file"> -->
                <input
                  class="focus:outline-none appearance-none block w-full px-3 py-1 border rounded-md shadow-sm placeholder-gray-400 sm:text-sm border-gray-300"
                  aria-describedby="file_input_help"
                  id="resume"
                  accept="application/pdf,.doc,.docx,application/msword"
                  type="file"
                  ref="file"
                  @change="mediaChange($event, 'resume')"
                  :disabled="!isMainRegister"
                />
                <!-- </ValidationProvider> -->
              </div>
              <div class="md:col-span-1 col-span-2">
                <label for="diploma" class="block mb-1 text-sm font-medium text-gray-700"
                  >{{ $t('upload-diploma') }}(PDF)*</label
                >
                <!-- <ValidationProvider
                  v-slot="{ errors }"
                  name="diploma"
                  rules="required"
                  vid="file"
                  mode="eager"
                > -->
                <input
                  class="focus:outline-none appearance-none block w-full px-3 py-1 border rounded-md shadow-sm placeholder-gray-400 sm:text-sm border-gray-300"
                  aria-describedby="file_input_help"
                  id="diploma"
                  accept="application/pdf"
                  type="file"
                  ref="file"
                  @change="mediaChange($event, 'diploma')"
                  :disabled="!isMainRegister"
                />
                <!-- </ValidationProvider> -->
              </div>
              <br>

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
import { mapGetters } from 'vuex'
import background from '/assets/images/background.png'
import consultantWarningModal from '~/components/modals/consultant-warning.vue'
import axios from 'axios'
export default {
  name: 'ConsultantIndividual',
  auth: false,
  watch: {
    'form.activitytypes': function(newValue) {
      console.log(newValue, '====>>')
      if (newValue.includes(23) ) {
        this.is_otherone = true;
      } else {
        this.is_otherone = false;
      }
    },
    "form.agrocultureareas":
      function(newValue) {
        console.log(newValue, '====>>')
        if (newValue.includes(14) ) {
          this.is_othertwo = true;
        } else {
          this.is_othertwo = false;
        }
      },
  },
  data() {
    return {
      image: background,
      additional: {
        resume_url: null,
        diploma_url: null,
        last_degree: '',
        tin: '',
        otherarea: '',
        experience_year: null,
        workplace: '',
      },
      form: {
        activitytypes: [],
        agrocultureareas: [],
      },
      auth: {
        identifier: '',
        password: '',
      },
      activities: [],
      agrocultureAreas: [],
      jwt: '',
      isMainRegister: false,
      is_otherone: false,
      is_othertwo: false,
      isAgree: false,
      degrees: [this.$t('high-school'), this.$t('bachelor-degree'), this.$t('master-degree'), this.$t('PhD')],
    }
  },
  mounted() {
    this.fetchDirectories()
  },
  computed: {
    ...mapGetters(['dataGenders', 'dataRegions']),
  },
  methods: {
    onSubmit() {
      let _form = { ...this.form }
      delete _form.id
      this.additional.user = this.form.id
      axios({
        baseURL: process.env.VUE_APP_BASE_URL,
        url: `/users/${this.form.id}`,
        method: 'PUT',
        data: _form,
        headers: {
          Authorization: `Bearer ${this.jwt}`,
        },
      }).then((res) => {
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
        if (type === 'diploma') {
          this.additional.diploma_url = res.data[0].url.substring(8)
          return
        }
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
    },
    mainRegisterSuccess(e) {
      this.isMainRegister = e.isSuccess
      this.auth.identifier = e.user.username
      this.auth.password = e.password
      this.form.id = e.user.id
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
