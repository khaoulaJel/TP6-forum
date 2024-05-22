<template>
  <div class="dashboard-container">
    <h1>Welcome to the world of information</h1>
    <div class="search-bar">
      <input type="text" v-model="searchQuery" placeholder="Search discussions...">
      <button @click="search">Search</button>
    </div>
    <div class="threads">
      <ListThread v-if="filteredThreads.length > 0" :threads="filteredThreads" />
      <div v-else>Loading...</div>
    </div>
  </div>
</template>

<script>
import ListThread from '@/components/DiscussionList.vue';
import getposts from '@/firebase/getPosts.js'; 

export default {
  name: 'DashboardView',
  components: {
    ListThread,
  },
  data() {
    return {
      threads: [],
      searchQuery: ''
    };
  },
  async created() {
    try {
      const { load, posts } = getposts();
      await load();
      this.threads = posts.value;
      console.log('Threads:', this.threads)
    } catch (error) {
      console.error('Error fetching threads:', error);
    }
  },
  computed: {
    filteredThreads() {
      if (!this.searchQuery) {
        return this.threads;
      } else {
        const query = this.searchQuery.toLowerCase();
        return this.threads.filter(thread => 
          thread.title.toLowerCase().includes(query) || 
          thread.tags.some(tag => tag.toLowerCase().includes(query))
        );
      }
    }
  },
  methods: {
    search() {
      // This method is called when the search button is clicked
      // The computed property `filteredThreads` automatically updates based on the `searchQuery`
    }
  }
};
</script>

<style scoped>
.dashboard-container {
  background-color: #fafafa; 
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 20px;
  padding: 20px;
}

.threads {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* Create a grid with columns of minimum 300px width */
  gap: 20px; /* Add some space between items */
}

.dashboard-container > h1 {
  font-size: 32px;
  color: #333;
  margin-bottom: 20px;
  font-weight: bold;
  text-align: center;
}

/* Adjusting for three threads in a row */
@media (min-width: 768px) {
  .threads {
    grid-template-columns: repeat(3, 1fr); /* Three columns of equal width */
  }
}



.search-bar {
  margin-bottom: 20px;
  text-align: center;
}

.search-bar input {
  padding: 10px;
  width: 60%;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.search-bar button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #040404;
  color: #fff;
  cursor: pointer;
}
</style>
