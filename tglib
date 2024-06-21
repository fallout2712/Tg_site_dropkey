document.addEventListener("DOMContentLoaded", function () {
    const tg = window.Telegram.WebApp;

    function SetUpTg() {
        tg.ready();
        tg.expand();
        tg.setHeaderColor("#000000");
        tg.setBackgroundColor("#000000");

        var tgId = tg.initDataUnsafe?.user?.id;
        var tgFn = tg.initDataUnsafe?.user?.first_name || "FirstName";
        var tgLn = tg.initDataUnsafe?.user?.last_name || "SecondName";

        const firstName = document.querySelector("#firstName");
        const secondName = document.querySelector("#secondName");

        firstName.textContent = `${tgFn}`.trim();
        secondName.textContent = `${tgLn}`.trim();
    }

    SetUpTg();
});