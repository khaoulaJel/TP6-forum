<template>
  <form @submit.prevent="handleSignUP" class="register">
    <h2></h2>
    <input type="text" required placeholder="Display name" v-model="displayName">
    <input type="email" required placeholder="Your email" v-model="email">
    <input type="password" required placeholder="Your password" v-model="password">
    <input type="submit" value="Sign up">
    <div class="error">{{ error }}</div>
  </form>
</template>

<script setup>
import { defineEmits } from 'vue';
import useSignup from '@/firebase/Authentification/useSignup';
import { ref } from 'vue';

const emit = defineEmits(['customEvent']);

const displayName = ref('');
const email = ref('');
const password = ref('');

const { error, signup } = useSignup();

const handleSignUP = async () => {
  await signup(email.value, password.value, displayName.value);
  if (!error.value) {
    emit('signup');
  }
};
</script>

<style scoped>
form {
  padding: 2rem;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: auto;
  text-align: center;
}

input {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  outline: none;
  margin: 10px 0;
}

input::placeholder {
  color: #999;
}

input[type="submit"] {
  background-color: rgb(245, 66, 101);
  color: #fff;
  font-weight: 700;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
}

.error {
  color: #ff0000;
  margin-top: 1rem;
}
</style>
