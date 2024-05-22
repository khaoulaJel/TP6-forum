<template>
  <div class="home-container">
    <div class="welcome-message">
      <h1 v-if="user">Welcome !</h1>
      <h1 v-else>Welcome!</h1>
      <p>Explore and engage with our vibrant community!</p>
      <p v-if="threads.length > 0">
        Explore and engage with our vibrant community! The latest discussion is about <b>{{ threads[0].title || "a hot topic" }}</b>
      </p>
      

    </div>
    <div class="dashboard-container">
      <h1>Latest Discussions:</h1>
      <div class="threads">
        <ListThread v-if="threads.length > 0" :threads="threads" />
        <div v-else>Loading...</div>
      </div>
    </div>
  </div>
</template>


<script>
import ListThread from '@/components/DiscussionList.vue';
import getposts from '@/firebase/getPosts'; 

export default {
  name: 'HomeView',
  props: {
    user: {
      type: Object,
      default: null
    }
  },
  components: {
    ListThread,
  },
  data() {
    return {
      threads: []
    };
  },
  async created() {
    try {
      const { load, posts } = getposts();
      await load();
      // Get only the latest three threads
      this.threads = posts.value.slice(0, 3);
    } catch (error) {
      console.error('Error fetching threads:', error);
    }
  }
};
</script>

<style scoped>
.dashboard-container {
  display: flex;
  flex-direction: column; /* Align items vertically */
  background-color: #fafafa; 
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 20px;
  padding: 20px;
  margin-top: auto; 
}

.threads {
  display: flex;
  flex-wrap: wrap; /* Allow threads to wrap to the next line */
  gap: 20px; /* Add some space between items */
}

.dashboard-container > h1 {
  font-size: 32px;
  color: #333;
  margin-bottom: 20px;
  font-weight: bold;
  text-align: center;
}

.home-container {
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(45deg, #000000, rgb(189, 52, 80), rgb(245, 66, 101)); 
  display: flex;
  flex-direction: column;
}

.background-effect {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1; /* Ensure it's behind other elements */
}

.welcome-message {
  text-align: center;
  z-index: 1;
  color: #fff;
  
}

.welcome-message h1 {
  font-size: 3rem;
  margin-bottom: 20px;
}

.welcome-message p {
  font-size: 1.5rem;
  line-height: 1.6;
}
</style>
