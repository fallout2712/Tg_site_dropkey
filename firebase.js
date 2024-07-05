import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, doc, setDoc, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js"; // Изменена версия на 10.12.2

const firebaseConfig = {
    apiKey: "AIzaSyASnZKIFk7biOHIHE6klRhm_xOdCMuVgRI",
    authDomain: "swixydropkey.firebaseapp.com",
    projectId: "swixydropkey",
    storageBucket: "swixydropkey.appspot.com",
    messagingSenderId: "84094476352",
    appId: "1:84094476352:web:c980af9927ed732f4dbfa5",
    measurementId: "G-1JJS2DJPMP"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
var isAuthSucclefull = false;

signInAnonymously(auth)
    .then(() => {
        console.log("Пользователь анонимно вошел в систему");
        isAuthSucclefull = true;
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`Ошибка: ${errorCode}, ${errorMessage}`);
    });

async function addUser() {
    try {
        if (isAuthSucclefull) {
            await setDoc(doc(db, "users", tgId.toString()), {
                id: tgId,
                firstName: tgFn,
                lastName: tgLn,
                userName: tgUs,
                ref: tgRef,
                isSubscribeGroupOne: isSubscribeGroupOne,
                newbiebox: newBieBox
            });
            console.log(`User ${tgId} added successfully`);
            togglePopup();
            return true;
        }
        else
            return false;
    } catch (e) {
        console.error("Error adding user: ", e);
        return false;
    }
}

async function getUser() {
    const userRef = doc(db, "users", tgId.toString());
    try {
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
            console.log(`User ${tgId} is logged in`);
            return true;
        } else {
            return false;
        }
    } catch (e) {
        console.error("Error ", e);
        return false;
    }
}

async function initUser() {
    try {
        if (!await getUser()) {
            if (await addUser()) {
                await updateUserDOC();
                if (tgRef !== "" && tgRef !== undefined) {
                    await addYourSelfReferal();
                }
            }
        } else {
            await getUserDOC();
            await getMyReferals();
        }
        return true;
    } catch (error) {
        console.error("An error occurred: ", error);
        return false;
    }
}

async function addYourSelfReferal() {
    const userDocRef = doc(db, "users", tgRef.toString());
    const invitedUserDocRef = doc(db, "users", tgId.toString());

    try {
        const userDoc = await getDoc(userDocRef);
        let referals = [];
        let maxCountTap = 0;

        if (userDoc.exists()) {
            referals = userDoc.data().referals || [];
            maxCountTap = userDoc.data().maxCountTap || 0;
            maxCountTap += 2;
        }

        if (!referals.includes(tgId.toString())) {
            referals.push(tgId.toString());
        }

        await setDoc(userDocRef, { referals, maxCountTap }, { merge: true });

        // Добавляем бонус пользователю, который был приглашен
        // const invitedUserDoc = await getDoc(invitedUserDocRef);
        // if (invitedUserDoc.exists()) {
        //     let keys = invitedUserDoc.data().keys || 0;
        //     keys += 20;
        //     await setDoc(invitedUserDocRef, { keys }, { merge: true });
        // }
        console.log(`Referal for user ${tgRef} added successfully with bonus`);
        return true;
    } catch (e) {
        console.error("Error adding referal for user: ", e);
        return false;
    }
}

async function getMyReferals() {
    const userDocRef = doc(db, "users", tgId.toString());
    try {
        // Получаем текущий документ
        const userDoc = await getDoc(userDocRef);
        let referals = [];

        if (userDoc.exists()) {
            referals = userDoc.data().referals || [];
            if (referals.length > 0) {
                countKeys = referals.length;
                countFriendValue.textContent = countKeys;
                const referalPromises = referals.map(async refId => {
                    const refDoc = await getDoc(doc(db, "users", refId));
                    if (refDoc.exists()) {
                        const refData = refDoc.data();
                        addFriendLable(refData.firstName, refData.lastName, refData.userName, refData.keys);
                        return {
                            refId,
                            firstName: refData.firstName,
                            lastName: refData.lastName,
                            userName: refData.userName,
                            keys: refData.keys
                        };
                    } else {
                        return { refId, firstName: "Unknown", lastName: "Unknown", userName: "Unknown", keys: "Unknown" };
                    }
                });

                // Ждем выполнения всех промисов
                const referalData = await Promise.all(referalPromises);

                // Выводим данные каждого реферала
                referalData.forEach(ref => {
                    console.log(`Referal ID: ${ref.refId}, First Name: ${ref.firstName}, Last Name: ${ref.lastName}`);
                });
            }
            console.log(`Getting referals for user ${tgId} is successful`);
            return true;
        }
    } catch (e) {
        console.error("Error getting referals for user: ", e);
        return false;
    }
}

