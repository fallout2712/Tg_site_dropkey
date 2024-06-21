document.addEventListener("DOMContentLoaded", function () {
    const tg = window.Telegram.WebApp;

    function SetUpTg() {
        tg.ready();
        tg.expand();
        tg.setHeaderColor("#000000");
        tg.setBackgroundColor("#000000");

        const tgId = tg.initDataUnsafe?.user?.id;
        const tgFn = tg.initDataUnsafe?.user?.first_name || "";
        const tgLn = tg.initDataUnsafe?.user?.last_name || "";
        const tgPhotoUrl = tg.initDataUnsafe?.user?.photo_url;
        const tgLang = tg.initDataUnsafe?.user?.language_code;

        const nickElement = document.querySelector(".Nick p");
        if (nickElement) {
            nickElement.textContent = `${tgFn} ${tgLn}`.trim();
        }

        const imgElement = document.querySelector(".Nick img");
        if (imgElement && tgPhotoUrl) {
            imgElement.src = tgPhotoUrl;
        }
    }

    SetUpTg();
});