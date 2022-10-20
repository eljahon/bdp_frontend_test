<template>
  <div :style='{ backgroundImage: `url(${image})` }' class='bg-cover h-full pb-10 bg-opacity-10'>
    <div class='max-w-6xl mx-auto p-4 lg:px-8 xl:px-0'>
      <div class='max-w-2xl mx-auto mt-10 bg-white rounded-md'>
        <div class='md:p-6 p-4'>
          <div class='flex justify-center text-gray-600 font-semibold text-xl'>
            {{ $t('registration-for-user-enterprise') }}
          </div>
          <div class='flex justify-center text-gray-600 font-semibold text-sm'>
            {{ $t('company-representative-information') }}
          </div>
        </div>
        <main-register @registerSuccess='mainRegisterSuccess' />
        <ValidationObserver v-if='isMainRegister' v-slot='{ handleSubmit, invalid }' slim>
          <form class='' novalidate @submit.prevent='handleSubmit(onSubmit)'>
            <div class='grid md:grid-cols-2 grid-cols-1 md:p-6 p-4 gap-4'>
              <div class='flex justify-start col-span-2 text-gray-600 font-semibold text-xl'>
                {{ $t('additional-information') }}
              </div>
              <div class='md:col-span-1 col-span-2'>
                <label for='company-name' class='block mb-1 text-sm font-medium text-gray-700'>
                  {{ $t('company-name') }}*</label
                >
                <ValidationProvider
                  v-slot='{ errors }'
                  name='company-name'
                  rules='required'
                  mode='eager'
                >
                  <input
                    type='text'
                    name='company-name'
                    id='company-name'
                    v-model='form.name'
                    :disabled='!isMainRegister'
                    class='focus:outline-none appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 sm:text-sm'
                    :class="
                      errors.length > 0
                        ? 'border-red-400'
                        : form.name
                        ? 'border-green-600'
                        : 'border-gray-300'
                    "
                  />
                </ValidationProvider>
              </div>
              <div class='md:col-span-1 col-span-2'>
                <label for='tin' class='block mb-1 text-sm font-medium text-gray-700'
                >{{ $t('tin') }}*</label
                >
                <ValidationProvider
                  v-slot='{ errors }'
                  name='tin'
                  :rules='{ required: true, min: 9, max: 9 }'
                  mode='eager'
                >
                  <input
                    type='text'
                    name='tin'
                    id='tin'
                    :disabled='!isMainRegister'
                    v-model='form.tin'
                    v-mask="'#########'"
                    class='focus:outline-none appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 sm:text-sm'
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
                  class='focus:outline-none appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 sm:text-sm border-gray-300'
                />
              </div>
              <div class='md:col-span-1 col-span-2'>
                <label for='email' class='block mb-1 text-sm font-medium text-gray-700'>{{
                    $t('email')
                  }}</label>
                <input
                  type='email'
                  name='email'
                  id='email'
                  v-model='form.email'
                  :disabled='!isMainRegister'
                  class='focus:outline-none appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 sm:text-sm'
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
              <div class='mt-1'>
                <label for='region' class='block text-sm mb-1 font-medium text-gray-700'
                >{{ $t('region') }}*</label
                >
                <ValidationProvider v-slot='{ errors }' name='region' rules='required' mode='eager'>
                  <select
                    v-model='region'
                    name='option'
                    class='focus:outline-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 sm:text-sm'
                    :disabled='!isMainRegister'
                    :class="
                      errors.length > 0
                        ? 'border-red-400'
                        : region
                        ? 'border-green-600'
                        : 'border-gray-300'
                    "
                  >
                    <option v-for='(region, index) in dataRegions' :key='index' :value='region'>
                      {{ region.attributes.name }}
                    </option>
                  </select>
                </ValidationProvider>
              </div>
              <div class='mt-1'>
                <label for='district' class='block text-sm mb-1 font-medium text-gray-700'
                >{{ $t('district') }}*</label
                >
                <ValidationProvider
                  v-slot='{ errors }'
                  name='district'
                  rules='required'
                  mode='eager'
                >
                  <select
                    v-model='form.district'
                    :disabled='districts.length === 0 || !isMainRegister'
                    name='option'
                    class='focus:outline-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 sm:text-sm'
                    :class="
                      errors.length > 0
                        ? 'border-red-400'
                        : form.disctict
                        ? 'border-green-600'
                        : 'border-gray-300'
                    "
                  >
                    <option
                      v-for='(district, index) in districts'
                      :key='index'
                      :value='district.id'
                    >
                      {{ district.attributes.name }}
                    </option>
                  </select>
                </ValidationProvider>
              </div>
              <div class='md:col-span-1 col-span-2' v-if='is_otherone'>
                <label for='workplace' class='block mb-1 text-sm font-medium text-gray-700'>{{
                    $t('activity-type') + ' other'

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
                class='col-span-2 rounded-md py-3 mt-6'
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
import MainRegister from '~/components/MainRegister.vue'
import background from '/assets/images/background.png'
import successfulModal from '~/components/modals/successful'
import axios from 'axios'

export default {
  components: { MainRegister },
  name: 'UserEnterprise',
  auth: false,
  data() {
    return {
      image: background,
      users: {},
      phone: '',
      form: {
        name: '',
        tin: '',
        phone: '',
        otherarea: null,
        env_otherarea: null,
        activitytypes: [],
        agrocultureareas: [],
        users: [],
        district: null
      },
      auth: {
        identifier: '',
        password: ''
      },
      activities: [],
      is_otherone: false,
      is_othertwo: false,
      agrocultureAreas: [],
      isMainRegister: false,
      isAgree: false,
      region: null,
      districts: []
    }
  },
  mounted() {
    this.fetchDirectories()
  },
  computed: {
    ...mapGetters(['dataRegions'])
  },
  watch: {
    region() {
      if (this.region.id) {
        this.districts = this.region.attributes.districts.data
      }
    },
    phone: {
      handler() {
        if (this.phone) this.form.phone = this.phone.replace(/[^0-9]/g, '')
      },
      deep: true
    },
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
    notFiledDelet (form) {
      const _forms = {...form}
      this.users.env_otherarea =  _forms.env_otherarea;
      this.users.otherarea = _forms.otherarea;
      delete _forms.env_otherarea;
      delete _forms.otherarea;
      _forms.activitytypes = this.checkOther (_forms.activitytypes);
      _forms.agrocultureareas = this.checkOther (_forms.agrocultureareas);
      return _forms;
    },
    checkUserInfo (user) {
      const _users = {...user}
      delete _users.id
      delete _users.createdAt
      delete _users.updatedAt;
      return _users;
    },
    async onSubmit() {
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
            this.loading = false;

            this.successfulModal()
            this.$router.push(this.localePath('/'))
          })
      } catch (e) {
        if (e.response) this.authError = e.response.data.error.message
        this.loading = false
      }
      axios({
        baseURL: process.env.VUE_APP_BASE_URL,
        url: `/companies`,
        method: 'POST',
        data: { data: {...this.notFiledDelet(this.form)}},
        headers: {
          Authorization: `Bearer ${this.jwt}`
        }
      }).then(async (res) => {
        const id = this.users.id;
        this.$store.dispatch('putUsers', {id: id,data: {...this.checkUserInfo(this.users)}})
      })
    },
    mainRegisterSuccess(e) {
      this.users = { ...e.user };
      console.log(this.users, '=====>')
      this.isMainRegister = e.isSuccess
      this.auth.identifier = e.user.username
      this.auth.password = e.password
      this.form.users.push(e.user.id)
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
          // this.activities.sort((a, b) => b.attributes.title-a.attributes.title )
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
      await this.$store.dispatch('getRegions', {
        populate: '*',
        locale: this.$i18n.locale
      })
      await this.$store.dispatch('getGenders', {
        populate: '*',
        locale: this.$i18n.locale
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
    }
  }
}
</script>
