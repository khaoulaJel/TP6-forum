<template>
  <div class="thread-container" v-if="thread">
    <div v-if="authorName" class="thread-header">
      <h2>{{ thread.title }}</h2>
      <p class="thread-info">Posted by <router-link :to="'/profile/' + thread.author"> {{ authorName }} </router-link></p>
    </div>
    <div class="thread-content">
      <p>{{ thread.content }}</p>
    </div>
  </div>
</template>

<script>
import { getUserById } from '@/firebase/Authentification/getUser';

export default {
  name: 'SingleThread',
  data() {
    return {
      authorName: ''
    };
  },
  async created() {
    if (this.thread && this.thread.author) {
      try {
        const name = await this.getuser(this.thread.author);
        this.authorName = name;
      } catch (error) {
        console.error('Error fetching author name:', error);
      }
    }
  },
  methods: {
    async getuser(id) {
      const user = await getUserById(id);
      return user.displayName;
    }
  },
  props: {
    thread: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.thread-container {
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 20px;
}

.thread-header {
  margin-bottom: 10px;
}

.thread-header h2 {
  margin: 0;
}

.thread-info {
  font-size: 14px;
  color: #888;
}

.thread-content {
  margin-bottom: 15px;
}
</style>
