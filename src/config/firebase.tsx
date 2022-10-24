// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDD1Nuw23NZL-_mheQRtZCnmQjpBLmXASg',
  authDomain: 'p2ploan-db324.firebaseapp.com',
  projectId: 'p2ploan-db324',
  storageBucket: 'p2ploan-db324.appspot.com',
  messagingSenderId: '599828910166',
  appId: '1:599828910166:web:d1b9c1da3d825043db6bf7',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const authentication = getAuth(app)
