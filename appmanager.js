let stone = 0;
let stoneForClick = 1;

const stoneImg = document.getElementById('stone');

stoneElement.addEventListener('click', function () {
    stone += stoneForClick;
    console.log("Текущее значение stone: " + stone);
});