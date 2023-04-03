import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyA7SCGqF2x65Twkln9fEgk29UEDwHamUzU",
  authDomain: "freetrade-fc705.firebaseapp.com",
  databaseURL: "https://freetrade-fc705-default-rtdb.firebaseio.com",
  projectId: "freetrade-fc705",
  storageBucket: "freetrade-fc705.appspot.com",
  messagingSenderId: "836632075133",
  appId: "1:836632075133:web:0212b000d67089697f8a14",
  measurementId: "G-6QYEZGCQMM"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)





// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth"
// import { getFirestore } from "firebase/firestore"

// const firebaseConfig = {
//   apiKey: "AIzaSyC8oXpOUo1lTLCMSsbjbSFRLJgVzayGJAk",
//   authDomain: "dashboard-05-3071d.firebaseapp.com",
//   projectId: "dashboard-05-3071d",
//   storageBucket: "dashboard-05-3071d.appspot.com",
//   messagingSenderId: "572309418989",
//   appId: "1:572309418989:web:ea2efe43f9bcde4645ede4"
// };

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const db = getFirestore(app)
