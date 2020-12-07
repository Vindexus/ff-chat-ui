import Vue from 'vue'
import VueRouter from 'vue-router'
import UsersList from "@/modules/users/views/UsersList.vue";
import Chat from "@/modules/chats/views/Chat.vue";
import Login from "@/modules/users/views/Login.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Login
  }, {
    path: '/users',
    name: 'Users',
    component: UsersList
  }, {
    path: '/chat/:otherUserId',
    name: 'Chat',
    component: Chat
  }
]

const router = new VueRouter({
  routes
})

export default router
