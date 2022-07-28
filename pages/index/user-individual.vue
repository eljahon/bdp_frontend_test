<template>
  <div :style="{ backgroundImage: `url(${image})` }" class="bg-cover h-full pb-10 bg-opacity-10">
    <div class="max-w-6xl mx-auto p-4 lg:px-8 xl:px-0">
      <div class="max-w-2xl mx-auto mt-10 bg-white rounded-md">
        <div class="flex justify-center text-gray-600 font-semibold text-xl md:p-6 p-4">
          {{ $t('registration-for-user-individual') }}
        </div>
        <main-register class="" />
        <ValidationObserver v-slot="{ handleSubmit, invalid }" slim>
          <form class="" novalidate @submit.prevent="handleSubmit(onSubmit)">
            <div class="grid md:grid-cols-2 grid-cols-1 md:p-6 p-4 gap-4">
              <div class="flex justify-start col-span-2 text-gray-600 font-semibold text-xl">
                {{ $t('additional-information') }}
              </div>
              <div class="md:col-span-1 col-span-2">
                <label for="name" class="block mb-1 text-sm font-medium text-gray-700"
                  >{{ $t('name') }}*</label
                >
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
              <div class="md:col-span-1 col-span-2">
                <label for="gender" class="block mb-1 text-sm font-medium text-gray-700"
                  >{{ $t('gender') }}*</label
                >
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
              <div class="md:col-span-1 col-span-2">
                <label for="birthday" class="block mb-1 text-sm font-medium text-gray-700"
                  >{{ $t('date-of-birth') }}*</label
                >
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
              <div class="md:col-span-1 col-span-2">
                <label for="activity-type" class="block mb-1 text-sm font-medium text-gray-700"
                  >{{ $t('activity-type') }}*</label
                >
                <ValidationProvider
                  v-slot="{ errors }"
                  name="activity-type"
                  rules="required"
                  mode="eager"
                >
                  <select
                    v-model="form.activity_type"
                    name="option"
                    class="focus:outline-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 sm:text-sm"
                    :class="
                      errors.length > 0
                        ? 'border-red-400'
                        : form.activity_type
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
              <div class="md:col-span-1 col-span-2">
                <label for="field" class="block mb-1 text-sm font-medium text-gray-700"
                  >{{ $t('field-of-agriculture') }}*</label
                >
                <ValidationProvider v-slot="{ errors }" name="field" rules="required" mode="eager">
                  <select
                    v-model="form.field"
                    name="option"
                    class="focus:outline-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 sm:text-sm"
                    :class="
                      errors.length > 0
                        ? 'border-red-400'
                        : form.field
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
              <div class="flex items-center mt-2 col-span-2">
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
                class="col-span-2 rounded-md bg-gray-300 py-3 mt-6"
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
  name: 'UserIndividual',
  auth: false,
  data() {
    return {
      image: background,
      form: {
        name: '',
        phone: '+998',
        gender: '',
        birthday: '',
        activity_type: '',
        field: '',
        region: '',
      },
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
