import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, doc, setDoc, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCSTTDg2lpmenBoE7Xyd9vINeKlVkTZXcg",
    authDomain: "lastmessage-dfda7.firebaseapp.com",
    projectId: "lastmessage-dfda7",
    storageBucket: "lastmessage-dfda7",
    messagingSenderId: "684419376412",
    appId: "1:684419376412:web:63197e61625039b026c6d9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function addUser(userId) {
    setDoc(doc(db, "users", userId), {
        id: userId,
        stone: 0 // инициализация поля stone
    })
        .then(() => {
            console.log(`User ${userId} added successfully`);
        })
        .catch((e) => {
            console.error("Error adding user: ", e);
        });
}

function updateUserStone(userId, stoneValue) {
    const userRef = doc(db, "users", userId);
    updateDoc(userRef, {
        stone: stoneValue
    })
        .then(() => {
            console.log(`User ${userId}'s stone updated to ${stoneValue}`);
        })
        .catch((e) => {
            console.error("Error updating user stone: ", e);
        });
}

function getUserStone(userId, callback) {
    const userRef = doc(db, "users", userId);
    getDoc(userRef)
        .then((userDoc) => {
            if (userDoc.exists()) {
                console.log(`User ${userId}'s stone value is ${userDoc.data().stone}`);
                callback(userDoc.data().stone);
            } else {
                addUser(userId); // Создаем пользователя, если он не существует
                console.log(`User ${userId} created with default stone value`);
                callback(0); // Возвращаем значение по умолчанию
            }
        })
        .catch((e) => {
            console.error("Error getting user stone: ", e);
            callback(null);
        });
}

window.addUser = addUser;
window.updateUserStone = updateUserStone;
window.getUserStone = getUserStone;