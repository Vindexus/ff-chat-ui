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
        <li v-for="(msg, idx) in messages" :key="idx" class="message" :class="{received: msg.SenderId === otherUserId}">
          <span class="username">{{msg.Username}}:</span>
          <span class="msg">{{msg.Message}}</span>
        </li>
      </div>
      <form @submit="send">
        <input type="text" v-model="newMessage" placeholder="New message" />
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue"
import {newAjax} from "@/lib/helpers";
import {getChat} from "@/modules/chats/chat-api";
import {User} from "@/modules/users/user-types";
import {io} from "socket.io-client"
import {getCookie} from "@/lib/cookies";

export default Vue.extend({
  data () {
    return {
      otherUserId: parseInt(this.$router.currentRoute.params.otherUserId),
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

    this.socket = io(`${process.env.VUE_APP_API_URL}`, {
      query: {
        jwt: getCookie('jwt')
      }
    })
    this.socket.on('connect', () => {
      console.log('connected')
    })

    // TODO: Check for errors on parsing the data
    this.socket.on('reply', (js) => {
      const msg = JSON.parse(js)
      this.chatAjax.data.Messages.push(msg)
    })
  },
  destroyed() {
    this.socket.close()
  },
  methods: {
    async send (e) {
      e.preventDefault()
      if (!this.newMessage) {
        return
      }
      this.socket.emit('msg', this.newMessage)
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
    }
  }
})
</script>
<style scoped>
.message {
  list-style: none;
  margin: 0 0 5px 0;
  color: #2c3e50;
}
.message.received {
  text-align: left;
  color: rebeccapurple;
}

.username {
  font-weight: bold;
  margin-right: 0.25em;
}

form {
  margin-top: 1em;
}
</style>
