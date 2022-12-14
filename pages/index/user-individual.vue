<template>
  <div :style='{ backgroundImage: `url(${image})` }' class='bg-cover h-full pb-10 bg-opacity-10'>
    <div class='max-w-6xl mx-auto p-4 lg:px-8 xl:px-0'>
      <div class='max-w-2xl mx-auto mt-10 bg-white rounded-md'>
        <div class='flex justify-center text-gray-600 font-semibold text-xl md:p-6 p-4'>
          {{ $t('registration-for-user-individual') }}
        </div>
        <main-register class='' @registerSuccess='mainRegisterSuccess' />
        <ValidationObserver v-if='isMainRegister' v-slot='{ handleSubmit, invalid }' slim>
          <form class='' novalidate @submit.prevent='handleSubmit(onSubmit)'>
            <div class='grid md:grid-cols-2 grid-cols-1 md:p-6 p-4 gap-4'>
              <div class='flex justify-start col-span-2 text-gray-600 font-semibold text-xl'>
                {{ $t('additional-information') }}
              </div>
              <div class='md:col-span-1 col-span-2'>
                <label for='phone' class='block mb-1 text-sm font-medium text-gray-700'>{{
                    $t('phone')
                  }}</label>
                <input
                  type='text'
                  name='phone'
                  id='phone'
                  v-model='phone'
                  :disabled='!isMainRegister'
                  v-mask="'+##### ###-##-##'"
                  class='
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
                  '
                  :class="'border-gray-300'"
                />
              </div>
              <div class='md:col-span-1 col-span-2'>
                <label for='birthday' class='block mb-1 text-sm font-medium text-gray-700'>{{
                    $t('date-of-birth')
                  }}</label>
                <input
                  type='text'
                  name='birthday'
                  id='birthday'
                  placeholder='MM/DD/YYY'
                  v-mask="'##/##/####'"
                  v-model='form.birthday'
                  :disabled='!isMainRegister'
                  class='
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
                  '
                  :class="'border-gray-300'"
                />
              </div>
              <div class='md:col-span-1 col-span-2'>
                <label for='activity-type' class='block mb-1 text-sm font-medium text-gray-700'>{{
                    $t('activity-type')
                  }}</label>
                <v-select
                  v-model='form.activitytypes'
                  :options='activities'
                  :disabled='!isMainRegister'
                  :searchable='false'
                  label='title'
                  value='id'
                  :reduce='(activity) => activity.id'
                  :multiple='true'
                ></v-select>
              </div>
              <div class='md:col-span-1 col-span-2'>
                <label for='field' class='block mb-1 text-sm font-medium text-gray-700'>{{
                    $t('field-of-agriculture')
                  }}</label>
                <v-select
                  v-model='form.agrocultureareas'
                  :options='agrocultureAreas'
                  :disabled='!isMainRegister'
                  :searchable='false'
                  label='title'
                  value='id'
                  :reduce='(agro) => agro.id'
                  :multiple='true'
                ></v-select>
              </div>
              <div class='md:col-span-1 col-span-2' v-if='is_otherone'>
                <label for='workplace' class='block mb-1 text-sm font-medium text-gray-700'>{{
                    $t('activity-type') + '  other'

                  }}</label>
                <ValidationProvider
                  v-slot='{ errors }'
                  name='workplace'
                  rules='required'
                  mode='eager'
                >
                  <input
                    type='text'
                    name='workplace'
                    id='workplace'
                    v-model='form.otherarea'
                    class='focus:outline-none appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 sm:text-sm'
                    :disabled='!isMainRegister'
                    :class="
                      errors.length > 0
                        ? 'border-red-400'
                        : form.otherarea
                        ? 'border-green-600'
                        : 'border-gray-300'
                    "
                  />
                </ValidationProvider>
              </div>
              <div class='md:col-span-1 col-span-2' v-if='is_othertwo'>
                <label for='workplace' class='block mb-1 text-sm font-medium text-gray-700'>{{
                    $t('field-of-agriculture') + '  other'

                  }}</label>
                <ValidationProvider
                  v-slot='{ errors }'
                  name='workplace'
                  rules='required'
                  mode='eager'
                >
                  <input
                    type='text'
                    name='workplace'
                    id='workplace'
                    v-model='form.env_otherarea'
                    class='focus:outline-none appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 sm:text-sm'
                    :disabled='!isMainRegister'
                    :class="
                      errors.length > 0
                        ? 'border-red-400'
                        : form.env_otherarea
                        ? 'border-green-600'
                        : 'border-gray-300'
                    "
                  />
                </ValidationProvider>
              </div>
              <ValidationProvider name='checked' rules='checked' mode='eager' v-slot='{}'>
                <div class='flex items-center mt-2 col-span-2'>
                  <input
                    name='termsOfUse'
                    type='checkbox'
                    v-model='isAgree'
                    :value='true'
                    :disabled='!isMainRegister'
                    class='h-5 w-5 text-green-600 focus:ring-green-600 border-gray-300 rounded'
                  />
                  <label for='termsOfUse' class='ml-2 block text-gray-600 text-base'>
                    {{ $t('i-agree-with') }}
                    <span class='text-green-600 border-b border-green-600'>
                      {{ $t('terms-of-use') }}
                    </span>
                  </label>
                </div>
              </ValidationProvider>
              <button
                :class="invalid ? 'bg-gray-300' : 'bg-green-600 hover:bg-green-700 text-white'"
                :disabled='invalid'
                class='col-span-2 rounded-md bg-gray-300 py-3 mt-6'
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
import successfulModal from '~/components/modals/successful'
import img from '~/assets/images/Uz.jpg'
import axios from 'axios'

