const folders = document.querySelectorAll('[data-type="folder"]');
const projects = document.querySelectorAll('[data-type="project"]');
const numberProjects = projects.length;
const projectsContainer = document.querySelector(".projects-container");

// Folders
folders.forEach((folder) => {
  folder.addEventListener("click", (e) => {
    e.preventDefault();
    let targetFolder;
    if (e.target.tagName === "A") targetFolder = e.target;
    else targetFolder = e.target.parentNode;
    if (targetFolder.getAttribute("data-access") === "deny") return;
    targetFolder.classList.toggle("toggle");

    const icons = Array.from(
        Array.from(targetFolder.childNodes).filter(
            (el) => el.tagName === "svg"
        )[0].childNodes
    ).filter((el) => el.tagName === "use");

    icons.forEach((icon) => {
      icon.classList.toggle("hidden");
    });
  });
});

// Projects
projects.forEach((project) => {
  project.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(e.target.tagName);
    let targetProject;
    if (e.target.tagName === "A") targetProject = e.target;
    else targetProject = e.target.parentElement;
    const targetProjectID = targetProject.getAttribute("data-projectID");

    const projectsLink = document.querySelectorAll(
        '.link[data-type="project"]'
    );
    projectsLink.forEach((link) => link.classList.remove("active"));

    targetProject.classList.add("active");

    let ratio = (targetProjectID / numberProjects - 1 / numberProjects) * 100;
    projectsContainer.style = `transform: translateY(-${ratio}%);`;
  });
});
