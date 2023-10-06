// import { initializeApp, getApps } from "firebase/app"
// import { getFirestore } from "firebase/firestore"
// import { getAuth } from "firebase/auth"

// const firebaseConfig = {
//   apiKey: "AIzaSyD-GHYoQAaRs4f5qkx9f9L4DC7U5PWA_3E",
//   authDomain: "taskapp-96459.firebaseapp.com",
//   projectId: "taskapp-96459",
//   storageBucket: "taskapp-96459.appspot.com",
//   messagingSenderId: "403124550547",
//   appId: "1:403124550547:web:411a0bf29cd8a166a94666",
//   measurementId: "G-84W8K6FVCS"
// };

// class Fire {
//   constructor(callback) {
//     this.init(callback);
//   }

//   init(callback) {
//     if (!getApps().length) {
//       initializeApp(firebaseConfig);
//     }

//     const app = initializeApp(firebaseConfig)

//     const db = getFirestore(app)
//     const auth = getAuth(app)



//     getAuth().onAuthStateChanged(user => {
//       if (user) {
//         callback(null, user);
//       } else {
//         getAuth().signInAnonymously().catch(error => {
//           callback(error);
//         });
//       }
//     });
//   }
//   getLists(callback) {
//     let ref = firebase.firestore().collection("users").doc(this.userId).collection("lists");

//     this.unsubscribe = ref.onSnapshot(snapshot => {
//       lists = [];

//       snapshot.forEach(doc => {
//         lists.push({ id: doc.id, ...doc.date() });
//       });

//       callback(lists);
//     })
//   }
//   get userId() {
//     return firebase.auth().currentUser.uid;
//   }
// }

// export default Fire;