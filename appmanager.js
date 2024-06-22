let stone = 0;
let stoneForClick = 1;
let countTap = 10;
let countTapForClick = 1;
let maxCountTap = 10;

function initStone() {
    const stoneImg = document.getElementById('stone');
    const countStone = document.getElementById('countStoneP');
    const countTapCurrency = document.getElementById('CountTap');

    stoneImg.addEventListener('click', clickOnStone);

    getUserStone(tgId.toString(), tgFn.toString(), tgLn.toString(), function (data) {
        if (data !== null) {
            stone = parseInt(data.stone); // Убедимся, что stone является числом
            countTap = parseInt(data.countTap); // Убедимся, что countTap является числом
            countStone.textContent = stone;
            countTapCurrency.textContent = `${countTap}/${maxCountTap}`;
        }
    });

    function clickOnStone() {
        if (countTap > 0) {
            stone += stoneForClick;
            countStone.textContent = stone; // Обновляем текстовое содержимое элемента countStone
            setCountTapCurrency();
            updateUserStone(tgId.toString(), stone); // Обновляем значение в Firebase
            console.log("Текущее значение stone: " + stone);
            updateUserCountTap(tgId.toString(), countTap);
        }
    }

    function setCountTapCurrency() {
        countTap -= countTapForClick;
        countTapCurrency.textContent = `${countTap}/${maxCountTap}`;
    }
}

window.initStone = initStone;