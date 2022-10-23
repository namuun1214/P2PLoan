import { doc as rxDoc } from 'rxfire/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { firebaseConfig } from './firebaseConfig'
// Set up Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const davidDocRef = doc(db, 'users/jBF67aAU1Nxyss4BHi2w');

// Seed the firestore
setDoc(davidDocRef, { name: 'David' });

rxDoc(davidDocRef).subscribe(snapshot => {
  console.log(snapshot.id);
  console.log(snapshot.data());
});