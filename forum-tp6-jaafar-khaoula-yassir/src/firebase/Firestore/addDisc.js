import { projectFirestore } from '../Config.js'

const addNewThread = async (uid, data) => {
  const data2 = {
    title: data.title,
    content: data.content,
    author: uid,
    tags: data.tags,
    answers: []
  }
  const threadRef = await projectFirestore.collection('threads').add(data2);
  const threadID = threadRef.id;

  const usersRef = projectFirestore.collection('users').doc(uid);
  const user = await usersRef.get();
  const currentThreads = user.data().threads || [];
  currentThreads.push(threadID);
  await usersRef.update({ threads: currentThreads });
}

const appendAnswerToThread = async (threadId, uid, msg) => {
  const threadRef = projectFirestore.collection('threads').doc(threadId);

  try {
      const threadDoc = await threadRef.get();
      if (!threadDoc.exists) {
          throw new Error('Thread document does not exist.');
      }
      const currentAnswers = threadDoc.data().answers || [];
      currentAnswers.push({message: msg, author: uid});
      await threadRef.update({ answers: currentAnswers });
      console.log('Answer appended successfully!');
  } catch (error) {
      console.error('Error appending answer:', error);
  }
};


export {addNewThread, appendAnswerToThread}