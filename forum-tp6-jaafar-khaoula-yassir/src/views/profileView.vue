<template>
  <div class="paddd">
    <div v-if="user" class="profile-container">
      <div class="profile-header">
        <h1>Profile</h1>
        <p>Name: <span class="profile-detail">{{ user.displayName }}</span></p>
        <p>Email: <span class="profile-detail">{{ user.email }}</span></p>
        <p>Creation Time: <span class="profile-detail">{{ user.createdAt }}</span></p>
      </div>
      
      <!-- Update Profile Section -->
      
      
      <div class="threads-section">
        <h1>Shared Discussions:</h1>
        <ListThread v-if="threads.length > 0" :threads="threads" />
        <div v-else>no discussions yet!!</div>
      </div>
      <div class="update-profile">
        <button @click="toggleUpdateForm" class="update-button">Update Profile</button>
        <div v-if="showUpdateForm" class="update-form">
          <div class="form-group">
            <label for="name" class="form-label">Name:</label>
            <input type="text" id="name" v-model="updatedName" class="form-input">
          </div>
          <div class="form-group">
            <label for="email" class="form-label">Email:</label>
            <input type="email" id="email" v-model="updatedEmail" class="form-input">
          </div>
          <button @click="updateProfile" class="update-button">Update</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ListThread from '@/components/DiscussionList.vue';
import { getUserById, updateUserProfile } from '@/firebase/Authentification/getUser'; // Import updateUserProfile function
import { getThreadsByIds } from '@/firebase/Firestore/getDisc.js';

export default {
  name: 'ProfileView',
  components: { ListThread },
  data() {
    return {
      user: null,
      threads: [],
      updatedName: '',
      updatedEmail: '',
      showUpdateForm: false // Add a data property to control form visibility
    };
  },
  methods: {
    async updateProfile() {
      try {
        const userId = this.$route.params.id;
        await updateUserProfile(userId, { displayName: this.updatedName, email: this.updatedEmail });
        // Optionally, update other profile information as needed
        alert('Profile updated successfully!');
      } catch (error) {
        console.error('Error updating profile:', error);
        alert('Failed to update profile. Please try again.');
      }
    },
    toggleUpdateForm() {
      this.showUpdateForm = !this.showUpdateForm; // Toggle form visibility
    }
  },
  async created() {
    try {
      const userId = this.$route.params.id;
      this.user = await getUserById(userId);
      if (this.user) {
        this.user.createdAt = this.user.createdAt.toDate();

        const { posts, load } = await getThreadsByIds(this.user.threads);
        await load();
        this.threads = posts.value;
      } else {
        console.error('User not found.');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }
};
</script>

<style scoped>
/* Profile Header Styles */
.profile-header {
  background-color: #000000;
  padding: 20px;
  border-radius: 20px;
  margin: 20px;


  text-align: center;
  color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.profile-header h1 {
  color: #fff;
  margin-bottom: 10px;
}

.profile-detail {
  font-weight: bold;
  color: #fff;
}

/* Update Profile Section Styles */
.update-profile {
  margin-top: 20px;
  position: relative;
  margin-left: 600px;
}

.update-title {
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
}

.update-button {
  background-color: rgb(245, 66, 101);
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.update-button:hover {
  background-color: rgb(245, 66, 101);
}
.update-form {
  
  top: 100%;
  right: 500px;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-left: 400px;
  width: 500px; /* Adjust the width as needed */
  margin-top: 10px; /* Add some margin from the button */
}
.form-group {
  margin-bottom: 20px;
}

.form-label {
  font-size: 18px;
  color: #333;
  display: block;
  margin-bottom: 5px;
}

.form-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}

/* Threads Section Styles */
.threads-section {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.threads-section h1 {
  color: rgb(245, 66, 101);
  margin-bottom: 10px;
}
</style>
