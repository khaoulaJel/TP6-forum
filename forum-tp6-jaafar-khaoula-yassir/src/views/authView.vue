<template>
  <div class="welcome container d-flex flex-column justify-content-center align-items-center min-vh-100">
    <div class="form-container">
      <h2>{{ showLogin ? 'Login' : 'Sign up' }}</h2>
      <div v-if="showLogin">
        <LoginForm @login="enterForum" />
        <p>No account yet? <span @click="showLogin = false">Signup</span> instead.</p>
      </div>
      <div v-else>
        <SignupForm @signup="enterForum" />
        <p>Already registered? <span @click="showLogin = true">Login</span> instead.</p>
      </div>
    </div>
  </div>
</template>

<script>
import SignupForm from '../components/SignupForm.vue';
import LoginForm from '../components/LoginForm.vue';

export default {
  components: { SignupForm, LoginForm },
  data() {
    return {
      showLogin: false
    }
  },
  methods: {
    enterForum() {
      this.$router.push('/home');
    }
  }
}
</script>

<style scoped>
#app {
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: rgb(245, 66, 101);
  background-image: linear-gradient(to bottom right, rgb(11, 9, 9) 0%, rgb(179, 55, 80) 100%);
  background-size: cover;
}

.welcome {
  text-align: center;
  font-size: 125%;
  height: 100%;
  justify-content: center;
  background-size: cover;
}

.form-container {
  width: 80%;
  max-width: 600px;
  background-color: #fff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #000;
  margin-bottom: 20px;
}

p {
  color: #000;
}

span {
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
}
</style>
