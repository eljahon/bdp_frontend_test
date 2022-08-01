<template>
  <div class="max-w-6xl sm:px-6 lg:px-8 xl:px-0 px-4 mx-auto lg:my-12 my-4">
    <div class="grid lg:grid-cols-3 grid-cols-1 lg:gap-6 gap-0">
      <div class="col-span-2">
        <div v-if="lesson.attributes.videourl" class="h-auto cursor-pointer w-full mb-4">
          <iframe
            width="100%"
            height="345"
            :src="lesson.attributes.videourl"
            frameborder="0"
            allowfullscreen
            class="responsive-iframe rounded-md"
          />
        </div>
        <div class="my-6 text-gray-700 font-semibold text-4xl">
          {{ lesson.attributes.title }}
        </div>
        <div v-html="lesson.attributes.content"></div>
      </div>
      <div class="space-y-5">
        <div
          v-if="lesson.attributes.attachments && lesson.attributes.attachments.data.length > 0" 
          class="bg-white rounded-md border border-gray-100 shadow-md p-5 lg:mt-0 mt-6"
        >
          <div class="text-gray-700 font-semibold text-xl">{{ $t('useful-materials') }}</div>
          <div
            v-for="(file, ind) in lesson.attributes.attachments.data"
            :key="ind"
            @click="openInNewTab(file)"
            class="flex items-center justify-between rounded-md bg-yellow-100 p-3"
          >
            <div class="flex items-center space-x-3">
              <i class="bx bxs-file-pdf text-gray-700 text-2xl"></i>
              <p class="text-base text-gray-700 line-clamp-1">{{ file.attributes.filename }}</p>
            </div>
            <div><i class="bx bx-download text-gray-700 text-xl"></i></div>
          </div>
        </div>
        <div class="bg-white rounded-md border border-gray-100 shadow-md p-5">
          <div class="text-gray-700 font-semibold text-xl">{{ $t('other-courses') }}</div>
          <nuxt-link
            v-for="(course, ind) in courses"
            :key="ind"
            class="flex items-center space-x-3 my-4 cursor-pointer hover:bg-gray-100 rounded-md"
            :to="localePath(`/e-learning/${course.id}`)"
          >
            <img
              :src="
                $tools.getFileUrl(
                  course.attributes.thumbnail
                    ? course.attributes.thumbnail
                    : course.attributes.image
                )
              "
              class="rounded-md w-28 h-20 object-cover"
              :alt="course.id"
            />
            <div class="grid content-between text-gray-600 text-sm">
              <div class="line-clamp-2 text-sm mb-2">{{ course.attributes.title }}</div>
              <div class="text-xs">{{ $tools.getDate(course.attributes.createdAt) }}</div>
            </div>
          </nuxt-link>
          <nuxt-link
            :to="localePath('/e-learning')"
            class="text-center text-green-500 hover:text-green-700 font-semibold text-sm flex justify-center"
          >
            {{ $t('view-all') }}
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { actions, getters } from '~/utils/store_schema'
const _page = 'lessons'
const { get } = actions(_page)
export default {
  name: 'ELearningDetails',
  auth: false,
  data() {
    return {
      courseDetail: {
        attributes: {},
      },
      courses: [],
      lessonGroup: {},
      lesson: {
        attributes: {},
      },
    }
  },
  computed: {
    ...mapGetters(getters(_page)),
  },
  watch: {
    '$route.params.detail': {
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.fetchDirectories().then(() => {
            this.fetchData()
          })
        }
      },
      immediate: true,
    },
  },
  mounted() {},
  methods: {
    openInNewTab(file) {
      window.open(this.$tools.getFileUrl(file.attributes.url))
    },
    async fetchData() {
      await this.$store
        .dispatch(get, {
          populate: '*',
          locale: this.$i18n.locale,
          'filters[$and][0][lessongroup][id]': this.lessonGroup.id,
        })
        .then((res) => {
          this.lesson = res[0]
        })
    },
    async fetchDirectories() {
      await this.$store
        .dispatch('getCourses', {
          pagination: {
            page: 1,
            pageSize: 5,
          },
          populate: '*',
          'sort[0][createdAt]': 'DESC',
          locale: this.$i18n.locale,
          'filters[$and][0][coursetype][id]': 1,
          'filters[$and][0][id][$ne]': this.$route.params.detail,
        })
        .then((res) => {
          this.courses = res
        })
      await this.$store
        .dispatch('getLessongroups', {
          populate: '*',
          locale: this.$i18n.locale,
          'filters[$and][0][course][id]': this.$route.params.detail,
        })
        .then((res) => {
          this.lessonGroup = res[0]
        })
    },
  },
}
</script>
