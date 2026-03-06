async function loadLatest() {
  try {
    const res = await fetch("/latest");
    const data = await res.json();

    document.getElementById("status").textContent = data.status || "-";
    document.getElementById("receivedAt").textContent = data.receivedAt || "-";
    document.getElementById("payload").textContent = JSON.stringify(data.payload, null, 2);
  } catch (err) {
    document.getElementById("status").textContent = "error";
    document.getElementById("payload").textContent = "Failed to load data";
    console.error(err);
  }
}

loadLatest();
setInterval(loadLatest, 5000);