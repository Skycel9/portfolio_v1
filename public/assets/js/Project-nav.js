const folders = document.querySelectorAll('[data-type="folder"]');
const projects = document.querySelectorAll('[data-type="project"]');
const numberProjects = projects.length;
const projectsContainer = document.querySelector(".projects-container");

// Folders
folders.forEach((folder) => {
  folder.addEventListener("click", (e) => {
    e.preventDefault();
    const targetFolder = e.path.filter((el) => el.tagName === "A")[0];
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
    const targetProject = e.path.filter((el) => el.tagName === "A")[0];
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
