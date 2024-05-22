<template>
  <div class="navbar-container">
    <nav class="navbar">
      <div class="buttons-container">
        <router-link to="/home" class="button">Home</router-link>
        <router-link to="/dashboard" class="button">Discussions</router-link>
        <router-link to="/create" class="button">Start a discussion</router-link>
      </div>
      <div class="usermenu">
        <router-link :to="'/profile/' + user.uid" class="username">
          <img :src="URLimg" class="userphoto">
        </router-link>
        <router-link :to="'/profile/' + user.uid" class="username"></router-link>
        <button class="button" @click="leave">Sign out</button>
      </div>
    </nav>
  </div>
  
</template>

<script>
import signOut from '@/firebase/Authentification/SignOut';

export default {
  name: 'UserInfo',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      URLimg: "https://th.bing.com/th/id/OIP.DQdhyRifE5tywz-uIlBKUAHaHa?rs=1&pid=ImgDetMain"
    }
  },
  methods: {
    leave() {
      signOut();
      this.$router.push('/auth');
    }
  }
}
</script>

<style scoped>.navbar-container {
  text-align: center;
}

.navbar {
  display: flex;
  justify-content: space-between; /* Distribute items evenly */
  align-items: center;
  padding: 10px;
  background-color: #000000; /* Darker grey */
  color: #fff;
  height: 60px;
}

.buttons-container,
.usermenu {
  display: flex;
  align-items: center;
}

.usermenu {
  margin-left: auto; /* Move profile section to the right */
}

.userphoto {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.username {
  text-decoration: none;
  color: #fff;
  font-weight: bold;
}

.button {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  background-color: transparent; /* Transparent background */
  color: #fff; /* White text */
  cursor: pointer;
  transition: color 0.3s; /* Smooth color transition on hover */
  text-decoration: none;
  margin-left: 10px; /* Adjust spacing between buttons */
}

button.button:hover {
  color: #ccc; /* Light grey text on hover */
}

button.button:focus {
  outline: none;
}

</style>
