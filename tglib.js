var tgInit = false;
var tgId = "123456789";
var tgFn = "";
var tgLn = "";
var tgUs = "";
var tgPh;

function initTg() {
    const tg = window.Telegram.WebApp;

    tgId = tg.initDataUnsafe?.user?.id || "123456789";
    tgFn = tg.initDataUnsafe?.user?.first_name || "FirstName";
    tgLn = tg.initDataUnsafe?.user?.last_name || "SecondName";
    tgUs = tg.initDataUnsafe?.user?.username || "username";
    tgPh = tg.initDataUnsafe?.user?.photo_url;

    console.log("InitDataUnsafe:", tg.initDataUnsafe);

    console.log("id " + tgId);
    console.log("tgFn " + tgFn);
    console.log("tgLn " + tgLn);
    console.log("tgUs " + tgUs);
    console.log("tgPh " + tgPh);

    // SetUpTg();
}

function SetUpTg() {
    tg.ready();
    tg.expand();
    tg.setHeaderColor("#000000");
    tg.setBackgroundColor("#000000");

    tgInit = true;
}

window.initTg = initTg;