<template>
  <div id="app">
    <h2>Welcome to The App</h2>
    <button @click="logout" v-if="session.isLoggedIn">Logout</button>
    <router-view/>
  </div>
</template>
<script lang="ts">
import Vue from "vue"
import {mapState} from "vuex";
import {setJWT} from "@/lib/axios";
export default Vue.extend({
  async created () {
    await this.$store.dispatch('loadSession')
  },
  computed: {
    ...mapState(['session'])
  },
  methods: {
    async logout () {
      setJWT('')
      await this.$store.dispatch('loadSession')
    }
  }
})
</script>

<style>
body {
  background: #e0e0e0;
  padding: 1em;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 760px;
  margin: 0 auto;
  background: #fefefe;
  padding: 2em;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.errors {
  padding: 10px;
  border: 1px solid red;
  background: #FFE0E0;
}
</style>