async function openKeydb(typeKey) {
    const dbkeysDocRef = doc(db, "dbkeys", typeKey.toString());
    try {
        const dbkeysDoc = await getDoc(dbkeysDocRef);
        if (dbkeysDoc.exists()) {
            let keys = dbkeysDoc.data().keys || [];
            if (keys.length > 0) {
                let currentKey = keys.shift(); // Извлекаем первый ключ
                await updateDoc(dbkeysDocRef, { keys: keys }); // Обновляем документ, удаляя первый ключ
                return currentKey; // Возвращаем извлеченный ключ
            } else {
                return undefined;
            }
        }
        return true;
    } catch (e) {
        console.error("Error available keys: ", e);
        return false;
    }
}

async function updateUserDOC() {
    const userRef = doc(db, "users", tgId.toString());
    const currentDate = new Date().toLocaleTimeString();
    try {
        await updateDoc(userRef, {
            keys: keys,
            keysPerTap: keysPerTap,
            countTap: countTap,
            maxCountTap: maxCountTap,
            data: currentDate,
            isSubscribeGroupOne: isSubscribeGroupOne,
            newbiebox: newBieBox
        });
        console.log(`User ${tgId} data updates`);
    } catch (e) {
        console.error("Error updating user data ", e);
    }
}

async function getUserDOC() {
    const userRef = doc(db, "users", tgId.toString());
    try {
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
            const userData = userDoc.data();
            keys = userData.keys;
            keysPerTap = userData.keysPerTap;
            countTap = userData.countTap;
            maxCountTap = userData.maxCountTap;
            lastDataVisit = userData.data;
            const ref = userData.ref;
            isSubscribeGroupOne = userData.isSubscribeGroupOne;
            newBieBox = userData.newbiebox;
            console.log(`User data is successful: 
                keys: ${keys}, 
                keysPerTap: ${keysPerTap}, 
                countTap: ${countTap}, 
                maxCountTap: ${maxCountTap},
                lastDataVisit: ${lastDataVisit},
                ref: ${ref},
                isSubscribeGroupOne: ${isSubscribeGroupOne},
                newBieBox: ${newBieBox}`);
        } else {
            console.log("No such document!");
        }
    } catch (e) {
        console.error("Error getting user data: ", e);
    }
}

async function addUserKey(newKey) {
    const userRef = doc(db, "users", tgId.toString());
    try {
        const userDoc = await getDoc(userRef);
        let openkeys = [];
        if (userDoc.exists()) {
            let userData = userDoc.data();
            if (Array.isArray(userData.openkeys)) {
                openkeys = userData.openkeys;
            }
        }
        openkeys.push(newKey);
        await updateDoc(userRef, { openkeys: openkeys });
        return true;
    } catch (e) {
        console.error("Error updating user openkeys: ", e);
        return false;
    }
}

async function getUserKeysAndAddOpenKey() {
    const userRef = doc(db, "users", tgId.toString());
    try {
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
            let userData = userDoc.data();
            if (Array.isArray(userData.openkeys)) {
                if (userData.openkeys.length > 0) {
                    userData.openkeys.forEach(key => {
                        addOpenKey(key);
                    });
                } else {
                    console.log("No keys found for the user.");
                }
            } else {
                console.log("User keys are not in the expected array format.");
            }
        } else {
            console.log("User document does not exist.");
        }
    } catch (e) {
        console.error("Error retrieving user keys: ", e);
    }
}

async function getAppSettings() {
    const settingsRef = doc(db, "appsettings", "boxprices")
    const newsRef = doc(db, "appsettings", "news")
    try {
        const settingsDoc = await getDoc(settingsRef);
        const newsDoc = await getDoc(newsRef);
        newBieBoxPrice = settingsDoc.data().newbie;
        cummonBoxPrice = settingsDoc.data().cummon;
        rareBoxPrice = settingsDoc.data().rare;
        appMessage = newsDoc.data().newsmessage;
        showMessage = newsDoc.data().showmessage;

        newBieBoxPriceValue.textContent = newBieBoxPrice;
        cummonBoxPriceValue.textContent = cummonBoxPrice;
        rareBoxPriceValue.textContent = rareBoxPrice;
        appMessageTextValue.textContent = appMessage;

        if (showMessage)
            toggleAppMessage();

        // console.log("app newBieBoxPrice = " + newBieBoxPrice);
        // console.log("app cummonBoxPrice = " + cummonBoxPrice);
        // console.log("app rareBoxPrice = " + rareBoxPrice);
        // console.log("app message = " + appMessage);
    } catch (e) {
        console.error("Error getUppSettings: ", e);
    }
}

window.addUser = addUser;
window.getUser = getUser;
window.initUser = initUser;
window.updateUserDOC = updateUserDOC;
window.getUserDOC = getUserDOC;
window.openKeydb = openKeydb;
window.addUserKey = addUserKey;
window.getUserKeysAndAddOpenKey = getUserKeysAndAddOpenKey;
window.getUppSettings = getAppSettings;