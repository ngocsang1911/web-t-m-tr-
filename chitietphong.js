import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  deleteDoc,
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
const db = getFirestore(app);

const urlParams = new URLSearchParams(window.location.search);
const roomID = urlParams.get("roomID");
console.log(roomID);
// http://127.0.0.1:5500/demo/chitietphong.html?roomID=DGwOwGNAbEYncQIVxxhh

if (roomID) {
  // Nếu có giá trị 'roomID', thực hiện lấy thông tin phòng từ Firestore và điền vào biểu mẫu
  try {
    const roomDocRef = doc(db, "rooms", roomID);
    const docSnapshot = await getDoc(roomDocRef);
    if (docSnapshot.exists()) {
      const roomData = docSnapshot.data();
      console.log(docSnapshot.data());

      // Lấy tất cả các key của đối tượng roomData
      const roomKeys = Object.keys(roomData);
      console.log(roomData[roomKeys[0]]);

      const detailRoom = document.getElementById("room-detail");
      detailRoom.innerHTML = "";
      const roomCard = document.createElement("div");
      roomCard.innerHTML = `
        <h1 class="title">${roomData[roomKeys[0]]?.tieuDeBaiDang}</h1>
        <p class="address">Địa chỉ: Đường Lương Thế Vinh, Thanh Xuân, Hà Nội</p>
        <div class="info_price">
          <p class="">
            <span class="price">${
              roomData[roomKeys[0]]?.giaChoThue
            } triệu/tháng</span>
            <span class="acreage">${roomData[roomKeys[0]]?.dienTich}m2</span>
          </p>
          <p class="save_story">Lưu tin này</p>
        </div>
  
        <div class="container_product">
          <div class="image_detail">
            <img
              src="${roomData[roomKeys[0]]?.anh}"
              alt=""
              style="width: 100%; aspect-ratio: 16/9"
            />
          </div>
          <div class="profile">
            <div class="profile_model">
              <div class="profile_avt">
                <img
                  src="/demo/img/bg login.jpg"
                  alt=""
                  style="
                    width: 25%;
                    aspect-ratio: 1/1;
                    border-radius: 100rem;
                    object-fit: cover;
                  "
                />
                <div style="display: flex; flex-direction: column">
                  <span>Quang</span>
                  <a href="#">Xem trang cá nhân</a>
                  <p>Hoạt động gần đây</p>
                </div>
              </div>
  
              <button type="button" class="btn btn-primary">${
                roomData[roomKeys[0]]?.soDienThoai
              }</button>
              <button type="button" class="btn btn-secondary">Nhắn zalo</button>
            </div>
            <div class="profile_button">
              <button class="btn btn-primary editRoomButton" style="width: 48%">
                Sửa
              </button>
              <button class="btn btn-danger deleteRoomButton" style="width: 48%">
                Xóa
              </button>
            </div>
            <ul style="margin-top: 20px">
            <li>An Ninh: ${
              roomData[roomKeys[0]]?.tienich?.AnNinh === true ? "Có" : "Không"
            }</li>
            <li>Chỗ để xe: ${
              roomData[roomKeys[0]]?.tienich?.ChoDeXe === true ? "Có" : "Không"
            }</li>
            <li>Giờ giấc tự do: ${
              roomData[roomKeys[0]]?.tienich?.GioGiacTuDo === true
                ? "Có"
                : "Không"
            }</li>
            <li>WC riêng: ${
              roomData[roomKeys[0]]?.tienich?.WC_Rieng === true ? "Có" : "Không"
            }</li>
            <li>Wifi: ${
              roomData[roomKeys[0]]?.tienich?.Wifi === true ? "Có" : "Không"
            }</li>
           
          </ul>
          </div>
        </div>
  
        <div class="description_product" style="margin-top: 20px">
          
          <h3 style="text-decoration: underline; padding-top: 20px">
            Thông tin mô tả
          </h3>
          <p
            style="padding: 10px; background-color: #f5f5f5; border-radius: 10px"
          >
            <span
              >${roomData[roomKeys[0]]?.noiDungMoTa}</span
            >
          </p>
          <h3 style="text-decoration: underline; padding-top: 20px">
            Vị trí trên bản đồ
          </h3>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d35436.81397300299!2d105.82522097737045!3d20.999188593668975!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac9b3f23b42b%3A0x49fa01aaa06d239b!2sVinhomes%20Royal%20City!5e0!3m2!1svi!2s!4v1699431732554!5m2!1svi!2s"
            width="600"
            height="350"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
    `;

      detailRoom.appendChild(roomCard);
      // Kiểm tra xem có key nào không
      // Điền thông tin phòng vào các ô input trong biểu mẫu

      // Cập nhật thông tin phòng trong Firestore
    }
  } catch (error) {
    console.error("Lỗi khi lấy thông tin phòng:", error);
  }
} else {
  console.log("Không có giá trị 'roomID' trong URL.");
}

const editButton = document.querySelector(".editRoomButton");
editButton.addEventListener("click", () => {
  // Chuyển hướng sang trang sửa phòng với roomID
  window.location.href = `suaphong.html?roomID=${roomID}`;
});

const deleteButton = document.querySelector(".deleteRoomButton");
deleteButton.addEventListener("click", async () => {
  // Hiển thị thông báo xác nhận
  const isConfirmed = confirm("Bạn có chắc chắn muốn xóa phòng này?");

  if (isConfirmed) {
    try {
      const roomDocRef = doc(db, "rooms", roomID);

      // Xóa tài liệu từ Firestore
      await deleteDoc(roomDocRef);
      window.location.href = `trangchu.html`;
      console.log("Đã xóa phòng:", roomID);
      // Hoặc thực hiện các bước khác sau khi xóa
    } catch (error) {
      console.error("Lỗi khi xóa phòng:", error);
    }
  }
});
