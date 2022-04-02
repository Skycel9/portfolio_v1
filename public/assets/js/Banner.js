const infoBtn = document.getElementById("fullstack");
const defModal = document.getElementById("fullstack-modal");

infoBtn.addEventListener("mouseenter", (e)=> {
  defModal.classList.add("active");
  console.log(e)
})
infoBtn.addEventListener("mouseleave", ()=> {
  defModal.classList.remove("active");
  defModal.style = "";
})
infoBtn.addEventListener("mouseover", (e)=> {
  defModal.style = `top: ${e.clientY + window.scrollY}px; left: ${e.clientX}px;`;
})