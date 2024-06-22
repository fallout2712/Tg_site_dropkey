var tgInit = true;
var tgId = "123456789";
var tgFn = "";
var tgLn = "";

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

        tgInit = true;

        console.log("Version app 0.1");

        initStone();
    }
    SetUpTg();
});