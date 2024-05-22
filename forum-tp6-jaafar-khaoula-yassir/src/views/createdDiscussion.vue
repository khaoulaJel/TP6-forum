<template>
  <div class="my-create-thread">
    <h1 class="my-create-thread-title">Share Your Ideas</h1>
    <form @submit.prevent="add" class="my-thread-form">
      <div class="form-group">
        <label for="my-title" class="form-label">Thread Title:</label>
        <input type="text" id="my-title" v-model="title" class="form-input">
      </div>
      <div class="form-group">
        <label for="my-content" class="form-label">Thread Content:</label>
        <textarea id="my-content" v-model="content" class="form-textarea"></textarea>
      </div>
      <div class="form-group">
        <label for="my-tags" class="form-label">Tags (separated by space):</label>
        <input type="text" id="my-tags" v-model="tags" class="form-input">
      </div>
      <button type="submit" class="my-submit-button">Join the Discussion</button>
    </form>
  </div>
</template>

<script>
import { addNewThread } from '@/firebase/Firestore/addDisc';
import { getUser } from '@/firebase/Authentification/getUser';

export default {
  name: 'MyCreateThread',
  data() {
    return {
      title: '',
      content: '',
      tags: ''
    };
  },
  methods: {
    add() {
      const uid = getUser().uid;
      const tagsArray = this.tags.trim().split(' ');
      const data = {
        title: this.title,
        content: this.content,
        tags: tagsArray
      };
      addNewThread(uid, data); 
      this.$router.push({ path: '/dashboard' });
    }
  }
};
</script>

<style scoped>
.my-create-thread {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px;
  text-align: center;
}

.my-create-thread-title {
  font-size: 36px;
  margin-bottom: 40px;
}

.my-thread-form {
  background-color: black; /* Changed background color to black */
  border-radius: 15px;
  padding: 40px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 30px;
}

.form-label {
  font-size: 20px;
  display: block;
  margin-bottom: 10px;
  color: #f9f6f6;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 15px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 18px;
  color: #666;
  background-color: #fff; /* Set background color for input and textarea */
}

.my-submit-button {
  background-color: rgb(245, 66, 101);
  color: #fff;
  border: none;
  padding: 15px 40px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 20px;
  transition: background-color 0.3s ease;
}

.my-submit-button:hover {
  background-color: rgb(189, 28, 60);
}
</style>
