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

    getUserStone(tgId.toString(), tgFn.toString(), tgLn.toString(), function (stoneValue) { // Передаем firstname и lastname
        if (stoneValue !== null) {
            stone = parseInt(stoneValue); // Убедимся, что stone является числом
            countStone.textContent = stone;
        }
    });

    function clickOnStone() {
        if (maxCountTap > 0) {
            stone += stoneForClick;
            countStone.textContent = stone; // Обновляем текстовое содержимое элемента countStone
            setCountTapCurrency();
            updateUserStone(tgId.toString(), stone); // Обновляем значение в Firebase
            console.log("Текущее значение stone: " + stone);
        }
    }

    function setCountTapCurrency() {
        maxCountTap -= countTapForClick;
        countTapCurrency.textContent = `${maxCountTap}/${countTap}`;
    }
};

window.initStone = initStone;