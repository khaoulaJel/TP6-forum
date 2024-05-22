<template>
  <div class="threads-container">
    <div class="thread-column" v-for="(column, index) in columns" :key="index">
      <div v-for="item in column" :key="item.id" class="thread-item">
        <h1 class="thread-title">{{ item.title }}</h1>
        <p class="thread-author">By {{ item.authorName }}</p>
        <router-link :to="'/discussion/' + item.id" class="view-link">
          <button class="view-button">Open Discussion</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserById } from '@/firebase/Authentification/getUser';

export default {
  props: ["threads"],
  data() {
    return {
      threadsWithUsernames: []
    };
  },
  async created() {
    console.log("Threads in ListThread:", this.threads);
    this.threadsWithUsernames = await this.getThreadsWithUsernames(this.threads);
  },
  computed: {
    columns() {
      // Split the threads into three columns
      const threadsCopy = [...this.threadsWithUsernames];
      const columns = [[], [], []];
      threadsCopy.forEach((thread, index) => {
        columns[index % 3].push(thread);
      });
      return columns;
    }
  },
  methods: {
    async getuser(id) {
      const user = await getUserById(id);
      return user.displayName;
    },
    
    async getThreadsWithUsernames(threads) {
      const threadsWithUsernames = await Promise.all(
        threads.map(async (thread) => {
          const authorName = await this.getuser(thread.author);
          return { ...thread, authorName };
        })
      );
      return threadsWithUsernames;
    }
  }
}
</script>

<style scoped>
.threads-container {
  display: flex;
  justify-content: space-around;
  padding: 20px;
  background-color: #fafafa; 
}

.thread-column {
  width: 30%; /* Adjust the width of each column as needed */
}

.thread-item {
  background-color: #ffffff; 
  border: 1px solid #dbdbdb; 
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 15px; /* Adjusted padding */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out; 
  height: 200px;
  width: 400px;
  margin-right: 10px
}

.thread-item:hover {
  transform: scale(1.02); 
}

.thread-title {
  font-size: 20px; 
  font-weight: bold;
  color: #333; 
  margin-bottom: 5px; 
}

.thread-author {
  font-size: 14px; /* Adjusted font size */
  color: #888; 
  margin-bottom: 30px; /* Adjusted margin */
}

.view-link {
  text-decoration: none; 
  display: flex;
  justify-content: center;
}

.view-button {
  background-color: rgb(245, 66, 101);
  color: #fff;
  border: none;
  padding: 8px 15px; /* Adjusted padding */
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px; /* Adjusted font size */
  transition: background-color 0.3s ease;
}

.view-button:hover {
  background-color: rgb(189, 28, 60);
}
</style>
