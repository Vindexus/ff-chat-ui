<template>
  <div>
    Users List
    <div v-if="usersAjax.loading">
      LOADING
    </div>
    <div v-else>
      <div v-if="usersAjax.error" class="errors">
        {{usersAjax.error}}
      </div>
      <ol v-else class="users-list">
        <li v-for="user in users" :key="user.Id">
          <router-link :to="{name: 'Chat', params: {otherUserId: user.Id}}">
            <code>{{user.Id}}</code> {{user.Username}}
          </router-link>
        </li>
      </ol>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue"
import {getUsers} from "@/modules/users/user-api";
import {User} from "@/modules/users/user-types";
import {newAjax} from "@/lib/helpers";
export default Vue.extend({
  data () {
    return {
      usersAjax: newAjax()
    }
  },
  computed: {
    users () : User[] {
      if (this.usersAjax.loading || !!this.usersAjax.error) {
        return []
      }

      const users = this.usersAjax.data.Users || []
      return users.filter((user : User) => {
        return user.Id != this.$store.state.session.currentUserId
      })
    }
  },
  async created () {
    await this.loadUsers()
  },
  methods: {
    async loadUsers () {
      this.usersAjax.loading = true
      try {
        this.usersAjax.data = await getUsers()
      } catch (ex) {
        this.usersAjax.error = ex.toString()
      }
      this.usersAjax.loading = false
      console.log('', this.usersAjax)
    }
  }
})
</script>

<style>
.users-list {
  list-style: none;
}
</style>
