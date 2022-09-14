<template>
  <div>
    <div class="max-w-6xl mx-auto sm:px-6 lg:px-8 xl:px-0 px-4 lg:my-12 my-4">
      <div v-if="about.length > 0" class="text-2xl font-semibold text-gray-700">{{ about[0].attributes.title }}</div>
    <div v-if="about.length > 0" v-html="about[0].attributes.content"></div>
    </div>
    <div class="bg-green-900 my-10 py-10">
      <div class="max-w-6xl mx-auto sm:px-6 lg:px-8 xl:px-0 px-4">
        <div class="grid lg:grid-cols-2 grid-cols-1">
          <div class="grid content-center">
            <div class="lg:text-4xl text-2xl font-semibold text-white">
              {{ $t('we-are-ready-to-cooperate') }}
            </div>
            <div class="text-white my-6 mr-6">
              {{ $t('join-greenAral-to-contribute') }}
            </div>
            <div class="grid grid-cols-2 gap-4">
              <router-link :to="localePath('/consultant-individual')" class="text-white flex items-center">
                <i class="bx bx-check-circle text-lg text-white"></i>
                <div class="ml-2">{{ $t('become-a-consultant') }}</div>
              </router-link>
              <router-link :to="localePath('/content-provider')" class="text-white flex items-center">
                <i class="bx bx-check-circle text-lg text-white"></i>
                <div class="ml-2">{{ $t('become-service-provider') }}</div>
              </router-link>
              <router-link :to="localePath('/content-provider')" class="text-white flex items-center">
                <i class="bx bx-check-circle text-lg text-white"></i>
                <div class="ml-2">{{ $t('become-a-content-provider') }}</div>
              </router-link>
              <div class="text-white flex items-center">
                <i class="bx bx-check-circle text-lg text-white"></i>
                <div class="ml-2">{{ $t('join-as-a-partner') }}</div>
              </div>
            </div>
            <!-- <div class="lg:mt-5 my-5">
              <button
                class="text-white focus:outline-none text-sm bg-green-500 rounded-md py-3 px-5"
              >
                {{ $t('discover-more') }}
              </button>
            </div> -->
          </div>
          <div class="">
            <img src="~/assets/images/about.jpg" class="rounded-md" alt="about" />
          </div>
        </div>
      </div>
    </div>
    <div class="max-w-6xl mx-auto sm:px-6 lg:px-8 xl:px-0 px-4">
      <div class="mt-12 space-y-4">
        <div class="font-semibold text-gray-700 text-2xl">
          {{ $t('working') }} <span class="text-green-800">{{ $t('process') }}</span>
        </div>
        <div class="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
          <div class="rounded-md border border-gray-200 shadow-md bg-white p-8">
            <div class="flex items-center justify-between">
              <img src="~/assets/images/consultation.png" class="rounded-md h-16" alt="about" />
              <p class="text-gray-200 text-5xl font-extrabold">1</p>
            </div>
            <div class="text-gray-700 font-semibold text-lg mb-4 mt-8">
              {{ $t('consultation') }}
            </div>
            <div class="text-sm text-gray-500">
              {{
                $t(
                  'get-financial-legal-business-and-managerial-consultations-on-interested-area-of-agriculture-and-environment')

              }}
            </div>
          </div>
          <div class="rounded-md border border-gray-200 shadow-md bg-white p-8">
            <div class="flex items-center justify-between">
              <img src="~/assets/images/recommendation.png" class="rounded-md h-16" alt="about" />
              <p class="text-gray-200 text-5xl font-extrabold">2</p>
            </div>
            <div class="text-gray-700 font-semibold text-lg mb-4 mt-8">
              {{ $t('market-price') }}
            </div>
            <div class="text-sm text-gray-500">
              {{
                $t(
                  'get-overview-of-current-prices-in-karakalpakstan-split-by-product-and-time-period'
                )
              }}
            </div>
          </div>
          <div class="rounded-md border border-gray-200 shadow-md bg-white p-8">
            <div class="flex items-center justify-between">
              <img src="~/assets/images/financial.png" class="rounded-md h-16" alt="about" />
              <p class="text-gray-200 text-5xl font-extrabold">3</p>
            </div>
            <div class="text-gray-700 font-semibold text-lg mb-4 mt-8">
              {{ $t('useful-informations') }}
            </div>
            <div class="text-sm text-gray-500">
              {{
                $t(
                  'get-useful-content-at-e-learning-page-and-new-knowledge-on-areas-of-agriculture-and-environemnt'
                )
              }}
            </div>
          </div>
          <div class="rounded-md border border-gray-200 shadow-md bg-white p-8">
            <div class="flex items-center justify-between">
              <img src="~/assets/images/management.png" class="rounded-md h-16" alt="about" />
              <p class="text-gray-200 text-5xl font-extrabold">4</p>
            </div>
            <div class="text-gray-700 font-semibold text-lg mb-4 mt-8">{{ $t('navigation') }}</div>
            <div class="text-sm text-gray-500">
              {{ $t('use-manuals-and-guides') }}
            </div>
          </div>
        </div>
      </div>
      <div class="mt-12 space-y-4">
        <div class="grid lg:grid-cols-3 grid-cols-1 gap-4">
          <ValidationObserver ref="observer" v-slot="{ handleSubmit, invalid }" slim class="col-span-2">
            <form class="" novalidate @submit.prevent="handleSubmit(onSubmit)">
              <div class="grid grid-cols-2 gap-4">
                <div class="font-semibold text-green-800 text-2xl col-span-2">
                  {{ $t('contact-us') }}
                </div>
                <div class="md:col-span-1 col-span-2">
                  <label for="name" class="sr-only">{{ $t('first-name')}}</label>
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="firstname"
                    rules="required"
                    mode="eager"
                  >
                    <input
                      type="text"
                      name="firstname"
                      id="firstname"
                      v-model="form.name"
                      :placeholder="$t('firstname')"
                      class="focus:outline-none appearance-none block w-full p-3 border rounded-md shadow-sm placeholder-gray-400 sm:text-sm"
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
                  <label for="name" class="sr-only">{{$t('last-name')}}</label>
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="lastname"
                    rules="required"
                    mode="eager"
                  >
                    <input
                      type="text"
                      name="lastname"
                      id="lastname"
                      v-model="form.last_name"
                      :placeholder="$t('lastname')"
                      class="focus:outline-none appearance-none block w-full p-3 border rounded-md shadow-sm placeholder-gray-400 sm:text-sm"
                      :class="
                        errors.length > 0
                          ? 'border-red-400'
                          : form.last_name
                          ? 'border-green-600'
                          : 'border-gray-300'
                      "
                    />
                  </ValidationProvider>
                </div>
                <div class="md:col-span-1 col-span-2">
                  <label for="email" class="sr-only">{{$t('email')}}</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    v-model="form.email"
                    :placeholder="$t('email')"
                    class="focus:outline-none appearance-none block w-full p-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 sm:text-sm"
                  />
                </div>
                <div class="md:col-span-1 col-span-2">
                  <label for="email" class="sr-only">{{$t('phone')}}</label>
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
                      :placeholder="$t('phone')"
                      class="focus:outline-none appearance-none block w-full p-3 border rounded-md shadow-sm placeholder-gray-400 sm:text-sm"
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
                  <label for="subject" class="sr-only">{{$t('subject')}}</label>
                  <input
                    id="subject"
                    type="text"
                    name="subject"
                    v-model="form.subject"
                    class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md p-3"
                    :placeholder="$t('subject')"
                  />
                </div>

                <div class="col-span-2">
                  <label for="comment" class="sr-only">{{$t('message')}}</label>
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="description"
                    rules="required"
                    mode="eager"
                  >
                    <textarea
                      type="text"
                      name="lastname"
                      id="lastname"
                      v-model="form.description"
                      rows="4"
                      :placeholder="$t('write-a-message')"
                      class="focus:outline-none appearance-none block w-full p-3 border rounded-md shadow-sm placeholder-gray-400 sm:text-sm"
                      :class="
                        errors.length > 0
                          ? 'border-red-400'
                          : form.description
                          ? 'border-green-600'
                          : 'border-gray-300'
                      "
                    />
                  </ValidationProvider>
                </div>
                <div class="flex col-start-2 justify-end w-auto">
                  <button
                    :class="invalid ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700 text-white'"
                    class="text-white flex items-center focus:outline-none bg-green-700 rounded-md py-2 px-5"
                  >
                    <i
                      v-if="loading"
                      class="bx bx-loader-alt bx-spin bx-rotate-90 text-xl mr-2 font-bold"
                    ></i>
                    {{ $t('submit-now') }}
                  </button>
                </div>
              </div>
            </form>
          </ValidationObserver>
          <div class="bg-yellow-50 rounded-md p-5">
            <div class="text-gray-700 font-semibold text-2xl mb-6">{{ $t('get-in-touch') }}</div>
            <div class="space-y-6">
              <div class="flex items-center py-2 px-5 bg-green-700 rounded-md text-white">
                <i class="bx bx-phone text-lg"></i>
                <p class="text-sm ml-2">+99894 081 23 45</p>
              </div>
              <div class="flex items-center py-2 px-5 bg-white rounded-md text-gray-700">
                <i class="bx bx-envelope text-green-700 text-lg"></i>
                <p class="text-sm ml-2">juanjose.robalino@gggi.org</p>
              </div>
              <div class="flex items-center py-2 px-5 bg-white rounded-md text-green-700">
                <i class="bx bx-map text-xl"></i>
                <p class="text-sm ml-2">
                  7a, Bunyodkor av., 100000, Tashkent, Uzbekistan
                </p>
              </div>
              <div class="flex items-center justify-center space-x-4">
                <img src="~/assets/images/socials/facebook.png" class="w-8" />
                <img src="~/assets/images/socials/twitter.png" class="w-8" />
                <img src="~/assets/images/socials/google.png" class="w-8" />
                <img src="~/assets/images/socials/pinterest.png" class="w-8" />
                <img src="~/assets/images/socials/linkedin.png" class="w-8" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-12 space-y-4">
        <h1>{{$t('key_content_partners')}}</h1>
        <partners-swiper :partners="dataPartners" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PartnersSwiper from '~/components/swipers/partners-swiper.vue'
