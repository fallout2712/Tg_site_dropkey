let stone = 0;
let stoneForClick = 1;

document.addEventListener('DOMContentLoaded', function () {
    const stoneImg = document.getElementById('stone');
    const countStone = document.getElementById('countStoneP');

    stoneImg.addEventListener('click', clickOnStone);
});

function clickOnStone() {
    stone += stoneForClick;
    document.getElementById('countStoneP').textContent = stone;
    console.log("Текущее значение stone: " + stone);
}