<template>
  <div class="group w-full hover:shadow-md rounded-md shadow-sm relative">
    <div class="flex justify-center w-full">
      <img
        :src="
          data && data.avatar
            ? $tools.getFileUrl(data.avatar)
            : require('/assets/images/person/avatar.jpg')
        "
        class="w-full md:h-72 h-48 rounded-md object-cover group-hover:opacity-60"
      />
    </div>
    <div
      class="
        bg-white
        rounded-md
        inset-x-2
        p-4
        flex
        justify-center
        shadow-md
        absolute
        -bottom-7
        z-20
      "
    >
      <div class="block w-10/12">
        <div class="font-semibold text-gray-700 my-2 text-sm flex justify-center group-hover:justify-start">
          {{ data.middlename ? data.middlename : `${data.name} ${data.surname}` }}
        </div>
        <div v-if="data.consultantcategory" class="text-gray-500 text-xs">
          {{ data.consultantcategory.name }}
        </div>
        <div class='group-hover:flex items-center hidden'>
          <span class='text-gray-500 text-xs'>Rating: &nbsp;</span>
          <div class="bh-stars" data-bh-rating="2.5">
            <svg version="1.1" class="bh-star bh-star--1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" xml:space="preserve"><path class="outline" d="M12,4.2L14.5,9l0.2,0.5l0.5,0.1l5.5,0.8L16.8,14l-0.4,0.4l0.1,0.5l1,5.3l-5-2.5L12,17.5l-0.4,0.2l-5,2.5L7.5,15l0.1-0.5 L7.2,14l-4-3.7l5.5-0.8l0.5-0.1L9.5,9L12,4.2 M11.9,2L8.6,8.6L1,9.7l5.5,5.1L5.2,22l6.8-3.4l6.8,3.4l-1.3-7.2L23,9.6l-7.6-1L11.9,2 L11.9,2z"/><polygon class="full" points="18.8,22 12,18.6 5.2,22 6.5,14.8 1,9.7 8.6,8.6 11.9,2 15.4,8.6 23,9.6 17.5,14.7"/><polyline class="left-half" points="12,18.6 5.2,22 6.5,14.8 1,9.7 8.6,8.6 11.9,2"/></svg>

            <svg version="1.1" class="bh-star bh-star--2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" xml:space="preserve"><path class="outline" d="M12,4.2L14.5,9l0.2,0.5l0.5,0.1l5.5,0.8L16.8,14l-0.4,0.4l0.1,0.5l1,5.3l-5-2.5L12,17.5l-0.4,0.2l-5,2.5L7.5,15l0.1-0.5 L7.2,14l-4-3.7l5.5-0.8l0.5-0.1L9.5,9L12,4.2 M11.9,2L8.6,8.6L1,9.7l5.5,5.1L5.2,22l6.8-3.4l6.8,3.4l-1.3-7.2L23,9.6l-7.6-1L11.9,2 L11.9,2z"/><polygon class="full" points="18.8,22 12,18.6 5.2,22 6.5,14.8 1,9.7 8.6,8.6 11.9,2 15.4,8.6 23,9.6 17.5,14.7"/><polyline class="left-half" points="12,18.6 5.2,22 6.5,14.8 1,9.7 8.6,8.6 11.9,2"/></svg>

            <svg version="1.1" class="bh-star bh-star--3" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" xml:space="preserve"><path class="outline" d="M12,4.2L14.5,9l0.2,0.5l0.5,0.1l5.5,0.8L16.8,14l-0.4,0.4l0.1,0.5l1,5.3l-5-2.5L12,17.5l-0.4,0.2l-5,2.5L7.5,15l0.1-0.5 L7.2,14l-4-3.7l5.5-0.8l0.5-0.1L9.5,9L12,4.2 M11.9,2L8.6,8.6L1,9.7l5.5,5.1L5.2,22l6.8-3.4l6.8,3.4l-1.3-7.2L23,9.6l-7.6-1L11.9,2 L11.9,2z"/><polygon class="full" points="18.8,22 12,18.6 5.2,22 6.5,14.8 1,9.7 8.6,8.6 11.9,2 15.4,8.6 23,9.6 17.5,14.7"/><polyline class="left-half" points="12,18.6 5.2,22 6.5,14.8 1,9.7 8.6,8.6 11.9,2"/></svg>

            <svg version="1.1" class="bh-star bh-star--4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" xml:space="preserve"><path class="outline" d="M12,4.2L14.5,9l0.2,0.5l0.5,0.1l5.5,0.8L16.8,14l-0.4,0.4l0.1,0.5l1,5.3l-5-2.5L12,17.5l-0.4,0.2l-5,2.5L7.5,15l0.1-0.5 L7.2,14l-4-3.7l5.5-0.8l0.5-0.1L9.5,9L12,4.2 M11.9,2L8.6,8.6L1,9.7l5.5,5.1L5.2,22l6.8-3.4l6.8,3.4l-1.3-7.2L23,9.6l-7.6-1L11.9,2 L11.9,2z"/><polygon class="full" points="18.8,22 12,18.6 5.2,22 6.5,14.8 1,9.7 8.6,8.6 11.9,2 15.4,8.6 23,9.6 17.5,14.7"/><polyline class="left-half" points="12,18.6 5.2,22 6.5,14.8 1,9.7 8.6,8.6 11.9,2"/></svg>

            <svg version="1.1" class="bh-star bh-star--5" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" xml:space="preserve"><path class="outline" d="M12,4.2L14.5,9l0.2,0.5l0.5,0.1l5.5,0.8L16.8,14l-0.4,0.4l0.1,0.5l1,5.3l-5-2.5L12,17.5l-0.4,0.2l-5,2.5L7.5,15l0.1-0.5 L7.2,14l-4-3.7l5.5-0.8l0.5-0.1L9.5,9L12,4.2 M11.9,2L8.6,8.6L1,9.7l5.5,5.1L5.2,22l6.8-3.4l6.8,3.4l-1.3-7.2L23,9.6l-7.6-1L11.9,2 L11.9,2z"/><polygon class="full" points="18.8,22 12,18.6 5.2,22 6.5,14.8 1,9.7 8.6,8.6 11.9,2 15.4,8.6 23,9.6 17.5,14.7"/><polyline class="left-half" points="12,18.6 5.2,22 6.5,14.8 1,9.7 8.6,8.6 11.9,2"/></svg>
          </div>
        </div>
        <div
          v-if='data.additionalinfo && data.additionalinfo.last_degree'
          class="
            text-gray-500
            text-xs
            text-center
            hidden
            group-hover:flex
            my-1
          "
        >
          <span>Degree: &nbsp;</span> {{data.additionalinfo.last_degree }}
        </div>
        <div
          v-if='data.additionalinfo && data.additionalinfo.last_degree'
          class="
            text-gray-500
            text-xs
            text-center
            hidden
            group-hover:flex
            my-1
          "
        >
          <span>Area of agriculture: &nbsp;</span> {{data.additionalinfo.last_degree }}
        </div>
        <div
          v-if='data.additionalinfo && data.additionalinfo.last_degree'
          class="
            text-gray-500
            text-xs
            text-center
            hidden
            group-hover:flex
            my-1
          "
        >
          <span>Area of consultancy: &nbsp;</span> {{data.additionalinfo.last_degree }}
        </div>
        <button
          v-if="!isConsultant"
          @click="toGetConsultation()"
          class="
            bg-green-700
            rounded-md
            text-white text-xs
            py-2
            px-5
            mt-3
            mx-auto
            hidden
            group-hover:flex
            transition
            delay-75
            focus:outline-none
            duration-500
          "
        >
          {{ $t('get-consultation') }}
        </button>
        <!-- <button
          v-else
          @click="toGetConsultation()"
          class="
            bg-green-700
            rounded-md
            text-white text-xs
            py-2
            px-5
            mt-3
            hidden
            group-hover:flex
            transition
            delay-75
            focus:outline-none
            duration-500
          "
        >
          {{ $t('get-consultation') }}
        </button> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Experts',
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      isConsultant: false,
    }
  },
  created() {
    if (!process.client) {
      return
    }
  },
  mounted() {
    if (
      this.currentUser &&
      this.currentUser.role.id === 4
    ) {
      this.isConsultant = true
    }
  },
  computed: {
    ...mapState({
      currentUser: (state) => state.auth.user,
      isLoggedIn: (state) => state.auth.loggedIn,
    }),
  },
  watch: {
    currentUser() {
      if (
        this.currentUser &&
        this.currentUser.role.id === 4
      ) {
        this.isConsultant = true
      } else {
        this.isConsultant = false
      }
    },
  },
  methods: {
    toGetConsultation() {
      if (this.isLoggedIn) {
        this.$store
          .dispatch('getChatrooms', {
            populate: '*',
            'filters[$and][0][consultant][id]': this.data.id,
            'filters[$and][1][user][id]': this.currentUser.id,
            'filters[$and][2][isCompleted][$ne]': true,
          })
          .then((res) => {
            if (res.length > 0) {
              this.$router.push({
                path: this.localePath('/chats'),
                query: { room_id: res[0].id, consultant_id: this.data.id },
              })
            } else {
              this.$router.push({
                path: this.localePath('/chats'),
                query: { room_id: 'new', consultant_id: this.data.id },
              })
            }
          })
      } else {
        this.$router.push({
          path: this.localePath('/login'),
          query: {
            consultant: this.data.id,
            from: 'consultant',
          },
        })
      }
    },
  },
}
</script>

