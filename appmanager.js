var keys = 0;
var keysPerTap = 1;

var countTap = 10;
var maxCountTap = 10;

var currentDataVisit;
var lastDataVisit = new Date().toLocaleTimeString();

var collDownTap = 10;
var timerInterval;
var countdown = collDownTap;
var milliseconds = 0;

var countKeys = 0;

var isSubscribeGroupOne = false;

var newBieBox = false;

// appSettings

var showMessage = false;
var appMessage = "test message";

// boxPrices

var newBieBoxPrice = 200;
var cummonBoxPrice = 1000;
var rareBoxPrice = 5000;

function initApp() {
    document.querySelectorAll('.bottom-menu button').forEach(button => {
        button.addEventListener('click', function () {
            const tabId = this.getAttribute('data-tab');

            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });

            const activeContent = document.getElementById(tabId);
            activeContent.classList.add('active');

            document.querySelectorAll('.bottom-menu button').forEach(btn => {
                btn.classList.remove('active');
            });

            this.classList.add('active');

            // Изменение фона
            const container = document.querySelector('.content-container');
            container.classList.remove('animated'); // Убираем класс animated перед изменением цвета
            container.style.backgroundColor = '#3b4257'; // Устанавливаем временный цвет

            setTimeout(() => {
                container.classList.add('animated'); // Добавляем класс animated для изменения цвета
            }, 10); // Небольшая задержка для запуска анимации

            // Возвращаем цвет фона после окончания анимации
            setTimeout(() => {
                container.style.backgroundColor = '#1E222C'; // Возвращаем исходный цвет
            }, 210); // Задержка равна продолжительности анимации (300 мс) + небольшой запас
        });
    });

    currentDataVisit = new Date().toLocaleTimeString();
    console.log("Current visit " + currentDataVisit);
}

function differenceDate() {
    const currentVisitDate = parseTimeString(currentDataVisit);
    const lastDateVisitDate = parseTimeString(lastDataVisit);

    const differenceInMilliseconds = currentVisitDate - lastDateVisitDate;

    const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);

    console.log(`Время оффлайн: ${differenceInSeconds} секунд`);

    if (countTap < maxCountTap) {
        const addTap = Math.ceil(differenceInSeconds / collDownTap);
        console.log("Бонус за время оффлайн = " + addTap + " тапам");

        if (addTap < 0) {
            countTap = maxCountTap;
            updateUserDOC();
            console.log("Скорее всего это следующий день так что тапы на максимум");
        }
        else if ((countTap + addTap) > maxCountTap) {
            countTap = maxCountTap;
            updateUserDOC();
            console.log("Большой бонус = " + addTap + " значит тапы равны максимуму");

        } else {
            countTap += addTap;
            updateUserDOC();
            console.log("Добавлено вот столлько = " + addTap + " тапов");
        }
    }
}

function parseTimeString(timeString) {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, seconds, 0);
    return date;
}

function inviteFriend() {
    const messageText = "t.me/SwixyKeyDrop_bot/DropKey?startapp=" + tgId;
    const telegramLink = `https://t.me/share/url?url=${encodeURIComponent(messageText)}&text=`;
    Telegram.WebApp.openTelegramLink(telegramLink);
    console.log("inviteFriend complete");
}

function subscriptionOnGroupOne() {
    const groupLink = "https://t.me/keydroptg";
    Telegram.WebApp.openTelegramLink(groupLink);


    isSubscribeGroupOne = true;
    keysPerTap += 2;
    updateAllValue();
    updateUserDOC();

    console.log("subscriptionOnGroupOne open complete");

    setTimeout(switchSubscribeGroupOne, 5000);
}

function switchSubscribeGroupOne() {
    const newElement = document.createElement('div');
    newElement.classList.add('conditions-completed');
    newElement.innerHTML = `
        <p>Completed</p>
    `;

    subscribeDiv.removeChild(groupOne);

    subscribeDiv.appendChild(newElement);
}

function upgradeClick() {
    if (keys >= 100) {
        keys -= 100;
        keysPerTap += 1;
        updateAllValue();
        updateUserDOC();
        console.log("Keys per Tap upgraded");
    }
    else
        console.log("No keys");
}

async function GetKey(typeKey) {
    switch (typeKey) {
        case "lowkeys":
            if (keys >= newBieBoxPrice) {
                keys -= newBieBoxPrice;
                newBieBox = true;
                removeNewBieGift();
                updateAllValue();
                updateUserDOC();
                const key = await openKeydb(typeKey);
                addOpenKey(key);
                await addUserKey(key);
            }
            break;
        case "midkeys":
            if (keys >= cummonBoxPrice) {
                keys -= cummonBoxPrice;
                updateAllValue();
                updateUserDOC();
                const key = await openKeydb(typeKey);
                addOpenKey(key);
                await addUserKey(key);
            }
            break;
        case "hightkeys":
            if (keys >= rareBoxPrice) {
                keys -= rareBoxPrice;
                updateAllValue();
                updateUserDOC();
                const key = await openKeydb(typeKey);
                addOpenKey(key);
                await addUserKey(key);
            }
            break;

        default:
            break;
    }

}

function copyText(buttonElement) {
    // Получаем родительский элемент
    const parentElement = buttonElement.parentElement;
    // Находим элемент <p> внутри родительского элемента
    const textElement = parentElement.querySelector('.open-key-text');
    const text = textElement.innerText; // или textElement.textContent

    // Создаем временный элемент для хранения текста
    const tempTextArea = document.createElement("textarea");
    tempTextArea.value = text;

    // Добавляем элемент на страницу (не отображая его)
    document.body.appendChild(tempTextArea);

    // Выделяем текст в текстовом поле
    tempTextArea.select();
    tempTextArea.setSelectionRange(0, 99999); // Для мобильных устройств

    // Копируем выделенный текст в буфер обмена
    document.execCommand("copy");

    // Удаляем временный элемент
    document.body.removeChild(tempTextArea);

    // Можно добавить уведомление или сообщение о том, что текст был скопирован
    console.log("Text copied to clipboard:", text);
}

window.initApp = initApp;
window.differenceDate = differenceDate;
window.switchSubscribeGroupOne = switchSubscribeGroupOne;
