const toolsBtn = document.getElementById("tools-btn");
const technosBtn = document.getElementById("technology-btn");
const tools = document.getElementById("tools");
const technos = document.getElementById("technology");
const tabs = document.querySelector(".tabs")

toolsBtn.addEventListener('click', () => {
    tools.classList.remove('hidden');
    technos.classList.add('hidden');
    tabs.classList.add("tools");
});
technosBtn.addEventListener('click', () => {
  technos.classList.remove('hidden');
  tools.classList.add('hidden');
  tabs.classList.remove("tools");
});