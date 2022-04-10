const toolsBtn = document.getElementById("tools-btn");
const technosBtn = document.getElementById("technology-btn");
const tools = document.getElementById("tools");
const technos = document.getElementById("technology");
const table = document.querySelector(".table");

console.log(table);

toolsBtn.addEventListener("click", () => {
  tools.classList.remove("hidden");
  technos.classList.add("hidden");
  table.classList.add("toggled");
});
technosBtn.addEventListener("click", () => {
  technos.classList.remove("hidden");
  tools.classList.add("hidden");
  table.classList.remove("toggled");
});
