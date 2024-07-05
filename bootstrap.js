document.addEventListener("DOMContentLoaded", async function () {
    initApp();

    if (await initTg()) {
        if (await initUser()) {
            if (lastDataVisit !== undefined)
                differenceDate();

            startTimer();
            setNickName();
            getUserKeysAndAddOpenKey();
            getUppSettings();
            updateAllValue();
            hideLoadScreen();

            if (isSubscribeGroupOne)
                switchSubscribeGroupOne();

            if (newBieBox == true)
                removeNewBieGift();

        }
    }



    console.log("Version app 0.3");
});

