import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBk_EKsQwaN9jAgoDeRGEDSzzOewD0T__g",
  authDomain: "capstone-810c4.firebaseapp.com",
  databaseURL:
    "https://capstone-810c4-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "capstone-810c4",
  storageBucket: "capstone-810c4.appspot.com",
  messagingSenderId: "1050127576221",
  appId: "1:1050127576221:web:14144c0b90b03cc4277874",
  measurementId: "G-ZFPZ49LKZJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// document.addEventListener("click", function () {
const registerButton = document.querySelector("#btndangki");

registerButton.addEventListener("click", async function (e) {
  e.preventDefault();

  // const username = document.querySelector("#username").value;
  // const phone = document.querySelector("#phone").value;
  // const password = document.querySelector("#password").value;

  const username = document.querySelector("input[type='text']").value;
  const email = document.querySelector("input[type='email']").value;
  const password = document.querySelector("input[type='password']").value;
  console.log(username);
  console.log(email);
  console.log(password);
  try {
    // Sử dụng Firebase Authentication API sau khi đã khởi tạo Firebase SDK
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("Đăng ký thành công");
    // Thêm thông tin người dùng vào Firestore
    const uid = userCredential.user.uid;

    await setDoc(doc(db, "Users", uid), {
      username: username,
      email: email,
      // Thêm các trường khác nếu cần
    });
  } catch (error) {
    console.error("Lỗi đăng ký:", error);
  }
});
// });
