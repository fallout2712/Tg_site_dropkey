let stone = 0;
let stoneForClick = 1;

const stoneImg = document.getElementById('stone');
const countStone = document.getElementById('countStone');

stoneElement.addEventListener('click', function () {
    stone += stoneForClick;
    countStone.textContent = stone;
    console.log("Текущее значение stone: " + stone);
});