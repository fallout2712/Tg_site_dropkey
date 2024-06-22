let stone = 0;
let stoneForClick = 1;
let countTap = 10;
let countTapForClick = 1;
let maxCountTap = 10;
let timerInterval;
let countdown = 10;
let milliseconds = 0;

function initStone() {
    const stoneImg = document.getElementById('stone');
    const pickToolImg = document.getElementById('PickTool');
    const countStone = document.getElementById('countStoneP');
    const countTapCurrency = document.getElementById('CountTap');
    const timeCountTap = document.getElementById('TimeCountTap');

    stoneImg.addEventListener('click', clickOnStone);

    getUserStone(tgId.toString(), tgFn.toString(), tgLn.toString(), function (data) {
        if (data !== null) {
            stone = parseInt(data.stone); // Убедимся, что stone является числом
            countTap = parseInt(data.countTap); // Убедимся, что countTap является числом
            countStone.textContent = stone;
            countTapCurrency.textContent = `${countTap}/${maxCountTap}`; // Обновляем текстовое содержимое элемента countTapCurrency
            startTimer(); // Запускаем таймер после получения данных пользователя
        }
    });

    function clickOnStone() {
        if (countTap > 0) {
            stone += stoneForClick;
            countTap -= countTapForClick;
            countStone.textContent = stone; // Обновляем текстовое содержимое элемента countStone
            countTapCurrency.textContent = `${countTap}/${maxCountTap}`; // Обновляем текстовое содержимое элемента countTapCurrency
            updateUserStone(tgId.toString(), stone); // Обновляем значение в Firebase
            updateUserCountTap(tgId.toString(), countTap); // Обновляем значение countTap в Firebase
            console.log("Текущее значение stone: " + stone);

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
                    updateUserCountTap(tgId.toString(), countTap);
                    countTapCurrency.textContent = `${countTap}/${maxCountTap}`;
                    countdown = 10; // Сбрасываем таймер
                    milliseconds = 0;
                }
                timeCountTap.textContent = `${countdown}.${Math.floor(milliseconds / 100)}`;
            } else {
                timeCountTap.textContent = '';
                clearInterval(timerInterval);
            }
        }, 100);
    }
}

window.initStone = initStone;