document.addEventListener("DOMContentLoaded", function () {
    window.keysNumberValue = document.getElementById('keysNumber');
    window.keysNumberValueViewTwo = document.getElementById('keysNumberView2');
    window.keysNumberValueViewThree = document.getElementById('keysNumberView3');
    window.keysPerTapValue = document.getElementById('keysPerTap');
    window.maxTapValue = document.getElementById('maxTap');
    window.timerClickValue = document.getElementById('timerClick');
    window.countFriendValue = document.getElementById('count-friend');

    window.nickNameValue = document.getElementById('nickName');

    window.loadingScreen = document.getElementById('loading-screen');
    window.app = document.getElementById('app');
    window.keyImg = document.getElementById('key-img');

    keyImg.addEventListener("click", clickOnKey);

    window.containerFriends = document.querySelector('.invited-friend');
    window.openBoxes = document.querySelector('.open-boxes');
    window.subscribeDiv = document.querySelector('.subscribe');
    window.groupOne = document.querySelector('#group-1');
    window.newBieBoxContainer = document.querySelector('.gifts-view');
    window.newBieBoxView = document.querySelector('#new-bie-box');

    window.newBieBoxPriceValue = document.querySelector('#new-bie-box-price');
    window.cummonBoxPriceValue = document.querySelector('#cummon-box-price');
    window.rareBoxPriceValue = document.querySelector('#rare-box-price');
    window.appMessageTextValue = document.querySelector('#app-message-text');

    console.log("valueHandler is ready!!!");
});
function updateAllValue() {
    keysNumberValue.textContent = keys;
    keysNumberValueViewTwo.textContent = keys;
    keysNumberValueViewThree.textContent = keys;
    keysPerTapValue.textContent = "+" + keysPerTap;
    maxTapValue.textContent = `${countTap}/${maxCountTap}`;

    // newBieBoxPriceValue.textContent = newBieBoxPrice;
    // cummonBoxPriceValue.textContent = cummonBoxPrice;
    // rareBoxPriceValue.textContent = rareBoxPrice;
}

let rotation = 0;

function clickOnKey() {
    if (countTap > 0) {
        keys += keysPerTap;
        countTap -= 1;
        updateAllValue();
        console.log(keys);
        updateUserDOC();
        startTimer();

        feedBackKlick();

        // animated
        keyImg.style.transform = `rotate(${rotation + 15}deg) scale(0.9)`;

        setTimeout(() => {
            rotation += 30;
            keyImg.style.transform = `rotate(${rotation}deg) scale(1)`;
        }, 100);
    }
}

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if (countTap < maxCountTap) {
            milliseconds -= 100;
            if (milliseconds < 0) {
                countdown--;
                milliseconds = 900;
            }
            if (countdown < 0) {
                countTap++;
                maxTapValue.textContent = `${countTap}/${maxCountTap}`;
                countdown = collDownTap;
                milliseconds = 0;
                updateUserDOC();
            }

            // Вычисляем минуты и секунды из countdown
            let minutes = Math.floor(countdown / 60);
            let seconds = countdown % 60;
            let millis = Math.floor(milliseconds / 100);

            // Форматируем текст без добавления ведущих нулей
            timerClickValue.textContent = `${countdown}.${Math.floor(milliseconds / 100)}`;
        } else {
            timerClickValue.textContent = 'max';
            clearInterval(timerInterval);
        }
    }, 100);
}

function setNickName() {
    nickNameValue.textContent = tgFn + " " + tgLn + " " + tgUs;
}

function hideLoadScreen() {
    loadingScreen.style.display = 'none';
    app.style.display = 'flex';
}

function addFriendLable(firstname, lastname, username, keysValue) {
    const newFriendLabel = document.createElement('div');
    newFriendLabel.classList.add('friend-lable');
    newFriendLabel.innerHTML = `
        <p id="friend-username">НовыйUserName</p>
        <div class="sub-friend-lable">
            <img src="/img/Key.svg" alt="" height="24px" width="24px">
            <p id="friend-keys">10keys</p>
        </div>
    `;
    const newUsername = firstname + " " + lastname + " " + username;
    const newKeys = keysValue;

    newFriendLabel.querySelector('#friend-username').textContent = newUsername;
    newFriendLabel.querySelector('#friend-keys').textContent = newKeys;

    containerFriends.appendChild(newFriendLabel);
}

function addOpenKey(keyString) {
    const newOpenKeyLabel = document.createElement('div');
    newOpenKeyLabel.classList.add('open-keys-lable');
    newOpenKeyLabel.innerHTML = `
    <p id="open-Key" class="open-key-text">emptyKey</p>
                                <div onclick="copyText(this)" class="copy-button">
                                    <p>Copy</p>
                                </div>
    `;

    const newKey = keyString || "second key";

    newOpenKeyLabel.querySelector('#open-Key').textContent = newKey;

    openBoxes.appendChild(newOpenKeyLabel);
}

document.addEventListener('keydown', function (event) {
    if (event.key === 't' || event.key === 'т') {
        togglePopup();
        testWebHook();
    }
});

function togglePopup() {
    const popup = document.getElementById('popup');
    if (popup.classList.contains('hidden')) {
        popup.classList.remove('hidden');
        popup.classList.add('visible');
    } else {
        popup.classList.remove('visible');
        popup.classList.add('hidden');
    }
}

function toggleAppMessage() {
    const appMessageDoc = document.getElementById('app-message');
    if (appMessageDoc.classList.contains('hidden')) {
        appMessageDoc.classList.remove('hidden');
        appMessageDoc.classList.add('visible');
    } else {
        appMessageDoc.classList.remove('visible');
        appMessageDoc.classList.add('hidden');
    }
}

function removeNewBieGift() {
    window.newBieBoxContainer.removeChild(window.newBieBoxView);
}

function testWebHook() {
    const webhookUrl = 'http://localhost:3000/webhook'; // Замените на ваш URL
    const data = {
        userId: tgId.toString()
    };

    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.text())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

window.updateAllValue = updateAllValue;
window.startTimer = startTimer;
window.setNickName = setNickName;
window.hideLoadScreen = hideLoadScreen;
window.addFriendLable = addFriendLable;
window.addOpenKey = addOpenKey;
window.togglePopup = togglePopup;
window.toggleAppMessage = toggleAppMessage;
window.removeNewBieGift = removeNewBieGift;