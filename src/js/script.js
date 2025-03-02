AOS.init();

// DST - Daylight Saving Time - is "summer time".
function isDST(d) {
    let jan = new Date(d.getFullYear(), 0, 1).getTimezoneOffset();
    let jul = new Date(d.getFullYear(), 6, 1).getTimezoneOffset();
    return Math.max(jan, jul) !== d.getTimezoneOffset();    
}

const nowIsDST = isDST(new Date());
const countdown = document.querySelector('#countdown');
const target = new Date(2025, 5, 7, 14, 30); // Wedding ceremony.

function calculateTime() {
    let diffMs = target - Date.now();

    // The diff is in ms.
    // One hour in ms = 1000 ms * 60 * 60 (or 1000 * 3600).
    // One minute in ms = 1000 ms * 60.
    // To get the days we divide the diff by 24 hours in ms.
    // To get the hours we take the remainder of the diff divided by 24 hours in ms,
    // then divide that by one hour in ms. 
    // The minutes and seconds are the same.
    let oneHourInMs = 1000 * 3600;
    let oneMinuteInMs = 1000 * 60;
    let d = Math.floor(diffMs / (oneHourInMs * 24));
    let h = Math.floor((diffMs % (oneHourInMs * 24)) / oneHourInMs);
    let m = Math.floor((diffMs % oneHourInMs) / oneMinuteInMs);
    let s = Math.floor((diffMs % oneMinuteInMs) / 1000);

    if (!nowIsDST) {
        h++;
    }

    countdown.textContent = `Dagar: ${d}. Timmar: ${h}. Minuter: ${m}. Sekunder: ${s}.`;
}

setInterval(calculateTime, 1000);
