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

function addUser() {
    setDoc(doc(db, "users"), {
        id: tgId,
        stone: 0,
        firstName: tgFn,
        lastName: tgLn,
        countTap: 10
    })
        .then(() => {
            console.log(`User ${userId} added successfully`);
        })
        .catch((e) => {
            console.error("Error adding user: ", e);
        });
}

function updateUserStone(stoneValue) {
    const userRef = doc(db, "users", tgId);
    updateDoc(userRef, {
        stone: stoneValue
    })
        .then(() => {
            console.log(`User ${tgId}'s stone updated to ${stoneValue}`);
        })
        .catch((e) => {
            console.error("Error updating user stone: ", e);
        });
}

function updateUserCountTap(countTapValue) {
    const userRef = doc(db, "users", tgId);
    updateDoc(userRef, {
        countTap: countTapValue
    })
        .then(() => {
            console.log(`User ${tgId}'s countTapValue updated to ${countTapValue}`);
        })
        .catch((e) => {
            console.error("Error updating user countTapValue: ", e);
        });
}

function updateUserDataVisit() {
    const userRef = doc(db, "users", tgId);
    const currentDate = new Date().toLocaleTimeString();
    updateDoc(userRef, {
        date: currentDate
    })
        .then(() => {
            console.log(`User ${tgId}'s curentDate updated to ${currentDate}`)
        })
        .catch((e) => {
            console.error("Error updating user date ", e);
        })
}

function getUserStone(callback) {
    const userRef = doc(db, "users", tgId);
    getDoc(userRef)
        .then((userDoc) => {
            if (userDoc.exists()) {
                console.log(`User ${tgId}'s countTap value is ${userDoc.data().countTap}`);
                console.log(`User ${tgId}'s stone value is ${userDoc.data().stone}`);
                callback({
                    countTap: userDoc.data().countTap,
                    stone: userDoc.data().stone
                });
            } else {
                addUser();
                console.log(`User ${tgId} created with default stone value`);
                callback({ countTap: maxCountTap, stone: 0 });
            }
        })
        .catch((e) => {
            console.error("Error getting user stone: ", e);
            callback(null);
        });
}

async function getUser() {
    try {
        const userRef = doc(db, "users", tgId);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        console.error("Error getting user data: ", e);
        return false;
    }
}

async function getUserCountTap() {
    const userRef = doc(db, "users", tgId.toString());
    try {
        const userDoc = await getDoc(userRef);
        return userDoc.data().countTap;
    } catch (e) {
        console.error("Error getting user date: ", e);
        return null;
    }
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
window.getUser = getUser;
window.getUserCountTap = getUserCountTap;