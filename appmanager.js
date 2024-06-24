let stone = 0;
let stoneForClick = 1;
let countTap = 10;
let countTapForClick = 1;
let maxCountTap = 10;
let timerInterval;
let countdown = 10;
let milliseconds = 0;
let lastVisit = "";
let currentVisit = "";

function initStone() {
    const stoneImg = document.getElementById('stone');
    const pickToolImg = document.getElementById('PickTool');
    const countStone = document.getElementById('countStoneP');
    const countTapCurrency = document.getElementById('CountTap');
    const timeCountTap = document.getElementById('TimeCountTap');

    currentVisit = new Date().toLocaleTimeString();
    console.log("Current visit " + currentVisit);

    stoneImg.addEventListener('click', clickOnStone);

    getUserStone(function (data) {
        if (data !== null) {
            stone = parseInt(data.stone);
            countTap = parseInt(data.countTap);
            countStone.textContent = stone;
            countTapCurrency.textContent = `${countTap}/${maxCountTap}`;
            checkTimeOffline();
            startTimer();
        }
    });

    function clickOnStone() {
        if (countTap > 0) {
            stone += stoneForClick;
            countTap -= countTapForClick;
            countStone.textContent = stone;
            countTapCurrency.textContent = `${countTap}/${maxCountTap}`;
            updateUserStone(stone);
            updateUserCountTap(countTap);
            updateUserDataVisit();
            console.log("Текущее значение stone: " + stone);
            console.log(getUser());

            // Добавляем анимацию
            stoneImg.classList.add('stoneClick');
            setTimeout(() => {
                stoneImg.classList.remove('stoneClick');
            }, 300); // Время должно совпадать с длительностью анимации

            startTimer();
        }
        else {
            pickToolImg.classList.add('noneCountTap');
            setTimeout(() => {
                pickToolImg.classList.remove('noneCountTap');
            }, 300); // Время должно совпадать с длительностью анимации
        }
    }

    function startTimer() {
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            if (countTap < maxCountTap) {
                milliseconds -= 100;
                if (milliseconds <= 0) {
                    countdown--;
                    milliseconds = 900;
                }
                if (countdown <= 0) {
                    countTap++;
                    updateUserCountTap(countTap);
                    countTapCurrency.textContent = `${countTap}/${maxCountTap}`;
                    countdown = 10;
                    milliseconds = 0;
                }
                timeCountTap.textContent = `${countdown}.${Math.floor(milliseconds / 100)}`;
            } else {
                timeCountTap.textContent = '';
                clearInterval(timerInterval);
            }
        }, 100);
    }

    countTap = getUserCountTap();
}

function parseTimeString(timeString) {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, seconds, 0);
    return date;
}

function differenceDate() {
    const currentVisitDate = parseTimeString(currentVisit);
    const lastDateVisitDate = parseTimeString(lastVisit);

    const differenceInMilliseconds = currentVisitDate - lastDateVisitDate;

    const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);

    console.log(`Время оффлайн: ${differenceInSeconds} секунд`);

    if (countTap < maxCountTap) {
        const addTap = Math.ceil(differenceInSeconds / 10);
        console.log("Бонус за время оффлайн = " + addTap + " тапам");

        if (addTap < 0) {
            updateUserCountTap(maxCountTap);
            console.log("Скорее всего это следующий день так что тапы на максимум");
        }
        else if ((countTap + addTap) > maxCountTap) {
            updateUserCountTap(maxCountTap);
            console.log("Большой бонус = " + addTap + " значит тапы равны максимуму");

        } else {
            updateUserCountTap((countTap + addTap));
            console.log("Добавлено вот столлько = " + addTap + " тапов");
        }
    }
}

async function checkTimeOffline() {
    try {
        lastVisit = await getUserDateVisit();
        if (lastVisit) {
            differenceDate();
        }
    } catch (error) {
        console.error('Ошибка при выполнении основной функции testDrive:', error);
    }
}

window.initStone = initStone;