import { actions, getters } from '~/utils/store_schema'
const _page = 'pages'
const { get } = actions(_page)
export default {
  name: 'About',
  auth: false,
  data() {
    return {
      about: [],
      loading: false,
      phone: '',
      form: {
        name: '',
        last_name: '',
        email: '',
        subject: '',
        phone: '',
        description: '',
      },
    }
  },
  components: {
    PartnersSwiper,
  },
  computed: {
    ...mapGetters(getters(_page)),
    ...mapGetters(['dataPartners']),
  },
  mounted() {
    this.fetchDirectories().then(() => {
      this.fetchData()
    })
  },
  watch: {
    phone: {
      handler() {
        if (this.phone) this.form.phone = this.phone.replace(/[^0-9]/g, '')
      },
      deep: true,
    },
  },
  methods: {
    onSubmit() {
      this.loading = true
      this.$store.dispatch('postContactuses', {
        data: this.form,
      })
      this.loading = false
      this.$refs.observer.reset();
      this.form = {
        name: '',
        last_name: '',
        email: '',
        subject: '',
        phone: '',
        description: '',
      }
      this.phone = ''
    },
    async fetchData() {
      await this.$store
        .dispatch(get, {
          link: '/pages',
          query: {
            populate: '*',
            locale: this.$i18n.locale,
            filters: {
              slogan: 'about'
            }
          },
        })
        .then((res) => {
          console.log(res);
          this.about = res.data
        })
    },
    async fetchDirectories() {
      await this.$store.dispatch('getPartners', {
        populate: '*',
        locale: this.$i18n.locale,
      })
    },
  },
}
</script>
