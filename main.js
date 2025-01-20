const ENDDATE = "2025-06-16T12:30:00";

window.onload = function main() {
  setInterval(allCountdowns, 200);
};

function countdown(endDate, docID) {
  let time = new Date().getTime();
  let endTime = new Date(endDate).getTime();
  let timeUntilEnd = endTime - time;

  const s = Math.floor(timeUntilEnd / 1000) % 60;
  const m = Math.floor(timeUntilEnd / (1000 * 60)) % 60;
  const h = Math.floor(timeUntilEnd / (1000 * 60 * 60)) % 24;
  const d = Math.floor(timeUntilEnd / (1000 * 60 * 60 * 24)) % 365;
  const y = Math.floor(timeUntilEnd / (1000 * 60 * 60 * 24 * 365));

  let text = "error";

  if (y > 0) {
    text = `${y} years ${d} days ${h} hours ${m} minutes ${s} seconds`;
  } else if (d > 0) {
    text = `${d} days ${h} hours ${m} minutes ${s} seconds`;
  } else if (h > 0) {
    text = `${h} hours ${m} minutes ${s} seconds`;
  } else if (m > 0) {
    text = `${m} minutes ${s} seconds`;
  } else if (s > 0) {
    text = `${s} seconds`;
  } else {
    text = "Finished!";
  }

  document.getElementById(docID).innerHTML = text;
}

function allCountdowns(){
  countdown("2025-06-16T12:30:00", "john");
  countdown("2025-04-11T13:30:00","springtimer");
  countdown("2029-01-20T09:00:00", "trumptimer");
}
