<template>
  <div>
    <div v-if="chatAjax.loading">
      Loading...
    </div>
    <div v-else>
      <div v-if="chatAjax.error" class="errors">
        {{chatAjax.error}}
      </div>
      <h2>Chat With {{otherUser.Username}}</h2>
      <div class="chat-log">
        <li v-for="(msg, idx) in messages" :key="idx" class="message">
          {{msg.Message}}
        </li>
      </div>
      <form @submit="send">
        <input type="text" v-model="newMessage" />
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue"
import {newAjax} from "@/lib/helpers";
import {getChat} from "@/modules/chats/chat-api";
import {User} from "@/modules/users/user-types";

export default Vue.extend({
  data () {
    return {
      otherUserId: this.$router.currentRoute.params.otherUserId,
      newMessage: '',
      chatAjax: newAjax(),
    }
  },
  computed : {
    otherUser () : (User | null) {
      if (this.chatAjax.loading || this.chatAjax.error) {
        return null
      }
      return this.chatAjax.data.OtherUser || null
    },
    messages () {
      if (this.chatAjax.loading || this.chatAjax.error) {
        return null
      }
      return this.chatAjax.data.Messages || []
    }
  },
  async created () {
    await this.loadChat()
  },
  methods: {
    async send (e) {
      e.preventDefault()
      if (!this.newMessage) {
        return
      }
      // TODO: Send a message through ws
      this.newMessage = ''
    },
    async loadChat () {
      this.chatAjax.loading = true
      try {
        this.chatAjax.data = await getChat(parseInt(this.otherUserId))
      } catch (ex) {
        this.chatAjax.error = ex.toString()
      }
      this.chatAjax.loading = false
      console.log('', this.chatAjax)
    }
  }
})
</script>
