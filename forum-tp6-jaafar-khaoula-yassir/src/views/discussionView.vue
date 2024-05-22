<template>
  <div class="discussion">
    <Thread :thread="mainThread" />

    <div v-if="replies && replies.length > 0" class="replies">
      <h3>Replies</h3>
      <ThreadReply v-for="reply in replies" :key="reply.id" :reply="reply" />
    </div>

    <div v-if="canReply" class="reply-form">
      <h3>Add a Reply</h3>
      <textarea v-model="newReplyContent" placeholder="Type your reply here..." class="reply-input"></textarea>
      <button @click="addReply" class="reply-button">Reply</button>
    </div>
  </div>
</template>

<script>
import Thread from '@/components/SingleDiscussion.vue'; 
import ThreadReply from '@/components/ReponseDiscussion.vue'; 
import { getUserById, getUser } from '@/firebase/Authentification/getUser';
import { getthread } from '@/firebase/Firestore/getDisc.js'
import { appendAnswerToThread } from '@/firebase/Firestore/addDisc.js';

export default {
  name: 'DiscussionView',
  components: {
    Thread,
    ThreadReply
  },
  data() {
    return {
      mainThread: null,
      replies: [],
      canReply: true, 
      newReplyContent: '' 
    };
  },
  async created() {
    const { post, load } = getthread(this.$route.params.id);
    await load();
    this.mainThread = post.value;
    // Fetch all replies
    this.replies = post.value.answers || []; 
  },
  methods: {
    async addReply() {
      if (this.newReplyContent.trim() !== '') {
        const newReply = {
          content: this.newReplyContent,
          author: getUser().uid, 
        };
        await appendAnswerToThread(this.$route.params.id, newReply.author, newReply.content);
        window.location.reload(); 
      }
    },
    async getuser(id) {
        const user = await getUserById(id);
        return user.displayName;
    }
  }
};
</script>

<style scoped>
.discussion {
  background-color: #fafafa; 
  border: 1px solid #dbdbdb; 
  border-radius: 5px;
  padding: 20px;
}

.replies {
  margin-top: 20px;
}

.replies h3 {
  font-size: 16px;
  margin-bottom: 10px;
  color: #262626;
}

.reply-form {
  margin-top: 20px;
}

.reply-form h3 {
  font-size: 16px;
  margin-bottom: 10px;
  color: #262626; 
}

.reply-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #dbdbdb; 
  border-radius: 5px;
  font-size: 16px;
  margin-bottom: 10px;
}

.reply-button {
  background-color: rgb(245, 66, 101);
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.reply-button:hover {
  background-color: rgb(189, 28, 60);
}
</style>
