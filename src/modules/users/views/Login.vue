<template>
<div>
  <div v-if="session.isLoggedIn" data-cy="loggedIn">
    You are logged in as {{session.currentUserId}}
    <router-link :to="{name: 'Users'}">
      View Users
    </router-link>
  </div>
  <form v-else @submit="submit">
    <div v-if="error" class="errors">
      {{error}}
    </div>
    <div>
      <label>Username</label>
      <input v-model="username" data-cy="username" type="text" class="username" />
    </div>
    <div>
      <label>Password</label>
      <input v-model="password" data-cy="password" type="password" />
    </div>
    <div>
      <button>Login</button>
    </div>
  </form>
</div>
</template>
<script lang="ts">
import {mapState} from "vuex";
import Vue from "vue"
import {login} from "@/modules/users/user-api";

export default Vue.extend({
  data () {
    return {
      username: '',
      password: '',
      error: ''
    }
  },
  computed: {
    ...mapState(['session'])
  },
  methods: {
    async submit (e) {
      e.preventDefault()
      this.error = ''
      try {
        await this.$store.dispatch('login', {
          username: this.username,
          password: this.password
        })
      } catch (ex) {
        this.error = ex
      }
    }
  }
})
</script>
