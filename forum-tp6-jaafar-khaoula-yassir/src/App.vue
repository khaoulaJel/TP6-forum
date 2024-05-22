<template>
  <UserInfo v-if="islogged" :user="user"/>
  <router-view/>
</template>

<script>
import { isLogged, getUser, waitForAuthInit } from '@/firebase/Authentification/getUser'; 
import UserInfo from './components/UserProfile.vue';

export default {
  name: 'App',
  components: { UserInfo },
  data() {
    return {
      user: null,
      islogged: false,
    };
  },
  mounted() {
    waitForAuthInit().then(() => {
      this.islogged = isLogged();
      if (this.islogged) {
        this.user = getUser();
      }
    });
  },
}
</script>

<style>
  body{
    font-family: Arial, sans-serif;
  }
</style>