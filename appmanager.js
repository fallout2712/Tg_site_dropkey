let stone = 0;
let stoneForClick = 1;

function initStone() {
    const stoneImg = document.getElementById('stone');
    const countStone = document.getElementById('countStoneP');

    stoneImg.addEventListener('click', clickOnStone);

    getUserStone(tgId.toString(), function (stoneValue) {
        if (stoneValue !== null) {
            stone = parseInt(stoneValue); // Убедимся, что stone является числом
            countStone.textContent = stone;
        }
    });

    function clickOnStone() {
        stone += stoneForClick;
        countStone.textContent = stone; // Обновляем текстовое содержимое элемента countStone
        updateUserStone(tgId.toString(), stone); // Обновляем значение в Firebase
        console.log("Текущее значение stone: " + stone);
    }
};
window.initStone = initStone;