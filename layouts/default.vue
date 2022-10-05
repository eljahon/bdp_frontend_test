<template>
  <div>
    <div>
    <nuxt />
    <vue-snotify />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  components: {},
  data () {
    return {
      token: null
    }
  },
  computed: {
    ...mapState({})
  },
  created () {
    if (!process.client) {
      return
    }
    this.token = localStorage.getItem('local')
  },
  mounted () {},
  methods: {
    async setUserToStore () {
      if (this.token && Object.keys(this.currentUser).length > 0) {
        await this.$auth.setToken('local', this.token)
        await this.$axios.setHeader('Authorization', this.token)
        await this.$auth.ctx.app.$axios.setHeader('Authorization', this.token)
        await this.$auth.setUser(this.currentUser)
      }
    }
  }
}
</script>
