document.addEventListener("DOMContentLoaded", function() {
    const tg = window.Telegram.WebApp;

    function SetUpTg() {
        tg.ready();
        tg.expand();
        tg.setHeaderColor("#000000");
        tg.setBackgroundColor("#000000");
    }

    SetUpTg();
});