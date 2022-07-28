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
                    v-model="form.organization_name"
                    class="focus:outline-none appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 sm:text-sm"
                    :class="
                      errors.length > 0
                        ? 'border-red-400'
                        : form.organization_name
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
                  v-model="form.position"
                  class="focus:outline-none appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 sm:text-sm"
                />
              </div>
              <div class="md:col-span-1 col-span-2">
                <label for="name" class="block mb-1 text-sm font-medium text-gray-700"
                  >{{ $t('contact-name') }}*</label
                >
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
              <div class="col-span-2">
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
              <div class="col-span-2">
                <label for="summary" class="block mb-1 text-sm font-medium text-gray-700">{{
                  $t('short-summary')
                }}</label>
                <textarea
                  type="text"
                  name="summary"
                  id="summary"
                  rows="4"
                  v-model="form.short_summary"
                  :placeholder="
                    $t(
                      'short-summary-of-agricultural-environmental-experience-and-activities-of-organization-in-Karakalpakstan'
                    )
                  "
                  class="focus:outline-none appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 sm:text-sm"
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
                  v-model="form.short_description"
                  :placeholder="
                    $t(
                      'short-description-of-organization-size-relationship-to-agricultural-environmental-sectors-in-Karakalpakstan'
                    )
                  "
                  class="focus:outline-none appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 sm:text-sm"
                />
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
import background from '/assets/images/background.png'
export default {
  name: 'UserInterprise',
  auth: false,
  data() {
    return {
      image: background,
      form: {
        organization_name: '',
        position: '',
        contact_name: '',
        phone: '',
        email: '',
        short_summary: '',
        short_description: '',
      },
    }
  },
}
</script>
