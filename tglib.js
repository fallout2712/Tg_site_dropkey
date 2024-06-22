var tgInit = true;
var tgId = "123456789";
var tgFn = "FirstName";
var tgLn = "SecondName";

document.addEventListener("DOMContentLoaded", function () {
    const tg = window.Telegram.WebApp;

    tgId = tg.initDataUnsafe?.user?.id || "123456789";
    tgFn = tg.initDataUnsafe?.user?.first_name || "FirstName";
    tgLn = tg.initDataUnsafe?.user?.last_name || "SecondName";

    function SetUpTg() {
        tg.ready();
        tg.expand();
        tg.setHeaderColor("#000000");
        tg.setBackgroundColor("#000000");

        const firstName = document.querySelector("#firstName");
        const secondName = document.querySelector("#secondName");

        firstName.textContent = `${tgFn}`.trim();
        secondName.textContent = `${tgLn}`.trim();

        getUserStone(tgId);
        tgInit = true;
        initStone();
    }
    SetUpTg();
});