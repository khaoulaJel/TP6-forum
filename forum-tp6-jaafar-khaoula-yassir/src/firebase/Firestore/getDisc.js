import  firebase  from "firebase/app";
import "firebase/firestore";
import { projectFirestore } from '../Config.js'
import { ref } from 'vue'

const getthread = (id) => {

  const post = ref({});
  const error = ref(null);

  const load = async () => {
    try {
      let res = await projectFirestore.collection('threads').doc(id).get()
      if (!res.exists) {
        throw Error('That post does not exist')
      }
      post.value = { ...res.data(), id: res.id }
    }
    catch(err) {
      error.value = err.message
    }
  }

  return { post, error, load } 
}

const getThreadsByIds = (ids) => {
  const posts = ref([]);
  const error = ref(null);

  const load = async () => { 
    try {
      const querySnapshot = await projectFirestore.collection('threads')
      .where(firebase.firestore.FieldPath.documentId(), 'in', ids)
      .get();
      
      const documents = [];
      querySnapshot.forEach((doc) => {
        documents.push({ id: doc.id, ...doc.data() });
      });
      posts.value = documents;
    }
    catch(err) {
      error.value = err.message
    }
  }

  return {posts, error, load}
}

export { getthread, getThreadsByIds}