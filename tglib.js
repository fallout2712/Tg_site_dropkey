var tgId;
var tgFn;
var tgLn;
var tgUs;
var tgRef;
const tg = window.Telegram.WebApp;

async function initTg() {
    try {
        tgId = tg.initDataUnsafe?.user?.id || "604531364";
        tgFn = tg.initDataUnsafe?.user?.first_name || "";
        tgLn = tg.initDataUnsafe?.user?.last_name || "";
        tgUs = tg.initDataUnsafe?.user?.username || "";
        tgRef = tg.initDataUnsafe.start_param || "";

        tg.ready();
        tg.expand();
        tg.setHeaderColor("#000000");
        tg.setBackgroundColor("#000000");
    } catch (error) {
        console.error("Error initializing Telegram WebApp:", error);
    }

    return true;
}

function feedBackKlick() {
    tg.HapticFeedback.impactOccurred("light");
}

window.initTg = initTg;
window.feedBackKlick = feedBackKlick;