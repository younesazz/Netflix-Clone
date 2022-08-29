// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCrEWWIB6LQkCKuvBMlYJweG6zkL1CV-3I",
    authDomain: "netflix-auth-5dc10.firebaseapp.com",
    projectId: "netflix-auth-5dc10",
    storageBucket: "netflix-auth-5dc10.appspot.com",
    messagingSenderId: "555709765643",
    appId: "1:555709765643:web:eed8f2d5ee6b0b0a9f0f0e",
    measurementId: "G-G0KMCR5GYQ"
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }