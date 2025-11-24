if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/PWA/sw.js").then(() => console.log("Service Worker registrado"));
}

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const sidebar = document.getElementById("sidebar");
  const closeBtn = document.getElementById("closeBtn");
  const links = sidebar.querySelectorAll("a[data-page]");
  const pages = document.querySelectorAll(".page");

  hamburger.addEventListener("click", () => {
    sidebar.classList.add("active");
  });

  closeBtn.addEventListener("click", () => {
    sidebar.classList.remove("active");
  });

  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const pageId = link.getAttribute("data-page");
      pages.forEach(p => p.classList.remove("active"));
      document.getElementById("page-" + pageId).classList.add("active");
      sidebar.classList.remove("active");
    });
  });

  const co2Input = document.getElementById("co2Input");
  const addCo2Btn = document.getElementById("addCo2Btn");
  const co2List = document.getElementById("co2List");
  const comparison = document.getElementById("comparison");

  let records = JSON.parse(localStorage.getItem("co2Records")) || [];

  function renderRecords() {
    co2List.innerHTML = "";
    records.forEach((r, i) => {
      const li = document.createElement("li");
      li.textContent = r + " ppm";
      co2List.appendChild(li);
    });
    if (records.length >= 2) {
      const last = records[records.length - 1];
      const prev = records[records.length - 2];
      if (last > prev) {
        comparison.textContent = "O nível aumentou em relação à última medição.";
      } else if (last < prev) {
        comparison.textContent = "O nível diminuiu em relação à última medição.";
      } else {
        comparison.textContent = "O nível permaneceu igual à última medição.";
      }
    } else {
      comparison.textContent = "";
    }
  }

  renderRecords();

  addCo2Btn.addEventListener("click", () => {
    if (co2Input.value.trim() !== "") {
      const value = parseInt(co2Input.value.trim(), 10);
      records.push(value);
      localStorage.setItem("co2Records", JSON.stringify(records));
      co2Input.value = "";
      renderRecords();
      pages.forEach(p => p.classList.remove("active"));
      document.getElementById("page-history").classList.add("active");
      sidebar.classList.remove("active");
    }
  });
});