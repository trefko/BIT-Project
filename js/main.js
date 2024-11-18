const URL = "https://api.tvmaze.com/shows";
const container = document.querySelector(".container");

function getMovies() {
  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      showMovies(data);
    });
}

function showMovies(data) {
  console.log(data);
  const newMoviesArray = data.slice(0, 51);

  newMoviesArray.forEach((e) => {
    const moviesDiv = document.createElement("div");
    const moviesPic = document.createElement("img");
    const moviesText = document.createElement("p");

    // Check if image exists before setting src
    if (e.image) {
      moviesPic.setAttribute("src", e.image.medium);
    }
    moviesText.innerHTML = e.name;
    moviesDiv.append(moviesPic, moviesText);
    container.append(moviesDiv);

    moviesDiv.addEventListener("click", () => {
      console.log(e);
      localStorage.setItem("show", JSON.stringify(e));
      location.href = "../BitShow/show-info.html";
    });
  });
}
const result = document.querySelector(".result");
function getOption(string) {
  const API = `https://api.tvmaze.com/search/shows?q=${string}`;
  fetch(API)
    .then((res) => res.json())
    .then((data) => {
      makeOptions(data);
    });
}

function makeOptions(data) {
  result.innerHTML = "";

  data.forEach((e) => {
    const txt = document.createElement("p");
    txt.textContent = e.show.name;
    result.append(txt);
    txt.addEventListener("click", () => {
      localStorage.setItem("show", JSON.stringify(e.show));
      location.href = "../BitShow/show-info.html";
    });
  });
}

const search = document.querySelector(".search");
search.addEventListener(
  "keyup",
  debounce(() => {
    getOption(search.value);
  })
);

function debounce(func, timeout = 700) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

window.addEventListener("load", getMovies);
