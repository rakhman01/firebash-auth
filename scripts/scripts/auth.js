import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
  getDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBZHpuYu11bbve-_VgG5XU0fdXRRHoymP8",
  authDomain: "firebash-auth-c981c.firebaseapp.com",
  projectId: "firebash-auth-c981c",
  storageBucket: "firebash-auth-c981c.appspot.com",
  messagingSenderId: "503222486336",
  appId: "1:503222486336:web:a946eabe50df9a8b0be6a5",
  measurementId: "G-KV0SDLVKFM",
};

// initial firebash app
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore(app);

// collection ref
const colRef = collection(db, "guides");
const addUser = collection(db, "users");

// sign up

const signup = document.querySelector("#signup-form");

signup.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = signup["signup-email"].value;
  const password = signup["signup-password"].value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(async (cred) => {
      return await setDoc(doc(db, "users", cred.user.uid), {
        bio: signup["signup-bio"].value,
      })
        .then((val) => {
          console.log(val);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .then(() => {
      // console.log(cred, "values");
      const modal = document.querySelector("#modal-signup");
      M.Modal.getInstance(modal).close();
      signup.reset();
    });
});

// logout

const logout = document.querySelector("#logout");
logout.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    console.log("user logout");
  });
});

// login
const signin = document.querySelector("#login-form");
signin.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = signin["login-email"].value;
  const password = signin["login-password"].value;

  signInWithEmailAndPassword(auth, email, password).then((cred) => {
    // console.log(cred, "user");

    const modal = document.querySelector("#modal-login");
    M.Modal.getInstance(modal).close();
    signin.reset();
  });
});

// listen for auth status changes

// get detail account
const accountDetails = document.querySelector(".account-details");

onAuthStateChanged(auth, (user) => {
  if (user) {
    // detail account
    getDoc(doc(db, "users", user.uid)).then((doc) => {
      const html = `
    <div>
    Login in as ${user.email}
    <div>${doc.data().bio}</div>
    </div>
    `;

      accountDetails.innerHTML = html;
    });

    // // non realtime
    // getDocs((colRef).then((snapshot)))

    // realtime
    onSnapshot(colRef, (snapshot) => {
      setUpGuides(snapshot.docs);
      setupUi(user);
    }),
      (err) => {
        console.log(err);
      };
  } else {
    accountDetails.innerHTML = "";
    setUpGuides([]);
    setupUi(user);
  }
});

// create new guides

const createGuides = document.querySelector("#create-form");
createGuides.addEventListener("submit", (e) => {
  e.preventDefault();
  addDoc(colRef, {
    title: createGuides["title"].value,
    descriptions: createGuides["content"].value,
  })
    .then((val) => {
      const modal = document.querySelector("#modal-create");
      M.Modal.getInstance(modal).close();
      createGuides.reset();
    })
    .catch((err) => {
      console.log(err);
    });
});
