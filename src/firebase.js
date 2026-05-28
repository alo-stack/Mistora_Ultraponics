import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDKW78SpOM7nXhKKvwTTLOigBsvcTc0HWc',
  authDomain: 'mistora-fb941.firebaseapp.com',
  projectId: 'mistora-fb941',
  storageBucket: 'mistora-fb941.firebasestorage.app',
  messagingSenderId: '1030181457819',
  appId: '1:1030181457819:web:88839619b091c6a2b79b3e',
}

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export { app, auth, db, storage }