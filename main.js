window.onload = async function main() {
  let timerData = await getTimerData();
  console.log(timerData);
  timerData.forEach(useTimerData);
  timerData.forEach((timer) => {
    setInterval(() => updateTimers(timer.date, timer.id), 200);
  });
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

async function getTimerData() {
  try {
    const res = await fetch("./assets/timer-data.json");
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Unable to fetch data:", error);
  }
}

function useTimerData(d) {
  const subTimerDiv = document.createElement("div");
  subTimerDiv.setAttribute("class", "subtimer");

  const headerSpan = document.createElement("span");
  headerSpan.setAttribute("class", "timer-header");
  headerSpan.textContent = d.head;

  const timerSpan = document.createElement("span");
  timerSpan.setAttribute("class", "timer");
  timerSpan.setAttribute("id", d.id);

  subTimerDiv.appendChild(headerSpan);
  subTimerDiv.appendChild(timerSpan);

  const columnElement = document.getElementById(d.column);
  if (columnElement) {
    columnElement.appendChild(subTimerDiv);
  } else {
    console.error(`Element with id "${d.column}" not found.`);
  }
}

function updateTimers(endDate, docID) {
  countdown(endDate, docID);
  countdown("2026-05-17T19:30:00", "john");
}
