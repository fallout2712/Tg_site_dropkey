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

function addUser(userId, firstname, lastname) {
    setDoc(doc(db, "users", userId), {
        id: userId,
        stone: 0,
        firstName: firstname,
        lastName: lastname,
        countTap: 10
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

function updateUserCountTap(userId, countTapValue) {
    const userRef = doc(db, "users", userId);
    updateDoc(userRef, {
        countTap: countTapValue
    })
        .then(() => {
            console.log(`User ${userId}'s countTapValue updated to ${countTapValue}`);
        })
        .catch((e) => {
            console.error("Error updating user countTapValue: ", e);
        });
}

function updateUserDataVisit(userId) {
    const userRef = doc(db, "users", userId);
    const currentDate = new Date().toLocaleTimeString();
    updateDoc(userRef, {
        date: currentDate
    })
        .then(() => {
            console.log(`User ${userId}'s curentDate updated to ${currentDate}`)
        })
        .catch((e) => {
            console.error("Error updating user date ", e);
        })
}

function getUserStone(userId, firstname, lastname, callback) {
    const userRef = doc(db, "users", userId);
    getDoc(userRef)
        .then((userDoc) => {
            if (userDoc.exists()) {
                console.log(`User ${userId}'s countTap value is ${userDoc.data().countTap}`);
                console.log(`User ${userId}'s stone value is ${userDoc.data().stone}`);
                callback({
                    countTap: userDoc.data().countTap,
                    stone: userDoc.data().stone
                });
            } else {
                addUser(userId, firstname, lastname);
                console.log(`User ${userId} created with default stone value`);
                callback({ countTap: maxCountTap, stone: 0 });
            }
        })
        .catch((e) => {
            console.error("Error getting user stone: ", e);
            callback(null);
        });
}

async function getUserDateVisit() {
    const userRef = doc(db, "users", tgId.toString());
    try {
        const userDoc = await getDoc(userRef);
        console.log(`User ${tgId.toString()}'s lastDateVisit is ${userDoc.data().date}`);
        return userDoc.data().date;
    } catch (e) {
        console.error("Error getting user date: ", e);
        return null;
    }
}

window.addUser = addUser;
window.updateUserStone = updateUserStone;
window.getUserStone = getUserStone;
window.updateUserCountTap = updateUserCountTap;
window.updateUserDataVisit = updateUserDataVisit;
window.getUserDateVisit = getUserDateVisit;