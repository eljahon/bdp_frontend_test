<template>
  <div :style="{ backgroundImage: `url(${image})` }" class="bg-cover h-full pb-10 bg-opacity-10">
    <div class="max-w-6xl mx-auto p-4 lg:px-8 xl:px-0">
      <div class="max-w-2xl mx-auto mt-10">
        <ValidationObserver v-slot="{ handleSubmit, invalid }" slim>
          <form class="" novalidate @submit.prevent="handleSubmit(onSubmit)">
            <div class="grid grid-cols-2 bg-white rounded-md p-6 gap-4">
              <div class="flex justify-center text-gray-600 font-semibold col-span-2 text-xl mb-4">
                {{ $t('registration-for-consultant-individual') }}
              </div>
              <div>
                <label for="name" class="block mb-1 text-sm font-medium text-gray-700">{{
                  $t('name')
                }}*</label>
                 <ValidationProvider v-slot="{ errors }" name="name" rules="required" mode="eager">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    v-model="form.name"
                    class="focus:outline-none appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 sm:text-sm"
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
              <div>
                <label for="phone" class="block mb-1 text-sm font-medium text-gray-700">{{
                  $t('phone')
                }}*</label>
               <ValidationProvider v-slot="{ errors }" :rules="{required: true, length: 16}" name="phone" mode="eager">
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    v-model="form.phone"
                    v-mask="'+998## ###-##-##'"
                    class="focus:outline-none appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 sm:text-sm"
                    :class="
                      errors.length > 0
                        ? 'border-red-400'
                        : form.phone
                        ? 'border-green-600'
                        : 'border-gray-300'
                    "
                  />
                </ValidationProvider>
              </div>
              <div>
                <label for="email" class="block mb-1 text-sm font-medium text-gray-700">{{
                  $t('email')
                }}</label>
               <input
                  type="email"
                  name="email"
                  id="email"
                  v-model="form.email"
                  class="focus:outline-none appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 sm:text-sm"
                />
              </div>
              <div>
                <label for="gender" class="block mb-1 text-sm font-medium text-gray-700">{{
                  $t('gender')
                }}</label>
                <ValidationProvider v-slot="{ errors }" name="gender" rules="required" mode="eager">
                  <select
                    v-model="form.gender"
                    name="option"
                    class="focus:outline-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 sm:text-sm"
                    :class="
                      errors.length > 0
                        ? 'border-red-400'
                        : form.gender
                        ? 'border-green-600'
                        : 'border-gray-300'
                    "
                  >
                    <option v-for="(gender, index) in dataGenders" :key="index" :value="gender.id">
                      {{ gender.attributes.name }}
                    </option>
                  </select>
                </ValidationProvider>
              </div>
              <div>
                <label for="birth" class="block mb-1 text-sm font-medium text-gray-700">{{
                  $t('date-of-birth')
                }}*</label>
                <ValidationProvider
                  v-slot="{ errors }"
                  name="birthday"
                  rules="required"
                  mode="eager"
                >
                  <input
                    type="text"
                    name="birthday"
                    id="birthday"
                    v-model="form.birthday"
                    class="focus:outline-none appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 sm:text-sm"
                    :class="
                      errors.length > 0
                        ? 'border-red-400'
                        : form.birthday
                        ? 'border-green-600'
                        : 'border-gray-300'
                    "
                  />
                </ValidationProvider>
              </div>
              <div>
                <label for="area" class="block mb-1 text-sm font-medium text-gray-700">{{
                  $t('area-of-agriculture-and-environment')
                }}*</label>
                <ValidationProvider
                  v-slot="{ errors }"
                  name="agriculture"
                  rules="required"
                  mode="eager"
                >
                  <select
                    v-model="form.agriculture"
                    name="option"
                    class="focus:outline-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 sm:text-sm"
                    :class="
                      errors.length > 0
                        ? 'border-red-400'
                        : form.agriculture
                        ? 'border-green-600'
                        : 'border-gray-300'
                    "
                  >
                    <!-- <option v-for="(type, index) in dataRegions" :key="index" :value="region.id">
                      {{ type.attributes.name }}
                    </option> -->
                  </select>
                </ValidationProvider>
              </div>
              <div>
                <label for="consultancy" class="block mb-1 text-sm font-medium text-gray-700">{{
                  $t('area-of-consultancy')
                }}*</label>
                <ValidationProvider
                  v-slot="{ errors }"
                  name="consultancy"
                  rules="required"
                  mode="eager"
                >
                  <select
                    v-model="form.consultancy"
                    name="option"
                    class="focus:outline-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 sm:text-sm"
                    :class="
                      errors.length > 0
                        ? 'border-red-400'
                        : form.consultancy
                        ? 'border-green-600'
                        : 'border-gray-300'
                    "
                  >
                    <!-- <option v-for="(type, index) in dataRegions" :key="index" :value="region.id">
                      {{ type.attributes.name }}
                    </option> -->
                  </select>
                </ValidationProvider>
              </div>
              <div>
                <label for="workplace" class="block mb-1 text-sm font-medium text-gray-700">{{
                  $t('workplace')
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
                    v-model="form.workplace"
                    class="focus:outline-none appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 sm:text-sm"
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
              <div>
                <label for="degree" class="block mb-1 text-sm font-medium text-gray-700">{{
                  $t('last-received-degree')
                }}</label>
               <input
                  type="text"
                  name="degree"
                  id="degree"
                  v-model="form.last_degree"
                  class="focus:outline-none appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 sm:text-sm"
                />
              </div>
              <div class="">
                <label for="resume" class="block mb-1 text-sm font-medium text-gray-700">{{
                  $t('upload-resume')
                }}*</label>
                <!-- Resume upload qiladgan qilish kere -->
                <ValidationProvider v-slot="{ errors }" name="resume" rules="required" mode="eager">
                  <input
                    type="text"
                    name="resume"
                    id="resume"
                    v-model="form.resume"
                    class="focus:outline-none appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 sm:text-sm"
                    :class="
                      errors.length > 0
                        ? 'border-red-400'
                        : form.resume
                        ? 'border-green-600'
                        : 'border-gray-300'
                    "
                  />
                </ValidationProvider>
              </div>
              <div class="">
                <label for="diploma" class="block mb-1 text-sm font-medium text-gray-700">{{
                  $t('upload-diploma')
                }}*</label>
                 <ValidationProvider v-slot="{ errors }" name="diploma" rules="required" mode="eager">
                  <input
                    type="text"
                    name="diploma"
                    id="diploma"
                    v-model="form.diploma"
                    class="focus:outline-none appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 sm:text-sm"
                    :class="
                      errors.length > 0
                        ? 'border-red-400'
                        : form.diploma
                        ? 'border-green-600'
                        : 'border-gray-300'
                    "
                  />
                </ValidationProvider>
              </div>
              <div class="">
                <label for="experience" class="block mb-1 text-sm font-medium text-gray-700">{{
                  $t('experience')
                }}</label>
                <input
                  type="experience"
                  name="experience"
                  id="experience"
                  v-model="form.experience"
                  class="focus:outline-none appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 sm:text-sm"
                />
              </div>
              <div class="">
                <label for="region" class="block mb-1 text-sm font-medium text-gray-700">{{
                  $t('region')
                }}</label>
               <select
                  v-model="form.region"
                  name="option"
                  class="focus:outline-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 sm:text-sm"
                >
                  <option v-for="(region, index) in dataRegions" :key="index" :value="region.id">
                    {{ region.attributes.name }}
                  </option>
                </select>
              </div>
              <div>
                <label for="tin" class="block mb-1 text-sm font-medium text-gray-700">{{
                  $t('tin')
                }}*</label>
                <ValidationProvider v-slot="{ errors }" name="tin" rules="required" mode="eager">
                  <input
                    type="text"
                    name="tin"
                    id="tin"
                    v-model="form.tin"
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
              <div class="flex items-center mt-2">
                <input
                  name="termsOfUse"
                  type="checkbox"
                  :value="true"
                  class="h-5 w-5 text-green-600 focus:ring-green-600 border-gray-300 rounded"
                />
                <label for="termsOfUse" class="ml-2 block text-gray-600 text-base">
                  {{ $t('i-agree-with') }}
                  <span class="text-green-600 border-b border-green-600">
                    {{ $t('terms-of-use') }}
                  </span>
                </label>
              </div>
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
export default {
  name: 'UserInterprise',
  auth: false,
  data() {
    return {
      image: background,
      form: {
        name: '',
        phone: '+998',
        email: '',
        gender: '',
        birthday: '',
        agriculture: '',
        consultancy: '',
        workplace: '',
        last_degree: '',
        experience: '',
        region: '',
        tin: ''
      }
    }
  },
  mounted() {
    this.fetchDirectories()
  },
  computed: {
    ...mapGetters(['dataGenders', 'dataRegions']),
  },
  methods: {
    async fetchDirectories() {
      await this.$store.dispatch('getGenders', {
        populate: '*',
        locale: this.$i18n.locale,
      })
      await this.$store.dispatch('getRegions', {
        populate: '*',
        locale: this.$i18n.locale,
      })
    },
  },
}
</script>
