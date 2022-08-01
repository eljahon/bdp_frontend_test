<template>
  <div class="bg-green-900 relative">
    <div
      class="
        max-w-6xl
        mx-auto
        grid
        lg:grid-cols-4
        grid-cols-1
        sm:px-6
        lg:px-8
        xl:px-0
        px-4
        gap-10
        text-white
        pt-10
        pb-10
      "
    >
      <div class="block">
        <div class="font-semibold text-base pb-6">{{$t('business-development-platform')}}</div>
        <div class="text-xs leading-5">
          {{$t('info-about-platform')}}
        </div>
      </div>
      <div class="block">
        <div class="grid lg:justify-end justify-start">
          <div class="font-semibold text-base pb-6">{{$t('contacts')}}</div>
          <div class="text-xs space-y-3">
            <div class="leading-5">
              7a, Bunyodkor av., 100000, Tashkent, Uzbekistan
            </div>
            <p>+99894 081 23 45</p>
            <p>juanjose.robalino@gggi.org</p>
          </div>
        </div>
      </div>
      <div class="grid lg:justify-end justify-start">
        <div class="font-semibold text-base pb-5">{{$t('useful-links')}}</div>
        <div class="grid grid-cols-2 text-xs gap-3">
          <div v-for="(item, index) in footer" :key="index">
            <router-link :to="{ path: localePath(item.route) }" class="flex items-center">
              <i class="bx bx-chevron-right text-white text-lg"></i>
              <p>{{ $t(item.title) }}</p>
            </router-link>
          </div>
        </div>
      </div>
      <div class="block">
        <div class="grid jlg:justify-end justify-start">
          <div class="font-semibold text-base pb-6">{{$t('services')}}</div>
          <div class="space-y-3 text-xs">
            <div v-for="(service, index) in services" :key="index">
              <router-link :to="{ path: localePath(service.route) }" class="flex items-center gap-3">
                <p>{{ $t(service.title) }}</p>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-start space-x-4">
        <img src="~/assets/images/socials/facebook.png" class="w-8" />
        <img src="~/assets/images/socials/twitter.png" class="w-8" />
        <img src="~/assets/images/socials/google.png" class="w-8" />
        <img src="~/assets/images/socials/pinterest.png" class="w-8" />
        <img src="~/assets/images/socials/linkedin.png" class="w-8" />
      </div>
    </div>
    <div class="border-t border-white py-5"></div>
    <div class="flex items-center justify-center space-x-5 text-white text-sm pb-10">
      <div>{{$t('privacy-policy')}}</div>
      <div>{{$t('sitemap')}}</div>
      <div>{{$t('terms-of-use')}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      footer: [
        { title: 'home', route: '/' },
        { title: 'agri-business', route: '/agri-business' },
        { title: 'about', route: '/about' },
        { title: 'agri-finance', route: '/agri-finance' },
        { title: 'e-learning', route: '/e-learning' },
        { title: 'agri-market', route: '/agri-market' },
        { title: 'advisory', route: '/advisory' },
      ],
      services: [
        { title: 'consultation', route: '/' },
        { title: 'market-price', route: '/' },
        { title: 'how-to-open-business', route: '/' },
      ],
    }
  },
}
</script>
