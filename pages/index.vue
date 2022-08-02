<template>
  <div>
    <navbar />
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script>
import Footer from '~/components/core/footer.vue'
import Navbar from '~/components/core/navbar.vue'
import { socket } from '~/plugins/socket.client.js'
import { mapGetters, mapState } from 'vuex'
export default {
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      currentUser: {},
    }
  },
  created() {
    if (!process.client) {
      return
    }
  },
  mounted() {
    socket.on('joined', (res) => {
      console.log('Joined to chat: ', res)
    })
    socket.on('left', (res) => {
      console.log('Left from chat:', res)
    })
    socket.on('joinedRoom', (res) => {
      console.log('Joined to room: ', res)
    })
    socket.on('leftRoom', (res) => {
      console.log('Left from room:', res)
    })
    socket.on('message', (res) => {
      console.log('Page Received Message Front: ', res)
      if (res.type === 'chat') {
        this.getMessages()
      } else if (res.type === 'room') {
        this.getRooms(res.data)
      }
    })
    socket.on('finishedChat', (res) => {
      this.$store.dispatch('finishedChatId', res)
      console.log('Finished chat id: ', res)
    })
    this.$bridge.$on('join_room', (message) => {
      console.log('Join room: ', message)
      this.joinToRoom(message)
    })
    this.$bridge.$on('join_chat', (message) => {
      console.log('Join chat: ', message)
      this.joinToChat(message)
    })
    // if (this.$auth.user && Object.keys(this.$auth.user).length > 0) {
    //   this.$bridge.$emit('join_chat', {
    //     username: this.$auth.user.username,
    //     user_id: this.$auth.user.id,
    //   })
    // }
  },
  computed: {
    ...mapState({
      isLoggedIn: (state) => state.auth.loggedIn
    }),
  },
  methods: {
    joinToChat(message) {
      socket.emit(
        'join',
        {
          username: message.username,
          user_id: message.user_id,
        }
      )
    },
    joinToRoom(message) {
      socket.emit(
        'joinRoom',
        {
          username: message.username,
          room: message.room,
        },
        ({ res, rej }) => {
          if (res) {
            if (this.$route.query.room_id !== 'new') {
              this.getMessages()
            }
          } else {
            console.error(rej)
          }
        }
      )
    },
    getRooms(room) {
      if (room.id === parseInt(this.$route.query.room_id)) {
        this.$bridge.$emit('room_changed')
      }
      if (this.$auth.user.role.id === 4) {
        this.$store
          .dispatch('getChatrooms', {
            populate: '*',
            'filters[$or][0][consultant][id]': this.$auth.user.id,
            'filters[$and][0][isCompleted][$ne]': true,
            'sort[0][createdAt]': 'DESC',
          })
          .then((res) => {
            this.$store.dispatch('setActiveRooms', res)
          })
      } else {
        this.$store
          .dispatch('getChatrooms', {
            populate: '*',
            'filters[$or][0][user][id]': this.$auth.user.id,
            // 'filters[$and][0][isCompleted][$ne]': true,
            'filters[$and][0][rate][$null]': true,
            'sort[0][createdAt]': 'DESC',
          })
          .then((res) => {
            this.$store.dispatch('setActiveRooms', res)
          })
      }
    },
    getMessages() {
      this.$store
        .dispatch('getChatmessages', {
          populate: '*',
          'filters[$and][0][chatroom][id]': this.$route.query.room_id,
        })
        .then((res) => {
          console.log('Chat messages: ', res)
          this.$store.dispatch('setMessage', res)
        })
    },
  },
}
</script>
