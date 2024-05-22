const firebase = require("firebase/app");
require("firebase/firestore");

const firebaseConfig = {
    apiKey: "AIzaSyD2Yiu2oQs_Ai85i6qpQ_5Is0PovFCdWkw",
    authDomain: "js-project-a0dca.firebaseapp.com",
    projectId: "js-project-a0dca",
    storageBucket: "js-project-a0dca.appspot.com",
    messagingSenderId: "507313056295",
    appId: "1:507313056295:web:470cc2a9eb0e500e317c02",
    measurementId: "G-NPBXBLZ1MM"
  };
firebase.initializeApp(firebaseConfig);

// Access Firestore
const db = firebase.firestore();

const sampleThreads = [
  {
    title: "Building a Real-Time Chat App with Vue.js and Firebase",
    content:
      "Explore the power of Vue.js and Firebase to create a dynamic and interactive chat application for real-time communication.",
    author: "Alice Jones", // User Name
    tags: ["Vue.js", "Firebase", "Chat App", "Real-Time"],
    answers: [],
  },
  {
    title: "Optimizing Website Performance with Lighthouse",
    content:
      "Learn how to leverage Google Lighthouse to identify performance bottlenecks and optimize your website for faster loading times and better user experience.",
    author: "Bob Smith", // User Name
    tags: ["Performance Optimization", "Lighthouse", "SEO", "Web Development"],
    answers: [],
  },
  {
    title: "Mastering CSS Grid Layout for Responsive Design",
    content:
      "Unlock the potential of CSS Grid to create complex and responsive layouts for your web applications, ensuring a seamless experience across different devices.",
    author: "Charlie Brown", 
    tags: ["CSS Grid", "Responsive Design", "Web Design", "Frontend Development"],
    answers: [],
  },
  {
    title: "The Power of TypeScript for Building Scalable Applications",
    content:
      "Discover how TypeScript can enhance your development workflow by adding type safety and static checking features, leading to more robust and scalable applications.",
    author: "Diana Lee", 
    tags: ["TypeScript", "Type Safety", "Scalability", "Software Development"],
    answers: [],
  },
  {
    title: "Leveraging Machine Learning for Image Recognition Projects",
    content:
      "Dive into the world of machine learning and explore how to build image recognition applications using popular libraries like TensorFlow or PyTorch.",
    author: "Emma Garcia", 
    tags: ["Machine Learning", "Image Recognition", "TensorFlow", "Artificial Intelligence"],
    answers: [],
  },
];

const sampleUsers = [
  { uid: "Alice Jones", threads: [] },
  { uid: "Bob Smith", threads: [] },
  { uid: "Charlie Brown", threads: [] },
  { uid: "Diana Lee", threads: [] },
  { uid: "Emma Garcia", threads: [] }
];

// Function to add users to Firestore
const addUsersToFirestore = async (usersData) => {
  try {
    for (const user of usersData) {
      await db.collection("users").doc(user.uid).set(user);
      console.log(`User ${user.uid} added successfully`);
    }
  } catch (error) {
    console.error("Error adding users to Firestore: ", error);
  }
};

// Function to add threads to Firestore and update user documents
const addThreadsToFirestore = async (threadsData) => {
  try {
    for (const thread of threadsData) {
      const threadRef = await db.collection("threads").add(thread);
      const threadID = threadRef.id;

      const userRef = db.collection("users").doc(thread.author);
      const userDoc = await userRef.get();
      if (!userDoc.exists) {
        console.error(`User document for ${thread.author} does not exist.`);
        continue;
      }
      const currentThreads = userDoc.data().threads || [];
      currentThreads.push(threadID);
      await userRef.update({ threads: currentThreads });
      console.log(`Thread ${threadID} added by user ${thread.author}`);
    }
  } catch (error) {
    console.error("Error adding threads to Firestore: ", error);
  }
};

// Call the functions to add data to Firestore
const populateFirestore = async () => {
  await addUsersToFirestore(sampleUsers);
  await addThreadsToFirestore(sampleThreads);
};

populateFirestore();
