import { projects } from "./projects.js";

window.addEventListener("DOMContentLoaded", () => {
  const projectTitle = document.querySelector("#project-title");
  const firstImageContainer = document.querySelector(".first");
  const secondImageContainer = document.querySelector(".second");
  const thirdImageContainer = document.querySelector(".third");
  const projectDescription = document.querySelector(".project-description");
  const rightArrow = document.querySelector(".rightArrow img");
  const leftArrow = document.querySelector(".leftArrow img");
  const pagination = document.querySelector(".pagination");

  let currentIndex = 0;

  projects.forEach((project) => {
    const img = document.createElement("img");
    img.setAttribute("src", "./media/smalldot.png");

    pagination.appendChild(img);
  });

  const dots = pagination.querySelectorAll("img");

  setContent(currentIndex);

  rightArrow.addEventListener("click", next);
  leftArrow.addEventListener("click", prev);

  async function next() {
    let newIndex;

    if (currentIndex + 1 >= projects.length) {
      await resetIndex();
      newIndex = 0;
    } else {
      await incrementIndex();
      newIndex = currentIndex;
    }

    setContent(newIndex);
  }

  async function prev() {
    let newIndex;

    if (currentIndex - 1 < 0) {
      await gotoLast();
      newIndex = projects.length - 1;
    } else {
      await decrementIndex();
      newIndex = currentIndex;
    }
    setContent(newIndex);
  }

  function setContent(index) {
    projectTitle.textContent = projects[index].title;
    projectDescription.textContent = projects[index].description;
    firstImageContainer.style.backgroundImage = `url(${projects[index].image1})`;
    secondImageContainer.style.backgroundImage = `url(${projects[index].image2})`;
    thirdImageContainer.style.backgroundImage = `url(${projects[index].image3})`;

    dots.forEach((dot, i) => {
      if (index == i) {
        dot.setAttribute("src", "./media/bigdot.png");
      } else {
        dot.setAttribute("src", "./media/smalldot.png");
      }
    });
  }

  function incrementIndex() {
    return new Promise((resolve, reject) => {
      currentIndex += 1;
      resolve();
    });
  }
  function decrementIndex() {
    return new Promise((resolve, reject) => {
      currentIndex -= 1;
      resolve();
    });
  }
  function resetIndex() {
    return new Promise((resolve, reject) => {
      currentIndex = 0;
      resolve();
    });
  }
  function gotoLast() {
    return new Promise((resolve, reject) => {
      currentIndex = projects.length - 1;
      resolve();
    });
  }
});
