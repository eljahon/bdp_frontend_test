<template>
  <div :style="{ backgroundImage: `url(${image})` }" class="bg-cover h-full pb-10 bg-opacity-10">
    <div class="max-w-6xl mx-auto p-4 lg:px-8 xl:px-0">
      <div class="max-w-2xl mx-auto mt-10">
        <ValidationObserver v-slot="{ handleSubmit, invalid }" slim>
          <form class="" novalidate @submit.prevent="handleSubmit(onSubmit)">
            <div class="grid grid-cols-2 bg-white rounded-md p-6 gap-4">
              <div class="flex justify-center text-gray-600 font-semibold col-span-2 text-xl mb-4">
                {{ $t('registration-for-consultant-enterprise') }}
              </div>
              <div>
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
                    v-model="form.company_name"
                    class="focus:outline-none appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 sm:text-sm"
                    :class="
                      errors.length > 0
                        ? 'border-red-400'
                        : form.company_name
                        ? 'border-green-600'
                        : 'border-gray-300'
                    "
                  />
                </ValidationProvider>
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
              <div>
                <label for="agriculture" class="block mb-1 text-sm font-medium text-gray-700">{{
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
                }}</label>
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
              <div class="col-span-2">
                <label for="experience" class="block mb-1 text-sm font-medium text-gray-700">{{
                  $t('experience-in-agriculture-and-environment')
                }}</label>
                <textarea
                  type="experience"
                  name="experience"
                  id="experience"
                  v-model="form.experience"
                  rows="4"
                  class="focus:outline-none appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 sm:text-sm"
                />
              </div>
              <div class="col-span-2">
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
              <div class="col-span-2">
                <label for="resume" class="block mb-1 text-sm font-medium text-gray-700">{{
                  $t('upload-resume')
                }}*</label>
                <!-- Resume upload qiladgan qilish kere -->
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
              <div>
                <label for="contact_name" class="block mb-1 text-sm font-medium text-gray-700">{{
                  $t('contact-name')
                }}*</label>
                <ValidationProvider
                  v-slot="{ errors }"
                  name="contact_name"
                  rules="required"
                  mode="eager"
                >
                  <input
                    type="text"
                    name="contact_name"
                    id="contact_name"
                    v-model="form.contact_name"
                    class="focus:outline-none appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 sm:text-sm"
                    :class="
                      errors.length > 0
                        ? 'border-red-400'
                        : form.contact_namee
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

              <div class="flex items-center mt-2">
                <input
                  name="termsOfUse"
                  type="checkbox"
                  :value="true"
                  class="h-5 w-5 text-green-600 focus:ring-green-600 border-gray-300 rounded"
                />
                <label for="termsOfUse" class="ml-2 block text-gray-600 text-base">
                  {{ $t('i-agree-with') }}
                  <span class="text-green-600 border-b border-green-600">{{
                    $t('terms-of-use')
                  }}</span>
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
        company_name: '',
        tin: '',
        agriculture: '',
        consultancy: '',
        experience: '',
        region: '',
        contact_name: '',
        phone: '+998'
      }
    }
  },
  mounted() {
    this.fetchDirectories()
  },
  computed: {
    ...mapGetters(['dataRegions']),
  },
  methods: {
    async fetchDirectories() {
      await this.$store.dispatch('getRegions', {
        populate: '*',
        locale: this.$i18n.locale,
      })
    },
  },
}
</script>
