import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD8UMYYKm9D5LkZFaMhaXgjtmEzhq-h5es",
  authDomain: "video-chat-8228e.firebaseapp.com",
  databaseURL:
    "https://video-chat-8228e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "video-chat-8228e",
  storageBucket: "video-chat-8228e.appspot.com",
  messagingSenderId: "110494878825",
  appId: "1:110494878825:web:dd1374537b6adb0aaf26f8",
  measurementId: "G-ZHQ5KHW87K",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const imgDb = getStorage(app);
const db = getFirestore();
export { imgDb, db ,auth};