export default {
  name: 'UserIndividual',
  auth: false,
  data() {
    return {
      image: background,
      isMainRegister: false,
      isAgree: false,
      is_otherone: false,
      is_othertwo: false,
      phone: '',
      form: {
        phone: '',
        birthday: '',
        activitytypes: [],
        agrocultureareas: [],
        otherarea: null,
        env_otherarea: null
      },
      auth: {
        identifier: '',
        password: ''
      },
      activities: [],
      agrocultureAreas: [],
      jwt: ''
    }
  },
  mounted() {
    this.fetchDirectories()
  },
  computed: {},
  watch: {
    // form: {
    //   handler() {},
    //   deep: true,
    // },
    'form.activitytypes':
      function(newValue) {
        if (newValue.includes(23)) {
          this.is_otherone = true
        } else {
          this.is_otherone = false
        }
      },
    'form.agrocultureareas': function(newValue) {
      if (newValue.includes(23)) {
        this.is_othertwo = true
      } else {
        this.is_othertwo = false
      }
    },
    phone: {
      handler() {
        if (this.phone) this.form.phone = this.phone.replace(/[^0-9]/g, '')
      },
      deep: true
    }
  },
  methods: {
    checkOther(arr) {
      if (arr.length === 1 && arr.includes(23)) {
        arr = []
        return arr
      } else {
        if (arr.length !== 1 && arr.includes(23)) return arr.filter(el => el !== 23)
      }
      return arr
    },
    onSubmit() {
      let _form = {
        ...this.form,
        activitytypes: this.checkOther(this.form.activitytypes),
        agrocultureareas: this.checkOther(this.form.agrocultureareas)
      }
      delete _form.id
      axios({
        baseURL: process.env.VUE_APP_BASE_URL,
        url: `/users/${this.form.id}`,
        method: 'PUT',
        data: _form,
        headers: {
          Authorization: `Bearer ${this.jwt}`
        }
      }).then(async (res) => {
        try {
          await this.$auth
            .loginWith('local', {
              data: this.auth
            })
            .then(async (res) => {
              await this.$store
                .dispatch('getUsers', {
                  link: '/users/me',
                  query: {
                    populate: '*'
                  }
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
    },
    successfulModal() {
      this.$modal.show(
        successfulModal,
        {
          title: 'Successful'
        },
        {
          height: 'auto',
          maxWidth: 400,
          width: window.innerWidth <= 400 ? window.innerWidth - 30 : 400,
          scrollable: true,
          clickToClose: true
        }
      )
    },
    mainRegisterSuccess(e) {
      this.isMainRegister = e.isSuccess
      this.auth.identifier = e.user.username
      this.auth.password = e.password
      this.form.phone = e.user.phone
      this.phone = e.user.phone
      this.form.id = e.user.id
      this.jwt = e.jwt
    },
    async fetchDirectories() {
      await this.$store
        .dispatch('getActivitytypes', {
          populate: '*',
          locale: this.$i18n.locale
        })
        .then((res) => {
          this.activities = res.map((e) => {
            return {
              id:
                e.attributes.locale === 'en'
                  ? e.id
                  : this.$tools.getDefaultLanguageID(e.attributes.localizations.data),
              title: e.attributes.title
            }
          })
          this.activities.push({
            id: 23,
            title: this.$t('other')
          })
        })
      await this.$store
        .dispatch('getAgrocultureareas', {
          populate: '*',
          locale: this.$i18n.locale
        })
        .then((res) => {
          this.agrocultureAreas = res.map((e) => {
            return {
              id:
                e.attributes.locale === 'en'
                  ? e.id
                  : this.$tools.getDefaultLanguageID(e.attributes.localizations.data),
              title: e.attributes.title
            }
          })
          this.agrocultureAreas.push({
            id: 23,
            title: this.$t('other')
          })
        })
    }
  }
}
</script>