<style>
.bh-stars {
  display: flex;
  justify-content: center;
  width: 80px;
  height: 20px;
  transform: translate(0px, -14px);
}
.bh-stars .bh-star {
  width: 3rem;
  height: 3rem;
}
.bh-stars .bh-star .outline {
  fill: gold;
}
.bh-stars .bh-star .full, .bh-stars .bh-star .left-half {
  fill: transparent;
}
.bh-stars[data-bh-rating^="1"] .bh-star--1 .full {
  fill: gold;
}
.bh-stars[data-bh-rating^="2"] .bh-star--1 .full {
  fill: gold;
}
.bh-stars[data-bh-rating^="3"] .bh-star--1 .full {
  fill: gold;
}
.bh-stars[data-bh-rating^="4"] .bh-star--1 .full {
  fill: gold;
}
.bh-stars[data-bh-rating^="5"] .bh-star--1 .full {
  fill: gold;
}
.bh-stars[data-bh-rating^="2"] .bh-star--2 .full {
  fill: gold;
}
.bh-stars[data-bh-rating^="3"] .bh-star--2 .full {
  fill: gold;
}
.bh-stars[data-bh-rating^="4"] .bh-star--2 .full {
  fill: gold;
}
.bh-stars[data-bh-rating^="5"] .bh-star--2 .full {
  fill: gold;
}
.bh-stars[data-bh-rating^="3"] .bh-star--3 .full {
  fill: gold;
}
.bh-stars[data-bh-rating^="4"] .bh-star--3 .full {
  fill: gold;
}
.bh-stars[data-bh-rating^="5"] .bh-star--3 .full {
  fill: gold;
}
.bh-stars[data-bh-rating^="4"] .bh-star--4 .full {
  fill: gold;
}
.bh-stars[data-bh-rating^="5"] .bh-star--4 .full {
  fill: gold;
}
.bh-stars[data-bh-rating^="5"] .bh-star--5 .full {
  fill: gold;
}
.bh-stars[data-bh-rating^="0.5"] .bh-star--1 .left-half {
  fill: gold;
}
.bh-stars[data-bh-rating^="1.5"] .bh-star--2 .left-half {
  fill: gold;
}
.bh-stars[data-bh-rating^="2.5"] .bh-star--3 .left-half {
  fill: gold;
}
.bh-stars[data-bh-rating^="3.5"] .bh-star--4 .left-half {
  fill: gold;
}
.bh-stars[data-bh-rating^="4.5"] .bh-star--5 .left-half {
  fill: gold;
}
.bh-stars[data-bh-rating^="0.6"] .bh-star--1 .left-half {
  fill: gold;
}
.bh-stars[data-bh-rating^="1.6"] .bh-star--2 .left-half {
  fill: gold;
}
.bh-stars[data-bh-rating^="2.6"] .bh-star--3 .left-half {
  fill: gold;
}
.bh-stars[data-bh-rating^="3.6"] .bh-star--4 .left-half {
  fill: gold;
}
.bh-stars[data-bh-rating^="4.6"] .bh-star--5 .left-half {
  fill: gold;
}
.bh-stars[data-bh-rating^="0.7"] .bh-star--1 .left-half {
  fill: gold;
}
.bh-stars[data-bh-rating^="1.7"] .bh-star--2 .left-half {
  fill: gold;
}
.bh-stars[data-bh-rating^="2.7"] .bh-star--3 .left-half {
  fill: gold;
}
.bh-stars[data-bh-rating^="3.7"] .bh-star--4 .left-half {
  fill: gold;
}
.bh-stars[data-bh-rating^="4.7"] .bh-star--5 .left-half {
  fill: gold;
}
.bh-stars[data-bh-rating^="0.8"] .bh-star--1 .left-half {
  fill: gold;
}
.bh-stars[data-bh-rating^="1.8"] .bh-star--2 .left-half {
  fill: gold;
}
.bh-stars[data-bh-rating^="2.8"] .bh-star--3 .left-half {
  fill: gold;
}
.bh-stars[data-bh-rating^="3.8"] .bh-star--4 .left-half {
  fill: gold;
}
.bh-stars[data-bh-rating^="4.8"] .bh-star--5 .left-half {
  fill: gold;
}
.bh-stars[data-bh-rating^="0.9"] .bh-star--1 .left-half {
  fill: gold;
}
.bh-stars[data-bh-rating^="1.9"] .bh-star--2 .left-half {
  fill: gold;
}
.bh-stars[data-bh-rating^="2.9"] .bh-star--3 .left-half {
  fill: gold;
}
.bh-stars[data-bh-rating^="3.9"] .bh-star--4 .left-half {
  fill: gold;
}
.bh-stars[data-bh-rating^="4.9"] .bh-star--5 .left-half {
  fill: gold;
}
.bh-stars.rounding-up[data-bh-rating^="1"] .bh-star--1 .full {
  fill: gold;
}
.bh-stars.rounding-up[data-bh-rating^="2"] .bh-star--1 .full {
  fill: gold;
}
.bh-stars.rounding-up[data-bh-rating^="3"] .bh-star--1 .full {
  fill: gold;
}
.bh-stars.rounding-up[data-bh-rating^="4"] .bh-star--1 .full {
  fill: gold;
}
.bh-stars.rounding-up[data-bh-rating^="5"] .bh-star--1 .full {
  fill: gold;
}
.bh-stars.rounding-up[data-bh-rating^="2"] .bh-star--2 .full {
  fill: gold;
}
.bh-stars.rounding-up[data-bh-rating^="3"] .bh-star--2 .full {
  fill: gold;
}
.bh-stars.rounding-up[data-bh-rating^="4"] .bh-star--2 .full {
  fill: gold;
}
.bh-stars.rounding-up[data-bh-rating^="5"] .bh-star--2 .full {
  fill: gold;
}
.bh-stars.rounding-up[data-bh-rating^="3"] .bh-star--3 .full {
  fill: gold;
}
.bh-stars.rounding-up[data-bh-rating^="4"] .bh-star--3 .full {
  fill: gold;
}
.bh-stars.rounding-up[data-bh-rating^="5"] .bh-star--3 .full {
  fill: gold;
}
.bh-stars.rounding-up[data-bh-rating^="4"] .bh-star--4 .full {
  fill: gold;
}
.bh-stars.rounding-up[data-bh-rating^="5"] .bh-star--4 .full {
  fill: gold;
}
.bh-stars.rounding-up[data-bh-rating^="5"] .bh-star--5 .full {
  fill: gold;
}
.bh-stars.rounding-up[data-bh-rating^="0.6"] .bh-star--1 .full {
  fill: gold;
}
.bh-stars.rounding-up[data-bh-rating^="1.6"] .bh-star--2 .full {
  fill: gold;
}
.bh-stars.rounding-up[data-bh-rating^="2.6"] .bh-star--3 .full {
  fill: gold;
}
.bh-stars.rounding-up[data-bh-rating^="3.6"] .bh-star--4 .full {
  fill: gold;
}
.bh-stars.rounding-up[data-bh-rating^="4.6"] .bh-star--5 .full {
  fill: gold;
}
.bh-stars.rounding-up[data-bh-rating^="0.7"] .bh-star--1 .full {
  fill: gold;
}
.bh-stars.rounding-up[data-bh-rating^="1.7"] .bh-star--2 .full {
  fill: gold;
}
.bh-stars.rounding-up[data-bh-rating^="2.7"] .bh-star--3 .full {
  fill: gold;
}
.bh-stars.rounding-up[data-bh-rating^="3.7"] .bh-star--4 .full {
  fill: gold;
}
.bh-stars.rounding-up[data-bh-rating^="4.7"] .bh-star--5 .full {
  fill: gold;
}
.bh-stars.rounding-up[data-bh-rating^="0.8"] .bh-star--1 .full {
  fill: gold;
}
.bh-stars.rounding-up[data-bh-rating^="1.8"] .bh-star--2 .full {
  fill: gold;
}
.bh-stars.rounding-up[data-bh-rating^="2.8"] .bh-star--3 .full {
  fill: gold;
}
.bh-stars.rounding-up[data-bh-rating^="3.8"] .bh-star--4 .full {
  fill: gold;
}
.bh-stars.rounding-up[data-bh-rating^="4.8"] .bh-star--5 .full {
  fill: gold;
}
.bh-stars.rounding-up[data-bh-rating^="0.9"] .bh-star--1 .full {
  fill: gold;
}
.bh-stars.rounding-up[data-bh-rating^="1.9"] .bh-star--2 .full {
  fill: gold;
}
.bh-stars.rounding-up[data-bh-rating^="2.9"] .bh-star--3 .full {
  fill: gold;
}
.bh-stars.rounding-up[data-bh-rating^="3.9"] .bh-star--4 .full {
  fill: gold;
}
.bh-stars.rounding-up[data-bh-rating^="4.9"] .bh-star--5 .full {
  fill: gold;
}
.bh-stars.rounding-up[data-bh-rating^="0.0"] .bh-star--1 .left-half {
  fill: gold;
}
.bh-stars.rounding-up[data-bh-rating^="1.0"] .bh-star--2 .left-half {
  fill: gold;
}
.bh-stars.rounding-up[data-bh-rating^="2.0"] .bh-star--3 .left-half {
  fill: gold;
}
.bh-stars.rounding-up[data-bh-rating^="3.0"] .bh-star--4 .left-half {
  fill: gold;
}
.bh-stars.rounding-up[data-bh-rating^="4.0"] .bh-star--5 .left-half {
  fill: gold;
}
.bh-stars.rounding-up[data-bh-rating^="0.1"] .bh-star--1 .left-half {
  fill: gold;
}
.bh-stars.rounding-up[data-bh-rating^="1.1"] .bh-star--2 .left-half {
  fill: gold;
}
.bh-stars.rounding-up[data-bh-rating^="2.1"] .bh-star--3 .left-half {
  fill: gold;
}
.bh-stars.rounding-up[data-bh-rating^="3.1"] .bh-star--4 .left-half {
  fill: gold;
}
.bh-stars.rounding-up[data-bh-rating^="4.1"] .bh-star--5 .left-half {
  fill: gold;
}
.bh-stars.rounding-up[data-bh-rating^="0.2"] .bh-star--1 .left-half {
  fill: gold;
}
.bh-stars.rounding-up[data-bh-rating^="1.2"] .bh-star--2 .left-half {
  fill: gold;
}
.bh-stars.rounding-up[data-bh-rating^="2.2"] .bh-star--3 .left-half {
  fill: gold;
}
.bh-stars.rounding-up[data-bh-rating^="3.2"] .bh-star--4 .left-half {
  fill: gold;
}
.bh-stars.rounding-up[data-bh-rating^="4.2"] .bh-star--5 .left-half {
  fill: gold;
}
.bh-stars.rounding-up[data-bh-rating^="0.3"] .bh-star--1 .left-half {
  fill: gold;
}
.bh-stars.rounding-up[data-bh-rating^="1.3"] .bh-star--2 .left-half {
  fill: gold;
}
.bh-stars.rounding-up[data-bh-rating^="2.3"] .bh-star--3 .left-half {
  fill: gold;
}
.bh-stars.rounding-up[data-bh-rating^="3.3"] .bh-star--4 .left-half {
  fill: gold;
}
.bh-stars.rounding-up[data-bh-rating^="4.3"] .bh-star--5 .left-half {
  fill: gold;
}
.bh-stars.rounding-up[data-bh-rating^="0.4"] .bh-star--1 .left-half {
  fill: gold;
}
.bh-stars.rounding-up[data-bh-rating^="1.4"] .bh-star--2 .left-half {
  fill: gold;
}
.bh-stars.rounding-up[data-bh-rating^="2.4"] .bh-star--3 .left-half {
  fill: gold;
}
.bh-stars.rounding-up[data-bh-rating^="3.4"] .bh-star--4 .left-half {
  fill: gold;
}
.bh-stars.rounding-up[data-bh-rating^="4.4"] .bh-star--5 .left-half {
  fill: gold;
}
.bh-stars.rounding-up[data-bh-rating^="0.5"] .bh-star--1 .left-half {
  fill: gold;
}
.bh-stars.rounding-up[data-bh-rating^="1.5"] .bh-star--2 .left-half {
  fill: gold;
}
.bh-stars.rounding-up[data-bh-rating^="2.5"] .bh-star--3 .left-half {
  fill: gold;
}
.bh-stars.rounding-up[data-bh-rating^="3.5"] .bh-star--4 .left-half {
  fill: gold;
}
.bh-stars.rounding-up[data-bh-rating^="4.5"] .bh-star--5 .left-half {
  fill: gold;
}
</style>
